const express = require("express");
const getFbVideoInfo = require("fb-downloader-scrapper");

const app = express();
const PORT = process.env.PORT || 3000;

app.get("/video-info", async (req, res) => {
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
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
