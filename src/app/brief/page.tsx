import fs from "node:fs";
import path from "node:path";
import Link from "next/link";
import { RESULTS } from "@/lib/results";

type Block =
  | { kind: "heading"; text: string }
  | { kind: "para"; lines: string[] }
  | { kind: "list"; ordered: boolean; items: { text: string; note?: string }[] };

function parseBrief(raw: string): Block[] {
  const lines = raw.replace(/\r\n/g, "\n").split("\n");
  const blocks: Block[] = [];

  for (const line of lines) {
    const trimmed = line.trim();
    const prev = blocks[blocks.length - 1];

    if (!trimmed) continue;

    // บรรทัดย่อหน้า = คำอธิบายเพิ่มของ bullet ก่อนหน้า
    if (/^\s+/.test(line) && prev?.kind === "list" && prev.items.length) {
      const last = prev.items[prev.items.length - 1];
      last.note = last.note ? `${last.note} ${trimmed}` : trimmed;
      continue;
    }

    const bullet = trimmed.match(/^-\s+(.*)$/);
    const numbered = trimmed.match(/^\d+\.\s+(.*)$/);

    if (bullet || numbered) {
      const ordered = Boolean(numbered);
      const text = (bullet ?? numbered)![1];
      if (prev?.kind === "list" && prev.ordered === ordered) prev.items.push({ text });
      else blocks.push({ kind: "list", ordered, items: [{ text }] });
      continue;
    }

    if (trimmed.endsWith(":")) {
      blocks.push({ kind: "heading", text: trimmed.slice(0, -1) });
      continue;
    }

    if (prev?.kind === "para") prev.lines.push(trimmed);
    else blocks.push({ kind: "para", lines: [trimmed] });
  }

  return blocks;
}

export default function BriefPage() {
  const raw = fs.readFileSync(path.join(process.cwd(), "Ref", "brief.md"), "utf8");
  const blocks = parseBrief(raw);

  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <div className="flex flex-wrap items-baseline gap-3">
        <h1 className="text-3xl font-semibold tracking-tight">โจทย์ตั้งต้น</h1>
        <span className="text-xs uppercase tracking-widest text-neutral-500">Ref/brief.md</span>
      </div>
      <p className="mt-3 text-sm leading-relaxed text-neutral-400">
        โจทย์เดียวกันนี้ถูกส่งให้ทุกเวอร์ชันใน{" "}
        <Link href="/" className="text-neutral-100 underline underline-offset-4">
          Gallery
        </Link>{" "}
        โดยไม่มีคำใบ้เพิ่ม ต่างกันแค่รุ่นของ model และระดับ reasoning effort
      </p>

      <article className="mt-10 space-y-6">
        {blocks.map((block, i) => {
          if (block.kind === "heading")
            return (
              <h2
                key={i}
                className="border-b border-neutral-800 pt-4 pb-2 text-lg font-semibold tracking-tight"
              >
                {block.text}
              </h2>
            );

          if (block.kind === "para")
            return (
              <p key={i} className="text-[15px] leading-relaxed text-neutral-300">
                {block.lines.join(" ")}
              </p>
            );

          const ListTag = block.ordered ? "ol" : "ul";
          return (
            <ListTag key={i} className="space-y-2.5">
              {block.items.map((item, j) => (
                <li key={j} className="flex gap-3 text-[15px] leading-relaxed text-neutral-300">
                  <span className="mt-0.5 shrink-0 font-mono text-xs text-neutral-600">
                    {block.ordered ? `${j + 1}.` : "—"}
                  </span>
                  <span>
                    {item.text}
                    {item.note && (
                      <span className="mt-1 block text-sm text-neutral-500">{item.note}</span>
                    )}
                  </span>
                </li>
              ))}
            </ListTag>
          );
        })}
      </article>

      <div className="mt-12 rounded-xl border border-neutral-800 bg-neutral-900 p-5">
        <h2 className="text-sm font-semibold">ดูผลลัพธ์</h2>
        <div className="mt-3 flex flex-wrap gap-2">
          {RESULTS.map((r) => (
            <Link
              key={r.slug}
              href={`/view/${r.slug}`}
              className="rounded-md border border-neutral-700 px-2.5 py-1 text-xs text-neutral-300 transition hover:border-neutral-500 hover:text-neutral-100"
            >
              {r.label}
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
