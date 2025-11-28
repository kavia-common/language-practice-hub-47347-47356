"use client";

import { QuizProvider } from "./QuizContext";
import { ProgressProvider } from "./ProgressContext";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ProgressProvider>
      <QuizProvider>{children}</QuizProvider>
    </ProgressProvider>
  );
}
