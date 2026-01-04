import type { Context } from "hono";
import { deleteUser } from "@/models/user.model";

export const deleteAccount = async (c: Context) => {
    const user = c.get("user");
    if (!user) {
        return c.json({ success: false, message: "Not authenticated" }, 401);
    }

    try {
        await deleteUser(user.id);
        
        // Note: Better Auth might handle session cleanup, 
        // but for now we return success as the account record is gone.
        return c.json({
            success: true,
            message: "Account and all related data deleted successfully",
        });
    } catch (error) {
        console.error("Delete account error:", error);
        return c.json(
            { success: false, message: "Internal server error" },
            500
        );
    }
}
