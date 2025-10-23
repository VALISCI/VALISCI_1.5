// app/assessment/page.tsx
"use client";
import React from "react";

type Item = { id:number; pillar:"clarity"|"consistency"|"composure"; text:string };

const ITEMS: Item[] = [
  // Clarity (1–4)
  { id:1, pillar:"clarity", text:"We have a shared definition of success for the next 90 days." },
  { id:2, pillar:"clarity", text:"Information sources are trusted and current." },
  { id:3, pillar:"clarity", text:"Roles/decision rights are explicit for critical paths." },
  { id:4, pillar:"clarity", text:"We reduce complex topics into decision-ready briefs." },
  // Consistency (5–8)
  { id:5, pillar:"consistency", text:"Our operating rhythm enforces decision deadlines." },
  { id:6, pillar:"consistency", text:"We measure outcomes with stable metrics." },
  { id:7, pillar:"consistency", text:"Handoffs follow the same pattern across teams." },
  { id:8, pillar:"consistency", text:"We close the loop on decisions (owner, timestamp, outcome)." },
  // Composure (9–12)
  { id:9, pillar:"composure", text:"We de-escalate under uncertainty; no panic pivots." },
  { id:10, pillar:"composure", text:"We choose less, but finished—limited WIP." },
  { id:11, pillar:"composure", text:"Leaders model calm and protect focus." },
  { id:12, pillar:"composure", text:"We recover quickly from errors; post-mortems produce change." },
];

export default function Assessment() {
  const [answers, setAnswers] = React.useState<number[]>(Array(12).fill(0));
  const [submitting, setSubmitting] = React.useState(false);

  React.useEffect(() => {
    const saved = localStorage.getItem("valisci_assessment");
    if (saved) setAnswers(JSON.parse(saved));
  }, []);
  React.useEffect(() => {
    localStorage.setItem("valisci_assessment", JSON.stringify(answers));
  }, [answers]);

  const progress = Math.round((answers.filter(v=>v>0).length/12)*100);
  const step = Math.min(2, Math.floor(answers.filter(v=>v>0).length/4));

  const set = (idx:number, v:number) => setAnswers(a => a.map((x,i)=> i===idx ? v : x));
  const canSubmit = answers.every(v => v > 0);

  const submit = async () => {
    if (!canSubmit || submitting) return;
    setSubmitting(true);
    const res = await fetch("/api/assessment", { method:"POST", body: JSON.stringify({ answers }) });
    const data = await res.json();
    const params = new URLSearchParams({
      id: data.id,
      score: String(data.score),
      band: data.band,
      c: String(data.scores.clarity),
      k: String(data.scores.consistency),
      p: String(data.scores.composure),
    });
    window.location.href = `/assessment/results?${params.toString()}`;
  };

  return (
    <div className="mx-auto max-w-[900px] px-6 py-16">
      <h1 className="text-3xl font-medium">Confidence Assessment</h1>
      <p className="text-neutral-600 mt-2">Twelve items across Clarity, Consistency, and Composure. ~3 minutes.</p>

      <div className="mt-6 h-2 w-full bg-black/5 rounded-full overflow-hidden">
        <div className="h-full bg-[#00C7E3]" style={{ width: `${progress}%` }} />
      </div>

      <div className="mt-8 grid gap-4">
        {[0,1,2].map(block => (
          <div key={block} className={step===block ? "grid gap-4" : "hidden"}>
            {ITEMS.slice(block*4, block*4+4).map((it, i) => {
              const idx = block*4+i;
              return (
                <div key={it.id} className="rounded-[16px] border border-black/10 p-4">
                  <div className="text-sm text-neutral-500 mb-2">{it.text}</div>
                  <div className="flex gap-2">
                    {[1,2,3,4,5].map(v => (
                      <button
                        key={v}
                        onClick={()=>set(idx, v)}
                        className={`px-3 py-2 rounded-lg border ${answers[idx]===v ? "bg-[#00C7E3] text-white border-[#00C7E3]" : "border-black/10"}`}
                        aria-pressed={answers[idx]===v}
                      >
                        {v}
                      </button>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        ))}
      </div>

      <div className="mt-8 flex justify-between items-center">
        <span className="text-sm text-neutral-500">Progress: {progress}%</span>
        <div className="flex gap-3">
          <a href={process.env.NEXT_PUBLIC_CALENDAR_URL || "#"} className="hidden md:inline text-sm underline">
            Need help? Book a 15-min induction
          </a>
          <button
            disabled={!canSubmit || submitting}
            onClick={submit}
            className="px-5 py-3 rounded-[16px] bg-[#00C7E3] text-white font-medium disabled:opacity-50"
          >
            {submitting ? "Calculating…" : "View Results"}
          </button>
        </div>
      </div>
    </div>
  );
}
