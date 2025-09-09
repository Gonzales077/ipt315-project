import { NextResponse } from "next/server";
import { db } from "~/server/db";
import { images } from "~/server/db/schema";

export async function GET() {
  try {
    // Get all images from DB
    const allImages = await db.select().from(images);

    // Map response
    return NextResponse.json(
      allImages.map((img) => ({
        id: img.id,
        uploadedBy: img.userId,
        url: img.imageUrl,
        name: img.imageName || img.filename,
        createdAt: img.createdAt,
      }))
    );
  } catch (err: any) {
    console.error("Error fetching gallery:", err);
    return NextResponse.json(
      { error: "Failed to fetch gallery", details: err.message },
      { status: 500 }
    );
  }
}