import { NextRequest } from "next/server";
import { env } from "~/env.mjs";

export const config = {
  runtime: "edge",
};

export default async function GPT(req: NextRequest) {
  if (req.method === "POST") {
    const body = await req.text();
    const messages = JSON.parse(body).messages;
    const url = "https://api.openai.com/v1/chat/completions";
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages,
        stream: true,
      }),
    });

    return new Response(res.body, {
      status: res.status,
      headers: res.headers,
    });
  }
}
