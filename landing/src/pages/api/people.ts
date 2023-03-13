import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { env } from "~/env.mjs";

export const config = {
  runtime: "edge",
};

const Person = z.object({
  id: z.string(),
  name: z.string(),
  prompt: z.string().optional(),
  image: z.string().url().optional(),
  type: z.string(),
});

export default async function People(req: NextRequest) {
  if (req.method === "GET") {
    const res = await fetch(
      "https://api.notion.com/v1/databases/e341e5fe57944b57821e12cf62b73e87/query",
      {
        method: "POST",
        headers: {
          body: JSON.stringify({
            sorts: [
              {
                property: "Type",
                direction: "descending",
              },
            ],
          }),
          "Content-Type": "application/json",
          Authorization: `Bearer ${env.NOTION_API_KEY}`,
          "Notion-Version": "2022-06-28",
        },
      }
    );
    const data = await res.json();
    const results = data.results.map((result: any) => ({
      id: result.id,
      name: result.properties.Name.title[0].text.content,
      prompt: result.properties.Prompt.rich_text[0]?.text.content,
      image: result.properties.Image?.files[0]?.file.url,
      type: result.properties.Type.select.name,
    }));

    const validated = Person.array().safeParse(results);
    if (!validated.success) {
      return NextResponse.json({ error: validated.error });
    }

    return NextResponse.json(validated.data);
  }
}
