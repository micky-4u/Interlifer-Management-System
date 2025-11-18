import dbPool from "@/lib/db/dbconnect";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  const data = await dbPool.query("SELECT * FROM interlifer.member;")
  return NextResponse.json({ message: `Hello ${slug}!`,data:data });
}
