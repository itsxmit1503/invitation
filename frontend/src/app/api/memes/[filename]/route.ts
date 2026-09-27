import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ filename: string }> }
) {
  try {
    const { filename } = await params;
    const decodedFilename = decodeURIComponent(filename);

    const candidateDirs = [
      path.join(process.cwd(), "public", "memes and sounds"),
      path.join(process.cwd(), "memes and sounds"),
      path.join(process.cwd(), "public", "celebration"),
      path.join(process.cwd(), "celebration"),
    ];

    let targetFilePath: string | null = null;

    for (const dir of candidateDirs) {
      const candidate = path.join(/*turbopackIgnore: true*/ dir, decodedFilename);
      if (candidate.startsWith(dir) && fs.existsSync(/*turbopackIgnore: true*/ candidate)) {
        targetFilePath = candidate;
        break;
      }
    }

    if (!targetFilePath) {
      return new NextResponse("File Not Found", { status: 404 });
    }

    const ext = path.extname(targetFilePath).toLowerCase();
    let contentType = "application/octet-stream";
    if (ext === ".jpg" || ext === ".jpeg") contentType = "image/jpeg";
    else if (ext === ".png") contentType = "image/png";
    else if (ext === ".webp") contentType = "image/webp";
    else if (ext === ".gif") contentType = "image/gif";
    else if (ext === ".mp3") contentType = "audio/mpeg";
    else if (ext === ".wav") contentType = "audio/wav";

    const fileBuffer = await fs.promises.readFile(/*turbopackIgnore: true*/ targetFilePath);

    return new NextResponse(fileBuffer, {
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch (error) {
    console.error("Error serving meme or audio file:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
