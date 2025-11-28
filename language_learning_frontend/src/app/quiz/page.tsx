"use client";

import { useEffect, useMemo, useState } from "react";
import { getQuizQuestions } from "@/data/client";
import type { QuizQuestion } from "@/types";
import { Question } from "@/components/Question";
import { useQuiz } from "@/providers/QuizContext";

export default function QuizPage() {
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);
  const { reset, answers, submit, score, submitted } = useQuiz();

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const qs = await getQuizQuestions();
        if (mounted) setQuestions(qs);
      } catch {
        setErr("Failed to load quiz questions.");
      } finally {
        setLoading(false);
      }
    })();
    return () => { mounted = false; };
  }, []);

  const total = useMemo(() => questions.length, [questions]);

  if (loading) return <div className="card p-6">Loading quiz…</div>;
  if (err) return <div className="card p-6 bg-error text-white" role="alert">{err}</div>;
  if (total === 0) return <div className="card p-6">No questions available.</div>;

  return (
    <div className="grid gap-6">
      <header className="card p-6 header-gradient">
        <h1 className="text-2xl font-semibold">Quick Quiz</h1>
        <p className="mt-2 text-sm">Answer the questions below and submit to see your results.</p>
      </header>

      {!submitted ? (
        <section className="grid gap-4">
          {questions.map((q, idx) => (
            <Question key={q.id} index={idx} question={q} />
          ))}
          <div className="card p-4">
            <div className="progress-track">
              <div className="progress-fill" style={{ width: `${(Object.keys(answers).length / total) * 100}%` }} />
            </div>
            <div className="mt-2 text-sm">
              Answered {Object.keys(answers).length} of {total}
            </div>
            <div className="mt-4 flex gap-3">
              <button className="btn btn-primary" onClick={() => submit(questions)}>
                Submit Quiz
              </button>
              <button className="btn btn-secondary" onClick={() => reset()}>
                Reset
              </button>
            </div>
          </div>
        </section>
      ) : (
        <section className="card p-6">
          <h2 className="text-xl font-semibold">Results</h2>
          <p className="mt-2 text-sm">
            You scored <strong>{score.correct}</strong> out of <strong>{total}</strong>.
          </p>
          <div className="mt-4 flex gap-3">
            <button className="btn btn-secondary" onClick={() => reset()}>
              Retry
            </button>
          </div>
        </section>
      )}
    </div>
  );
}
