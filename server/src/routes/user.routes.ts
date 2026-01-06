import { Hono } from "hono";
import { deleteAccount } from "@/controllers/user.controller";

const userRoutes = new Hono();

userRoutes.delete("/delete-account", deleteAccount);

export { userRoutes };
