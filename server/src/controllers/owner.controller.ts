import type { Context } from "hono";
import { findOwnerById, createOwner } from "@/models/owner.model";


export const getOwnerProfile = async (c: Context) => {
    const user = c.get("user");
    if (!user) {
        return c.json({ success: false, message: "Not authenticated" }, 401);
    }
    console.log(user.id);

    const owner = await findOwnerById(user.id);
    if (!owner) {
        return c.json({ success: false, message: "Owner not found" }, 404);
    }

    return c.json({ success: true, owner });
}

export const createOwnerApi = async (c: Context) => {
    try {
        const body = await c.req.json();

        // Create new owner
        const newOwner = await createOwner(body);

        return c.json(
            {
                success: true,
                message: "Owner created successfully",
                owner: newOwner,
            },
            201
        );
    } catch (error) {
        console.error("Create owner error:", error);
        return c.json(
            { success: false, message: "Internal server error" },
            500
        );
    }
}

