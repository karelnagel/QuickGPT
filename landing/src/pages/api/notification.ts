import { NextRequest, NextResponse } from "next/server";
import { get } from "@vercel/edge-config";

export const config = {
  runtime: "edge",
};

export default async function Message(req: NextRequest) {
  const message = await get("message");
  return NextResponse.json(message, {
    headers: { "Cache-Control": "s-maxage=3600, public" },
  });
}
