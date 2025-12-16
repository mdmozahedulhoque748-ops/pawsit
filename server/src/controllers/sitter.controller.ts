import type { Context } from "hono";
import { createSitter, findSitterByUserId, findOwnerByUserId } from "@/models/sitter.model";

export const createSitterProfile = async (c: Context) => {
    const user = c.get("user");
    if (!user) {
        return c.json({ success: false, message: "Not authenticated" }, 401);
    }

    // Check if already a sitter
    const existingSitter = await findSitterByUserId(user.id);
    if (existingSitter) {
        return c.json({ success: false, message: "Already registered as sitter" }, 400);
    }

    // Get owner data from pet_owner table
    const owner = await findOwnerByUserId(user.id);
    if (!owner) {
        return c.json({ success: false, message: "Owner profile not found" }, 404);
    }

    // Get all required fields from request body
    const body = await c.req.json();
    const {
        headline,
        bio,
        address,
        city,
        latitude,
        longitude,
        experienceYears,
        acceptsLargeDogs,
        acceptsSmallDogs,
        acceptsCats,
        acceptsFish,
        acceptsBirds,
        acceptsOtherPets,
        nidImage
    } = body;

    // Create sitter profile
    const sitter = await createSitter({
        userId: user.id,
        displayName: owner.displayName,
        displayImage: owner.displayImage,
        phoneNumber: owner.phoneNumber,
        headline,
        bio: bio ?? null,
        address,
        city,
        latitude,
        longitude,
        experienceYears: experienceYears ?? 0,
        acceptsLargeDogs: acceptsLargeDogs ?? false,
        acceptsSmallDogs: acceptsSmallDogs ?? false,
        acceptsCats: acceptsCats ?? false,
        acceptsFish: acceptsFish ?? false,
        acceptsBirds: acceptsBirds ?? false,
        acceptsOtherPets: acceptsOtherPets ?? false,
        nidImage,
    });

    return c.json({ success: true, sitter }, 201);
};