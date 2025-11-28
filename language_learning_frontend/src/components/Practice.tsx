"use client";

import { useMemo, useState } from "react";
import type { Lesson } from "@/types";

// PUBLIC_INTERFACE
export function Practice({ lesson, onComplete }: { lesson: Lesson; onComplete: () => void }) {
  /** Simple practice component: flashcards over vocabulary with correctness feedback. */
  const cards = useMemo(() => (lesson.vocabulary ?? []).map((v) => ({
    prompt: `Translate: ${v}`,
    answer: v,
  })), [lesson]);

  const [idx, setIdx] = useState(0);
  const [input, setInput] = useState("");
  const [feedback, setFeedback] = useState<"idle" | "correct" | "incorrect">("idle");

  const current = cards[idx];

  if (cards.length === 0) {
    return <div>No practice available for this lesson.</div>;
  }

  const onCheck = () => {
    const correct = input.trim().toLowerCase() === current.answer.trim().toLowerCase();
    setFeedback(correct ? "correct" : "incorrect");
  };

  const onNext = () => {
    const next = idx + 1;
    setInput("");
    setFeedback("idle");
    if (next >= cards.length) onComplete();
    else setIdx(next);
  };

  return (
    <div>
      <div className="card p-6">
        <div className="badge">Card {idx + 1} of {cards.length}</div>
        <h3 className="mt-2 text-lg font-semibold">{current.prompt}</h3>
        <label htmlFor="answer" className="mt-4 block text-sm font-semibold">Your answer</label>
        <input
          id="answer"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="w-full mt-2 p-3 rounded-md border border-[rgba(17,24,39,0.12)]"
          placeholder="Type here…"
        />
        <div className="mt-4 flex gap-3">
          <button className="btn btn-secondary" onClick={onCheck}>Check</button>
          <button className="btn btn-primary" onClick={onNext}>Next</button>
        </div>
      </div>

      {feedback !== "idle" && (
        <div
          className={`card p-4 mt-4 ${feedback === "correct" ? "bg-amber" : "bg-error"}`}
          role="status"
          aria-live="polite"
        >
          {feedback === "correct" ? "Correct! Nicely done." : `Not quite. Correct answer: ${current.answer}`}
        </div>
      )}
    </div>
  );
}
