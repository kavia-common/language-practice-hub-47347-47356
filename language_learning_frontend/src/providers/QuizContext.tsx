"use client";

import { createContext, useContext, useState, useEffect } from "react";
import type { QuizQuestion } from "@/types";

type Answers = Record<string, number>;

type Score = { correct: number; total: number };

type QuizContextValue = {
  answers: Answers;
  select: (qid: string, choiceIndex: number) => void;
  reset: () => void;
  submit: (questions: QuizQuestion[]) => void;
  score: Score;
  submitted: boolean;
};

const QuizContext = createContext<QuizContextValue | null>(null);

const STORAGE_KEY = "quiz_state_v1";

// PUBLIC_INTERFACE
export function QuizProvider({ children }: { children: React.ReactNode }) {
  /** Provides quiz answer state, submission, and persisted results. */
  const [answers, setAnswers] = useState<Answers>({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState<Score>({ correct: 0, total: 0 });

  useEffect(() => {
    try {
      const raw = typeof window !== "undefined" ? localStorage.getItem(STORAGE_KEY) : null;
      if (raw) {
        const parsed = JSON.parse(raw);
        setAnswers(parsed.answers ?? {});
        setSubmitted(parsed.submitted ?? false);
        setScore(parsed.score ?? { correct: 0, total: 0 });
      }
    } catch {}
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ answers, submitted, score }));
    } catch {}
  }, [answers, submitted, score]);

  const select = (qid: string, choiceIndex: number) => {
    setAnswers((prev) => ({ ...prev, [qid]: choiceIndex }));
  };
  const reset = () => {
    setAnswers({});
    setSubmitted(false);
    setScore({ correct: 0, total: 0 });
  };
  const submit = (questions: QuizQuestion[]) => {
    const total = questions.length;
    let correct = 0;
    for (const q of questions) {
      if (answers[q.id] === q.correctIndex) correct += 1;
    }
    setScore({ correct, total });
    setSubmitted(true);
  };

  // Building the value object directly ensures latest references are provided.
  const value: QuizContextValue = { answers, select, reset, submit, score, submitted };
  return <QuizContext.Provider value={value}>{children}</QuizContext.Provider>;
}

// PUBLIC_INTERFACE
export function useQuiz(): QuizContextValue {
  /** Hook to access Quiz context. */
  const ctx = useContext(QuizContext);
  if (!ctx) throw new Error("useQuiz must be used within QuizProvider");
  return ctx;
}
