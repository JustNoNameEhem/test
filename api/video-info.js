const getFbVideoInfo = require("fb-downloader-scrapper");
export default async function handler(req, res) {
    // Set CORS headers to allow requests from any origin
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Origin', 'https://bahrananime.blogspot.com');

    // Handle preflight OPTIONS request for CORS
    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    // Allow only GET requests
    if (req.method !== "GET") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    // Get the video URL from the query parameters
    const videoUrl = req.query.url;

    // Validate the video URL
    if (!videoUrl) {
        return res.status(400).json({ error: "Video URL is required" });
    }

    try {
        // Fetch video information using the fb-downloader-scrapper library
        const result = await getFbVideoInfo(videoUrl);

        // Return the result as JSON
        res.json(result);
    } catch (error) {
        // Log any errors and send a 500 response
        console.error("Error retrieving video info:", error);
        res.status(500).json({ error: "Failed to retrieve video info" });
    }
}
