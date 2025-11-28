import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Providers } from "@/providers/Providers";

export const metadata: Metadata = {
  title: "Language Practice Hub",
  description: "Learn, practice, and track your language learning progress.",
  metadataBase: new URL("http://localhost:3000"),
  applicationName: "Language Practice Hub",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <Providers>
          <div className="app-shell">
            <Navbar />
            <main className="container" role="main" aria-live="polite">
              {children}
            </main>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}
