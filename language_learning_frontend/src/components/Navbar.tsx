"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const nav = [
  { href: "/", label: "Home" },
  { href: "/lessons", label: "Lessons" },
  { href: "/quiz", label: "Quiz" },
  { href: "/progress", label: "Progress" },
];

export function Navbar() {
  const pathname = usePathname();
  return (
    <header className="border-b border-[rgba(17,24,39,0.06)] bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container flex items-center justify-between py-3">
        <Link href="/" className="flex items-center gap-2 font-semibold" aria-label="Language Practice Hub">
          <span aria-hidden="true" style={{ width: 10, height: 10, borderRadius: 9999, background: "var(--color-primary)", display: "inline-block" }} />
          Language Practice Hub
        </Link>
        <nav aria-label="Primary">
          <ul className="flex items-center gap-2">
            {nav.map((n) => {
              const active = pathname === n.href;
              return (
                <li key={n.href}>
                  <Link
                    className={`btn ${active ? "btn-primary" : "btn-secondary"}`}
                    href={n.href}
                    aria-current={active ? "page" : undefined}
                  >
                    {n.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </header>
  );
}
