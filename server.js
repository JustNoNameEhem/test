const getFbVideoInfo = require("fb-downloader-scrapper");

export default async function handler(req, res) {
    if (req.method !== "GET") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    const videoUrl = req.query.url; // Get the video URL from the query parameters

    if (!videoUrl) {
        return res.status(400).json({ error: "Video URL is required" });
    }

    try {
        const result = await getFbVideoInfo(videoUrl);
        res.json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to retrieve video info" });
    }
}
