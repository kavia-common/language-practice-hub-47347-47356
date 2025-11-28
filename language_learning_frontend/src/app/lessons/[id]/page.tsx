"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { getLessons } from "@/data/client";
import type { Lesson } from "@/types";
import { Practice } from "@/components/Practice";
import { useProgress } from "@/providers/ProgressContext";



type TabKey = "overview" | "practice" | "review";

export default function LessonDetailPage() {
  const params = useParams<{ id: string }>();
  const lessonId = params?.id;
  const [lesson, setLesson] = useState<Lesson | null>(null);
  const [tab, setTab] = useState<TabKey>("overview");
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);
  const { markLessonCompleted } = useProgress();

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const all = await getLessons();
        const found = all.find((l) => String(l.id) === String(lessonId)) || null;
        if (mounted) setLesson(found);
      } catch {
        setErr("Failed to load lesson.");
      } finally {
        setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, [lessonId]);

  const tabs: { key: TabKey; label: string }[] = useMemo(
    () => [
      { key: "overview", label: "Overview" },
      { key: "practice", label: "Practice" },
      { key: "review", label: "Review" },
    ],
    []
  );

  if (loading) return <div className="card p-6">Loading lesson…</div>;
  if (err || !lesson) return <div className="card p-6">Lesson not found.</div>;

  return (
    <div className="grid gap-6">
      <header className="card p-6 header-gradient">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold">{lesson.title}</h1>
            <p className="mt-1 text-sm">Level {lesson.level}</p>
          </div>
          <Link className="btn btn-secondary" href="/lessons">
            Back to Lessons
          </Link>
        </div>
      </header>

      <nav className="tabs" role="tablist" aria-label="Lesson tabs">
        {tabs.map((t) => (
          <button
            key={t.key}
            role="tab"
            aria-selected={tab === t.key}
            aria-controls={`panel-${t.key}`}
            id={`tab-${t.key}`}
            className="tab"
            onClick={() => setTab(t.key)}
          >
            {t.label}
          </button>
        ))}
      </nav>

      <section
        role="tabpanel"
        id="panel-overview"
        aria-labelledby="tab-overview"
        hidden={tab !== "overview"}
        className="card p-6"
      >
        <h2 className="text-xl font-semibold">About this lesson</h2>
        <p className="mt-2 text-sm">{lesson.description}</p>
        <div className="mt-4">
          <h3 className="font-semibold">Vocabulary</h3>
          <ul className="mt-2">
            {lesson.vocabulary?.map((v, i) => (
              <li key={i} className="mt-1">• {v}</li>
            ))}
          </ul>
        </div>
        <div className="mt-6">
          <button className="btn btn-primary" onClick={() => { setTab("practice"); }}>
            Start Practice
          </button>
        </div>
      </section>

      <section
        role="tabpanel"
        id="panel-practice"
        aria-labelledby="tab-practice"
        hidden={tab !== "practice"}
        className="card p-6"
      >
        <Practice
          lesson={lesson}
          onComplete={() => {
            markLessonCompleted(String(lesson.id));
            setTab("review");
          }}
        />
      </section>

      <section
        role="tabpanel"
        id="panel-review"
        aria-labelledby="tab-review"
        hidden={tab !== "review"}
        className="card p-6"
      >
        <h2 className="text-xl font-semibold">Review</h2>
        <p className="mt-2 text-sm">
          Great job! You can retake practice or jump into a quiz.
        </p>
        <div className="mt-4 flex gap-3">
          <button className="btn btn-secondary" onClick={() => setTab("practice")}>
            Practice Again
          </button>
          <Link className="btn btn-primary" href="/quiz">
            Take a Quiz
          </Link>
        </div>
      </section>
    </div>
  );
}
