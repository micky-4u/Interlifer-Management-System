import { NextResponse } from "next/server";

export const GET = async ()=>{
  const message: string = "Hello World"
  return new NextResponse(message)
}