import Link from "next/link";
import { notFound } from "next/navigation";
import { RESULTS, findResult } from "@/lib/results";

export function generateStaticParams() {
  return RESULTS.map((r) => ({ slug: r.slug }));
}

export default async function ViewPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const result = findResult(slug);
  if (!result) notFound();

  return (
    <main className="flex h-[calc(100vh-53px)] flex-col">
      <div className="flex flex-wrap items-center gap-3 border-b border-neutral-800 px-4 py-2">
        <h1 className="text-sm font-semibold">{result.label}</h1>
        <div className="ml-auto flex flex-wrap items-center gap-2 text-xs">
          <Link
            href="/brief"
            className="rounded-md border border-neutral-700 px-2 py-1 text-neutral-300 transition hover:border-neutral-500 hover:text-neutral-100"
          >
            ดูโจทย์
          </Link>
          {RESULTS.map((r) => (
            <Link
              key={r.slug}
              href={`/view/${r.slug}`}
              className={`rounded-md px-2 py-1 transition ${
                r.slug === result.slug
                  ? "bg-neutral-100 text-neutral-900"
                  : "text-neutral-400 hover:bg-neutral-800 hover:text-neutral-100"
              }`}
            >
              {r.label}
            </Link>
          ))}
          <a
            href={result.src}
            target="_blank"
            rel="noreferrer"
            className="rounded-md border border-neutral-700 px-2 py-1 text-neutral-300 transition hover:border-neutral-500 hover:text-neutral-100"
          >
            เปิดแท็บใหม่ ↗
          </a>
        </div>
      </div>
      <iframe src={result.src} title={result.label} className="w-full flex-1 border-0 bg-white" />
    </main>
  );
}
