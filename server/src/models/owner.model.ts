import { db } from "@/db";
import { user } from "@/db/auth.schema";
import { eq } from "drizzle-orm";


export const findOwnerById = async (userId: string) => {
    const owner = await db
        .select()
        .from(user)
        .where(eq(user.id, userId))
        .limit(1);
    return owner[0] ?? null;
}

export const findOwnerByEmail = async (email: string) => {
    const owner = await db
        .select()
        .from(user)
        .where(eq(user.email, email))
        .limit(1);
    return owner[0] ?? null;
}

export const createOwner = async (userData: { email: string; name: string }) => {
    const newUser = await db
        .insert(user)
        .values({
            email: userData.email,
            name: userData.name,
        })
        .returning();
    return newUser[0] ?? null;
}