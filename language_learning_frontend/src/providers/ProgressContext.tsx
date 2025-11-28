"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { ProgressSnapshot } from "@/types";

type ProgressContextValue = {
  snapshot: ProgressSnapshot;
  markLessonCompleted: (lessonId: string) => void;
};

const STORAGE_KEY = "progress_state_v1";

const defaultSnapshot: ProgressSnapshot = {
  completedLessons: 0,
  streak: 0,
  accuracy: 0,
  recentActivity: [],
};

const ProgressContext = createContext<ProgressContextValue | null>(null);

// PUBLIC_INTERFACE
export function ProgressProvider({ children }: { children: React.ReactNode }) {
  /** Provides local progress state for demo with persistence. */
  const [snapshot, setSnapshot] = useState<ProgressSnapshot>(defaultSnapshot);

  useEffect(() => {
    try {
      const raw = typeof window !== "undefined" ? localStorage.getItem(STORAGE_KEY) : null;
      if (raw) setSnapshot(JSON.parse(raw));
    } catch {}
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(snapshot));
    } catch {}
  }, [snapshot]);

  const markLessonCompleted = (lessonId: string) => {
    setSnapshot((prev) => {
      const updated: ProgressSnapshot = {
        ...prev,
        completedLessons: prev.completedLessons + 1,
        streak: Math.min(prev.streak + 1, 365),
        accuracy: Math.min(100, Math.round((prev.accuracy + 85) / 2)),
        recentActivity: [`Completed lesson ${lessonId}`, ...prev.recentActivity].slice(0, 8),
      };
      return updated;
    });
  };

  const value = useMemo(() => ({ snapshot, markLessonCompleted }), [snapshot]);
  return <ProgressContext.Provider value={value}>{children}</ProgressContext.Provider>;
}

// PUBLIC_INTERFACE
export function useProgress(): ProgressContextValue {
  /** Hook to access progress values and actions. */
  const ctx = useContext(ProgressContext);
  if (!ctx) throw new Error("useProgress must be used within ProgressProvider");
  return ctx;
}
