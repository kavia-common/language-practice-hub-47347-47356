"use client";

import { useEffect, useState } from "react";
import { getProgress } from "@/data/client";
import type { ProgressSnapshot } from "@/types";
import { useProgress } from "@/providers/ProgressContext";

export default function ProgressPage() {
  const [remoteProgress, setRemoteProgress] = useState<ProgressSnapshot | null>(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);
  const { snapshot } = useProgress();

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const p = await getProgress();
        if (mounted) setRemoteProgress(p);
      } catch {
        setErr("Failed to load cloud progress; showing local progress.");
      } finally {
        setLoading(false);
      }
    })();
    return () => { mounted = false; };
  }, []);

  const view = remoteProgress || snapshot;

  return (
    <div className="grid gap-6">
      <header className="card p-6 header-gradient">
        <h1 className="text-2xl font-semibold">Your Progress</h1>
        <p className="mt-2 text-sm">Track your streaks, accuracy, and recent activity.</p>
      </header>

      {loading && <div className="card p-6">Loading progress…</div>}
      {err && <div className="card p-4 bg-error text-white" role="alert">{err}</div>}

      {view && (
        <section className="grid md:grid-cols-3 gap-4">
          <article className="card p-6">
            <h2 className="text-lg font-semibold">Completed Lessons</h2>
            <p className="mt-2 text-2xl font-semibold">{view.completedLessons}</p>
          </article>
          <article className="card p-6">
            <h2 className="text-lg font-semibold">Streak</h2>
            <p className="mt-2 text-2xl font-semibold">{view.streak} days</p>
          </article>
          <article className="card p-6">
            <h2 className="text-lg font-semibold">Accuracy</h2>
            <div className="mt-2 progress-track">
              <div className="progress-fill" style={{ width: `${view.accuracy}%` }} />
            </div>
            <p className="mt-2 text-sm">{view.accuracy}%</p>
          </article>

          <article className="card p-6 md:col-span-3">
            <h2 className="text-lg font-semibold">Recent Activity</h2>
            <ul className="mt-2">
              {view.recentActivity.map((a, i) => (
                <li key={i} className="mt-1">• {a}</li>
              ))}
              {view.recentActivity.length === 0 && <li>No recent activity.</li>}
            </ul>
          </article>
        </section>
      )}
    </div>
  );
}
