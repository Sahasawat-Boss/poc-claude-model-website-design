import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "Claude Model Compare — Nordveil Landing Page",
  description:
    "เปรียบเทียบผลงาน landing page ที่สร้างโดย Claude Opus และ Sonnet ในระดับ reasoning effort ต่างๆ",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="th">
      <body className="min-h-screen bg-neutral-950 text-neutral-100 antialiased">
        <header className="sticky top-0 z-50 border-b border-neutral-800 bg-neutral-950/80 backdrop-blur">
          <div className="mx-auto flex max-w-7xl items-center gap-6 px-4 py-3">
            <Link href="/" className="text-sm font-semibold tracking-tight">
              claude<span className="text-neutral-500">-model</span>
            </Link>
            <nav className="flex items-center gap-4 text-sm text-neutral-400">
              <Link className="transition hover:text-neutral-100" href="/">
                Gallery
              </Link>
              <Link className="transition hover:text-neutral-100" href="/compare">
                Compare
              </Link>
            </nav>
          </div>
        </header>
        {children}
      </body>
    </html>
  );
}
