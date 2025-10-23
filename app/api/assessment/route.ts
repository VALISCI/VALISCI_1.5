// app/api/assessment/route.ts
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { answers } = await req.json();
  if (!Array.isArray(answers) || answers.length !== 12 || answers.some((n:any)=> Number(n) < 1 || Number(n) > 5)) {
    return NextResponse.json({ error: "Invalid" }, { status: 400 });
  }

  const avg = (arr:number[]) => arr.reduce((a,b)=>a+b,0)/arr.length;
  const clarity = avg(answers.slice(0,4)) * 20;       // 1..5 -> 20..100
  const consistency = avg(answers.slice(4,8)) * 20;
  const composure = avg(answers.slice(8,12)) * 20;

  const ci = Math.round(Math.cbrt(clarity * consistency * composure)); // geometric mean → 0..100
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
