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

    try {
      const reader = res.body?.getReader();
      if (!reader) return new Response("Error", { status: 500 });
      const stream = new ReadableStream({
        start(controller) {
          const pump = async () => {
            const { done, value } = await reader?.read();
            if (done) return controller.close();
            controller.enqueue(value);
            pump();
          };
          return pump();
        },
      });

      return new Response(stream, {
        status: res.status,
        headers: res.headers,
      });
    } catch (e) {
      return new Response("Error", { status: 500 });
    }
  }
}
