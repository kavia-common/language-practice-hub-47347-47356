"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getLessons } from "@/data/client";
import type { Lesson } from "@/types";

export default function LessonsPage() {
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const data = await getLessons();
        if (mounted) setLessons(data);
      } catch {
        setErr("Failed to load lessons. Showing an empty list.");
      } finally {
        setLoading(false);
      }
    })();
    return () => { mounted = false; };
  }, []);

  return (
    <div className="grid gap-6">
      <header className="card p-6 header-gradient">
        <h1 className="text-2xl font-semibold">Lessons</h1>
        <p className="mt-2 text-sm">Browse available lessons and pick one to start practicing.</p>
      </header>

      {loading && <div className="card p-6">Loading lessons…</div>}
      {err && <div role="alert" className="card p-4 bg-error rounded-md">{err}</div>}

      <section className="grid md:grid-cols-2 gap-4">
        {lessons.map((l) => (
          <article key={l.id} className="card p-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">{l.title}</h2>
              <span className="badge" aria-label={`Level ${l.level}`}>Level {l.level}</span>
            </div>
            <p className="mt-2 text-sm">{l.description}</p>
            <div className="mt-4">
              <Link className="btn btn-primary" href={`/lessons/${l.id}`} aria-label={`Open lesson ${l.title}`}>
                Open Lesson
              </Link>
            </div>
          </article>
        ))}
        {!loading && lessons.length === 0 && (
          <div className="card p-6">No lessons yet.</div>
        )}
      </section>
    </div>
  );
}
