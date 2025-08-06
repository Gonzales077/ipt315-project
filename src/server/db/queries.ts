import { auth } from "@clerk/nextjs/server";
import "server-only";
import { db } from "../db";
import { desc, eq, or } from "drizzle-orm";


export async function getMyImages() {
      const user = await auth();
    
          if (!user?.userId) throw new Error("Invalid userID");

           const images = await db.query.images.findMany({
             where: (model, { eq }) => eq(model.userId, user.userId),
            orderBy: (model, { desc }) => desc(model.id),
           });

          

          return images;

}