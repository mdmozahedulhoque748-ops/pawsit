import { Hono } from "hono";
import { uploadImage } from "@/controllers/upload.controller";

const uploadRoutes = new Hono();

uploadRoutes.post("/image", uploadImage);

export { uploadRoutes };
