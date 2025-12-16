import { Hono } from "hono";
import { createSitterProfile } from "@/controllers/sitter.controller";

const sitterRoutes = new Hono();

// POST /api/sitters/become-sitter
sitterRoutes.post("/become-sitter", createSitterProfile);

export { sitterRoutes };