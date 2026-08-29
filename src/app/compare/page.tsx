"use client";

import { useState } from "react";
import { RESULTS, type Result } from "@/lib/results";

function Pane({
  value,
  onChange,
  side,
}: {
  value: Result;
  onChange: (slug: string) => void;
  side: string;
}) {
  return (
    <div className="flex min-h-0 flex-1 flex-col border-neutral-800 md:border-r md:last:border-r-0">
      <div className="flex items-center gap-2 border-b border-neutral-800 px-3 py-2">
        <span className="text-xs uppercase tracking-widest text-neutral-500">{side}</span>
        <select
          value={value.slug}
          onChange={(e) => onChange(e.target.value)}
          className="ml-auto rounded-md border border-neutral-700 bg-neutral-900 px-2 py-1 text-xs text-neutral-100 outline-none focus:border-neutral-500"
        >
          {RESULTS.map((r) => (
            <option key={r.slug} value={r.slug}>
              {r.label}
            </option>
          ))}
        </select>
        <a
          href={value.src}
          target="_blank"
          rel="noreferrer"
          className="rounded-md border border-neutral-700 px-2 py-1 text-xs text-neutral-300 transition hover:border-neutral-500 hover:text-neutral-100"
        >
          ↗
        </a>
      </div>
      <iframe
        key={value.slug}
        src={value.src}
        title={value.label}
        className="min-h-[70vh] w-full flex-1 border-0 bg-white"
      />
    </div>
  );
}

export default function ComparePage() {
  const [left, setLeft] = useState<Result>(
    RESULTS.find((r) => r.slug === "opus-xhigh") ?? RESULTS[0],
  );
  const [right, setRight] = useState<Result>(
    RESULTS.find((r) => r.slug === "sonnet-xhigh") ?? RESULTS[1],
  );

  const pick = (slug: string) => RESULTS.find((r) => r.slug === slug)!;

  return (
    <main className="flex h-[calc(100vh-53px)] flex-col">
      <div className="flex items-center gap-3 border-b border-neutral-800 px-4 py-2">
        <h1 className="text-sm font-semibold">Side-by-side compare</h1>
        <button
          onClick={() => {
            setLeft(right);
            setRight(left);
          }}
          className="ml-auto rounded-md border border-neutral-700 px-2 py-1 text-xs text-neutral-300 transition hover:border-neutral-500 hover:text-neutral-100"
        >
          ⇄ สลับซ้าย-ขวา
        </button>
      </div>
      <div className="flex min-h-0 flex-1 flex-col md:flex-row">
        <Pane side="Left" value={left} onChange={(s) => setLeft(pick(s))} />
        <Pane side="Right" value={right} onChange={(s) => setRight(pick(s))} />
      </div>
    </main>
  );
}
