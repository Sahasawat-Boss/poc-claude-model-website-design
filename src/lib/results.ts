export type ModelId = "opus" | "sonnet";
export type EffortId = "low" | "medium" | "high" | "xhigh";

export const MODELS: { id: ModelId; label: string }[] = [
  { id: "opus", label: "Opus" },
  { id: "sonnet", label: "Sonnet" },
];

export const EFFORTS: { id: EffortId; label: string }[] = [
  { id: "low", label: "Low" },
  { id: "medium", label: "Medium" },
  { id: "high", label: "High" },
  { id: "xhigh", label: "XHigh" },
];

export type Result = {
  model: ModelId;
  effort: EffortId;
  slug: string;
  label: string;
  src: string;
};

export const RESULTS: Result[] = MODELS.flatMap((m) =>
  EFFORTS.map((e) => ({
    model: m.id,
    effort: e.id,
    slug: `${m.id}-${e.id}`,
    label: `${m.label} · ${e.label}`,
    src: `/results/${m.id}/${e.id}/index.html`,
  })),
);

export function findResult(slug: string): Result | undefined {
  return RESULTS.find((r) => r.slug === slug);
}
