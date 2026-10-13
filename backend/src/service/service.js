import ImageKit from "imagekit";
import config from "../config/config.js";

const imagekit = new ImageKit({
    publicKey: config.IMAGEKIT_PUBLIC_KEY || process.env.IMAGEKIT_PUBLIC_KEY,
    privateKey: config.IMAGEKIT_PRIVATE_KEY || process.env.IMAGEKIT_PRIVATE_KEY,
    urlEndpoint: config.IMAGEKIT_URL_ENDPOINT || process.env.IMAGEKIT_URL_ENDPOINT,
});

export const uploadFile = async ({ buffer, fileName, mimeType = "image/jpeg" }) => {
    try {
        const response = await imagekit.upload({
            file: buffer,
            fileName,
            folder: "/products",
            useUniqueFileName: true,
        });

        return response;
    } catch (err) {
        console.warn("ImageKit upload error (using data URL fallback):", err.message || err);
        const base64 = buffer.toString("base64");
        return {
            url: `data:${mimeType};base64,${base64}`
        };
    }
};