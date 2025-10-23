// app/api/assessment/route.ts
import { NextRequest, NextResponse } from "next/server";

type Body = { answers: unknown };

function isValidAnswers(val: unknown): val is number[] {
  return (
    Array.isArray(val) &&
    val.length === 12 &&
    val.every((n) => Number.isFinite(n) && (n as number) >= 1 && (n as number) <= 5)
  );
}

export async function POST(req: NextRequest) {
  const body = (await req.json()) as Body;

  if (!isValidAnswers(body.answers)) {
    return NextResponse.json({ error: "Invalid" }, { status: 400 });
  }

  const answers = body.answers; // typed as number[] by the guard above

  const avg = (arr: number[]) => arr.reduce((a, b) => a + b, 0) / arr.length;
  const clarity = avg(answers.slice(0, 4)) * 20; // 1..5 -> 20..100
  const consistency = avg(answers.slice(4, 8)) * 20;
  const composure = avg(answers.slice(8, 12)) * 20;

  // geometric mean emphasizes the weakest pillar
  const ci = Math.round(Math.cbrt(clarity * consistency * composure));
  const band = ci >= 80 ? "Command" : ci >= 60 ? "Operational" : ci >= 40 ? "Fragmented" : "Reactive";

  const id = crypto.randomUUID(); // placeholder for future persistence

  return NextResponse.json({
    id,
    score: ci,
    band,
    scores: {
      clarity: Math.round(clarity),
      consistency: Math.round(consistency),
      composure: Math.round(composure),
    },
  });
}
