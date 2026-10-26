import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

// Export a real PNG at a stable URL so GitHub Pages can serve it without a server.
export const dynamic = "force-static";

export async function GET() {
  const portrait = await readFile(join(process.cwd(), "public", "profile.png"));

  return new ImageResponse(
    (
      <img
        src={`data:image/png;base64,${portrait.toString("base64")}`}
        alt="Kun Liu"
        width={96}
        height={96}
        style={{ objectFit: "cover", objectPosition: "center top" }}
      />
    ),
    { width: 96, height: 96 },
  );
}
