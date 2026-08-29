import Link from "next/link";
import { EFFORTS, MODELS, RESULTS } from "@/lib/results";

export default function Home() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-10">
      <div className="max-w-2xl">
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          Nordveil landing page — model comparison
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-neutral-400">
          โจทย์เดียวกันจาก <code className="text-neutral-300">Ref/brief.md</code>{" "}
          ส่งให้ Claude 2 รุ่น × 4 ระดับ reasoning effort. เลือกการ์ดเพื่อเปิดดูเต็มจอ
          หรือไปที่หน้า{" "}
          <Link href="/compare" className="text-neutral-100 underline underline-offset-4">
            Compare
          </Link>{" "}
          เพื่อวางเทียบกันแบบ side-by-side
        </p>
      </div>

      {MODELS.map((model) => (
        <section key={model.id} className="mt-12">
          <div className="flex items-baseline gap-3 border-b border-neutral-800 pb-3">
            <h2 className="text-xl font-semibold tracking-tight">{model.label}</h2>
            <span className="text-xs uppercase tracking-widest text-neutral-500">
              {EFFORTS.length} variants
            </span>
          </div>

          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {RESULTS.filter((r) => r.model === model.id).map((r) => (
              <Link
                key={r.slug}
                href={`/view/${r.slug}`}
                className="group overflow-hidden rounded-xl border border-neutral-800 bg-neutral-900 transition hover:border-neutral-600"
              >
                <div className="relative h-56 overflow-hidden bg-white">
                  <iframe
                    src={r.src}
                    title={r.label}
                    tabIndex={-1}
                    scrolling="no"
                    className="pointer-events-none h-[1600px] w-[1280px] origin-top-left scale-[0.32] border-0"
                  />
                </div>
                <div className="flex items-center justify-between border-t border-neutral-800 px-4 py-3">
                  <span className="text-sm font-medium">{r.label}</span>
                  <span className="text-xs text-neutral-500 transition group-hover:text-neutral-300">
                    เปิดดู →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      ))}
    </main>
  );
}
