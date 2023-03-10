import { NextRequest, NextResponse } from "next/server";
import { getVersion } from "./download";
import { release } from "~/config";

export const config = {
  runtime: "edge",
};
const getSig = async (url: string) => {
  const res = await fetch(`${url}.sig`);
  const sig = await res.text();
  return sig;
};

export default async function Message(req: NextRequest) {
  const version = await getVersion();
  const macUrl = `${release}/download/QuickGPT_universal.app.tar.gz`;
  const winUrl = `${release}/download/QuickGPT_${version}_x64_en-US.msi.zip`;
  const linuxUrl = `${release}/download/quick-gpt_${version}_amd64.AppImage.tar.gz`;
  const macSig = await getSig(macUrl);
  const winSig = await getSig(winUrl);
  const linuxSig = await getSig(linuxUrl);
  const platforms = {
    "windows-x86_64": {
      url: winUrl,
      signature: winSig,
    },
    "linux-x86_64": {
      url: linuxUrl,
      signature: linuxSig,
    },
    "darwin-aarch64": {
      url: macUrl,
      signature: macSig,
    },
    "darwin-x86_64": {
      url: macUrl,
      signature: macSig,
    },
  };
  return NextResponse.json(
    { version, platforms },
    {
      headers: { "Cache-Control": "s-maxage=3600, public" },
    }
  );
}
