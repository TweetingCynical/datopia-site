const fs = require("fs");
const path = require("path");
const https = require("https");

const apiKey = process.env.GOOGLE_API_KEY;
const placeId = process.env.GOOGLE_PLACE_ID;

const TESTIMONIALS_PATH = path.join(__dirname, "../public/data/testimonials.json");
const OUTPUT_PATH = path.join(__dirname, "../public/data/reviews.json");

const fetchGoogleReviews = () => {
  const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=reviews,rating,user_ratings_total&key=${apiKey}`;

  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let rawData = "";
      res.on("data", (chunk) => (rawData += chunk));
      res.on("end", () => {
        try {
          const parsed = JSON.parse(rawData);
          resolve(parsed.result || {});
        } catch (err) {
          reject(err);
        }
      });
    }).on("error", reject);
  });
};

(async () => {
  try {
    const googleResult = await fetchGoogleReviews();

    // Load IRL testimonials
    const irlData = JSON.parse(fs.readFileSync(TESTIMONIALS_PATH, "utf-8"));

    const combined = {
      average_rating: googleResult.rating || null,
      total_reviews: googleResult.user_ratings_total || 0,
      reviews: [
        ...(irlData?.result?.testimonials || []),
        ...(googleResult?.reviews || []).filter((r) => r.rating >= 4),
      ],
    };

    fs.writeFileSync(OUTPUT_PATH, JSON.stringify(combined, null, 2));
    console.log("✅ reviews.json updated successfully.");
  } catch (error) {
    console.error("❌ Failed to update reviews:", error);
    process.exit(1);
  }
})();
