import { db } from "@/db";
import { user } from "shared/src/db/auth.schema";
import { eq } from "drizzle-orm";

export const deleteUser = async (userId: string) => {
    return await db.delete(user).where(eq(user.id, userId));
};
