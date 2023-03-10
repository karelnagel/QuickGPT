import { NextRequest } from "next/server";
import { Device, devices, release } from "~/config";

export const config = {
  runtime: "edge",
};

export default async function Download(req: NextRequest) {
  const device = Device.safeParse(req.nextUrl.searchParams.get("device"));
  if (!device.success) return new Response("Invalid device", { status: 400 });
  if (device.data === "other") return Response.redirect(release, 302);

  const res = await fetch(`${release}/download/latest.json`);
  const version = (await res.json()).version;
  const file = devices[device.data].file?.(version);
  const url = `${release}/download/${file}`;
  const result = await fetch(url);
  return new Response(result.body, {
    status: result.status,
    headers: {
      ...result.headers,
      "content-disposition": `attachment; filename=QuickGPT.${file
        ?.split(".")
        .pop()}`,
    },
  });
}
