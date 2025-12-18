import { Hono } from "hono";
import { getOwnerProfile, createOwnerApi } from "@/controllers/owner.controller";

const ownerRoutes = new Hono();

ownerRoutes.get("/profile", getOwnerProfile);
ownerRoutes.post("/create", createOwnerApi);



export { ownerRoutes };