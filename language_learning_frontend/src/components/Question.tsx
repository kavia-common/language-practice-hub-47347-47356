"use client";

import { useQuiz } from "@/providers/QuizContext";
import type { QuizQuestion } from "@/types";

// PUBLIC_INTERFACE
export function Question({ question, index }: { question: QuizQuestion; index: number }) {
  /** Render a single multiple-choice question with options and selection state. */
  const { answers, select } = useQuiz();
  const selected = answers[question.id];

  return (
    <article className="card p-6" aria-labelledby={`q-${question.id}`}>
      <h3 id={`q-${question.id}`} className="font-semibold">
        {index + 1}. {question.question}
      </h3>
      <fieldset className="mt-4">
        <legend className="sr-only">Options</legend>
        <div className="grid gap-2">
          {question.options.map((opt, i) => {
            const isActive = selected === i;
            return (
              <button
                key={i}
                className={`btn ${isActive ? "btn-primary" : "btn-secondary"}`}
                aria-pressed={isActive}
                onClick={() => select(question.id, i)}
              >
                {opt}
              </button>
            );
          })}
        </div>
      </fieldset>
    </article>
  );
}
