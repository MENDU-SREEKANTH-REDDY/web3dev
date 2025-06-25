// src/app/api/generate/route.ts
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { topic } = await req.json();

  const tasks = [
    `Understand basics of ${topic}`,
    `Watch a short video on ${topic}`,
    `Build a tiny project using ${topic}`,
    `Read an article about ${topic}`,
    `Summarize what you've learned in ${topic}`,
  ];

  return NextResponse.json({ tasks });
}
