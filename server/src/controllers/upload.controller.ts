import type { Context } from "hono";

export const uploadImage = async (c: Context) => {
    try {
        const body = await c.req.parseBody();
        const file = body.file as File;

        if (!file) {
            return c.json({ success: false, message: "No file uploaded" }, 400);
        }

        const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
        const uploadPreset = process.env.CLOUDINARY_UPLOAD_PRESET;

        if (!cloudName || !uploadPreset) {
            console.error("Cloudinary config missing");
            return c.json({ success: false, message: "Server configuration error" }, 500);
        }

        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", uploadPreset);

        const response = await fetch(
            `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
            {
                method: "POST",
                body: formData,
            }
        );

        const data = await response.json() as any;

        if (data.secure_url) {
            return c.json({
                success: true,
                url: data.secure_url,
            });
        } else {
            console.error("Cloudinary upload failed:", data);
            return c.json({ success: false, message: "Upload failed" }, 500);
        }
    } catch (error) {
        console.error("Upload error:", error);
        return c.json({ success: false, message: "Internal server error" }, 500);
    }
};
