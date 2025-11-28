import React from "react";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container">
      <section className="card p-8" role="alert" aria-live="assertive">
        <h1 className="text-2xl font-semibold">404 – Page Not Found</h1>
        <p className="mt-2 text-sm">The page you’re looking for doesn’t exist.</p>
        <div className="mt-6">
          <Link href="/" className="btn btn-primary">Go Home</Link>
        </div>
      </section>
    </div>
  );
}
