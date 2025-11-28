import type { Lesson, ProgressSnapshot, QuizQuestion } from "@/types";

const apiBase =
  process.env.NEXT_PUBLIC_API_BASE ||
  process.env.NEXT_PUBLIC_BACKEND_URL ||
  "";

async function tryFetch<T>(path: string): Promise<T | null> {
  if (!apiBase) return null;
  try {
    const res = await fetch(`${apiBase.replace(/\/$/, "")}/${path.replace(/^\//, "")}`, {
      next: { revalidate: 0 },
    });
    if (!res.ok) throw new Error(`Status ${res.status}`);
    return (await res.json()) as T;
  } catch {
    return null;
  }
}

// PUBLIC_INTERFACE
export async function getLessons(): Promise<Lesson[]> {
  /** Attempts to load lessons from API, otherwise falls back to static mock JSON. */
  const api = await tryFetch<Lesson[]>("/lessons");
  if (api) return api;
  const res = await fetch("/data/lessons.json");
  return (await res.json()) as Lesson[];
}

// PUBLIC_INTERFACE
export async function getQuizQuestions(): Promise<QuizQuestion[]> {
  /** Attempts to load quiz questions from API, otherwise falls back to static mock JSON. */
  const api = await tryFetch<QuizQuestion[]>("/quiz/questions");
  if (api) return api;
  const res = await fetch("/data/quiz_questions.json");
  return (await res.json()) as QuizQuestion[];
}

// PUBLIC_INTERFACE
export async function getProgress(): Promise<ProgressSnapshot> {
  /** Attempts to load progress from API, otherwise falls back to static mock JSON. */
  const api = await tryFetch<ProgressSnapshot>("/progress");
  if (api) return api;
  const res = await fetch("/data/progress.json");
  return (await res.json()) as ProgressSnapshot;
}
