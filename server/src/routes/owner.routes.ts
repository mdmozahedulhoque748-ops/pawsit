import { Hono } from "hono";
import { getOwnerProfile, loginWithEmail } from "@/controllers/owner.controller";

const ownerRoutes = new Hono();

ownerRoutes.get("/profile", getOwnerProfile);
ownerRoutes.post("/login", loginWithEmail);



export { ownerRoutes };