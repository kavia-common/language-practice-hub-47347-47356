import Link from "next/link";

export default function Home() {
  return (
    <div className="grid gap-6">
      <section className="card p-8 header-gradient" aria-labelledby="hero-title">
        <h1 id="hero-title" className="text-2xl font-semibold">
          Practice. Review. Succeed.
        </h1>
        <p className="mt-2 text-lg" aria-describedby="hero-desc">
          Build your language skills with interactive lessons, quick quizzes, and
          a clear view of your progress.
        </p>
        <div className="mt-6 flex gap-3">
          <Link className="btn btn-primary" href="/lessons" aria-label="Browse lessons">
            Start Learning
          </Link>
          <Link className="btn btn-secondary" href="/quiz" aria-label="Try a quick quiz">
            Try a Quick Quiz
          </Link>
        </div>
      </section>

      <section className="grid md:grid-cols-3 gap-4">
        <article className="card p-6">
          <h2 className="text-xl font-semibold">Structured Lessons</h2>
          <p className="mt-2 text-sm">Explore lessons by level and topic, with vocabulary and practice built in.</p>
        </article>
        <article className="card p-6">
          <h2 className="text-xl font-semibold">Targeted Practice</h2>
          <p className="mt-2 text-sm">Interactive exercises help you learn and retain faster with instant feedback.</p>
        </article>
        <article className="card p-6">
          <h2 className="text-xl font-semibold">Track Progress</h2>
          <p className="mt-2 text-sm">Stay motivated by tracking completed lessons, streaks, and accuracy.</p>
        </article>
      </section>
    </div>
  );
}
