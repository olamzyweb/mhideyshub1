import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";
import fs from "fs/promises";
import path from "path";

export const runtime = "nodejs";

const hasCloudinary = Boolean(
  process.env.CLOUDINARY_CLOUD_NAME && process.env.CLOUDINARY_API_KEY && process.env.CLOUDINARY_API_SECRET
);

if (hasCloudinary) {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
  });
}

export async function POST(req: Request) {
  const formData = await req.formData();
  const files = formData.getAll("files").filter((file): file is File => file instanceof File);

  if (files.length === 0) {
    return NextResponse.json({ error: "No files" }, { status: 400 });
  }

  const urls: string[] = [];

  for (const file of files) {
    const buffer = Buffer.from(await file.arrayBuffer());

    if (hasCloudinary) {
      const result = await new Promise<{ secure_url: string }>((resolve, reject) => {
        cloudinary.uploader
          .upload_stream({ folder: "mhideys-hub" }, (error, uploaded) => {
            if (error || !uploaded) reject(error);
            else resolve(uploaded as { secure_url: string });
          })
          .end(buffer);
      });
      urls.push(result.secure_url);
    } else {
      const fileName = `${crypto.randomUUID()}-${file.name}`.replace(/\s+/g, "-");
      const uploadDir = path.join(process.cwd(), "public", "uploads");
      await fs.mkdir(uploadDir, { recursive: true });
      const filePath = path.join(uploadDir, fileName);
      await fs.writeFile(filePath, buffer);
      urls.push(`/uploads/${fileName}`);
    }
  }

  return NextResponse.json({ urls });
}
