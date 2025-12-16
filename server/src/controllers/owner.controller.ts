import type { Context } from "hono";
import { findOwnerById, findOwnerByEmail, createOwner } from "@/models/owner.model";


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

export const loginWithEmail = async (c: Context) => {
    try {
        const body = await c.req.json();
        const { email, name } = body;

        // Validate input
        if (!email || !name) {
            return c.json(
                { success: false, message: "Email and name are required" },
                400
            );
        }

        // Check if user already exists
        const existingUser = await findOwnerByEmail(email);
        
        if (existingUser) {
            // User already exists - return existing user info
            return c.json({
                success: true,
                message: "User logged in successfully",
                isNewUser: false,
                user: existingUser,
            });
        }

        // Create new user
        const newUser = await createOwner({
            email,
            name,
        });

        return c.json(
            {
                success: true,
                message: "User registered and logged in successfully",
                isNewUser: true,
                user: newUser,
            },
            201
        );
    } catch (error) {
        console.error("Login error:", error);
        return c.json(
            { success: false, message: "Internal server error" },
            500
        );
    }
}