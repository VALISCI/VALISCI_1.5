// app/assessment/results/page.tsx
"use client";
import React from "react";
import { useSearchParams } from "next/navigation";

const CAL_URL = process.env.NEXT_PUBLIC_CALENDAR_URL || "#";

export default function Results() {
  const p = useSearchParams();
  const score = Number(p.get("score") || 0);
  const band = (p.get("band") || "—") as "Command"|"Operational"|"Fragmented"|"Reactive"|"—";
  const clarity = Number(p.get("c") || 0);
  const consistency = Number(p.get("k") || 0);
  const composure = Number(p.get("p") || 0);

  const moves: Record<string,string[]> = {
    Command: ["Install regression alarms", "Codify exception paths", "Stress-test cadence"],
    Operational: ["Remove two bottlenecks", "Tighten decision logs", "Stabilize metrics"],
    Fragmented: ["Define 90-day outcomes", "Clear decision rights", "Unify handoffs"],
    Reactive: ["Clarity-first triage", "Limit WIP", "De-escalation protocol"],
    "—": [],
  };

  return (
    <div className="mx-auto max-w-[900px] px-6 py-16">
      <h1 className="text-3xl font-medium">Your Confidence Index</h1>
      <p className="text-neutral-600 mt-2">
        Score: <strong>{score}</strong> · Band: <strong>{band}</strong>
      </p>

      <div className="mt-6 grid md:grid-cols-3 gap-4">
        <Stat label="Clarity" value={clarity} />
        <Stat label="Consistency" value={consistency} />
        <Stat label="Composure" value={composure} />
      </div>

      <div className="mt-8 rounded-[16px] border border-black/10 p-6">
        <h2 className="text-xl mb-3">Immediate Moves</h2>
        <ul className="list-disc pl-6 space-y-2">
          {(moves[band] || moves["Fragmented"]).map((m, i) => <li key={i}>{m}</li>)}
        </ul>

        <div className="mt-6 flex flex-wrap gap-3">
          <a href={CAL_URL} className="inline-flex items-center rounded-[16px] px-5 py-3 bg-[#00C7E3] text-white font-medium">
            Book a 15-min Executive Induction
          </a>
          <EmailCapture />
        </div>
      </div>

      <div className="mt-10 text-sm text-neutral-500">
        <p>Confidence = geometric balance of Clarity × Consistency × Composure. Your index is constrained by the weakest pillar.</p>
      </div>
    </div>
  );
}

function Stat({ label, value }:{label:string; value:number}) {
  return (
    <div className="rounded-[16px] border border-black/10 p-4">
      <div className="text-sm text-neutral-500">{label}</div>
      <div className="text-2xl font-medium">{Math.round(value)}</div>
    </div>
  );
}

function EmailCapture() {
  const [email, setEmail] = React.useState("");
  const [sent, setSent] = React.useState(false);

  const submit = async () => {
    const res = await fetch("/api/email/assessment-report", {
      method: "POST",
      body: JSON.stringify({ email }),
    });
    if (res.ok) setSent(true);
  };

  return (
    <div className="grid sm:grid-cols-[1fr_auto] gap-2">
      <input
        value={email}
        onChange={(e)=>setEmail(e.target.value)}
        placeholder="Email for full report"
        className="rounded-[12px] bg-black/[.03] border border-black/10 px-4 py-3 min-w-[260px]"
      />
      <button onClick={submit} className="rounded-[16px] bg-black/80 text-white font-medium px-5 py-3">
        {sent ? "Sent ✓" : "Send Report"}
      </button>
    </div>
  );
}
