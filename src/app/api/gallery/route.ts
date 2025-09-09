import { NextResponse } from "next/server";
import { db } from "~/server/db";
// If you need the type only, keep schema import; not strictly required for this route
// import { images } from "~/server/db/schema";
import { createClerkClient } from "@clerk/backend";

// Create a Clerk server client (works the same across Clerk versions)
const clerk = createClerkClient({
  secretKey: process.env.CLERK_SECRET_KEY!,
});

// Safe helper – returns null on error or when no server key
async function getUserSafe(userId: string) {
  try {
    if (!process.env.CLERK_SECRET_KEY) return null;
    // ✅ singular getUser (not getUsers)
    const u = await clerk.users.getUser(userId);
    return u;
  } catch {
    return null;
  }
}

export async function GET() {
  try {
    // 1) Read all images from your DB (Drizzle query API you already use)
    const allImages = await db.query.images.findMany();

    if (!allImages?.length) {
      return NextResponse.json({ ok: true, count: 0, uploads: [] }, { status: 200 });
    }

    // 2) Unique userIds from images
    const uniqueUserIds = Array.from(new Set(allImages.map((img) => img.userId)));

    // 3) Fetch Clerk users in parallel (null if missing)
    const users: Array<any | null> = await Promise.all(
      uniqueUserIds.map((uid) => getUserSafe(uid))
    );

    // 4) Build user map -> { id, name, profileImage }
    const userMap = new Map<string, { id: string; name: string; profileImage: string | null }>();

    users.forEach((u: any | null) => {
      if (!u) return;

      // Clerk fields vary by SDK version – be defensive
      const name: string =
        u.fullName ||
        [u.firstName, u.lastName].filter(Boolean).join(" ") ||
        u.username ||
        (u.emailAddresses && u.emailAddresses[0]?.emailAddress) ||
        u.primaryEmailAddress?.emailAddress ||
        u.id ||
        "Unknown";

      const profileImage: string | null =
        u.profileImageUrl ??
        u.imageUrl ??
        u.image_url ??
        u.image_256 ??
        null;

      userMap.set(u.id, { id: u.id, name, profileImage });
    });

    // 5) Attach user details to each image
    const uploads = allImages.map((img) => {
      const user = userMap.get(img.userId) ?? {
        id: img.userId,
        name: img.userId,
        profileImage: null,
      };

      return {
        id: img.id,
        url: img.imageUrl,                              // your DB column
        name: img.imageName ?? img.filename ?? null,    // friendly name
        createdAt: img.createdAt,

        // fields your other site expects:
        uploaderName: user.name,
        uploaderAvatar: user.profileImage,

        // extra structured field if you need it:
        user: {
          id: user.id,
          name: user.name,
          profileImage: user.profileImage,
        },
      };
    });

    return NextResponse.json({ ok: true, count: uploads.length, uploads }, { status: 200 });
  } catch (err: any) {
    console.error("Gallery route error:", err);
    return NextResponse.json({ ok: false, error: err?.message ?? String(err) }, { status: 500 });
  }
}