const fs = require("fs");
const path = require("path");
const https = require("https");

const apiKey = process.env.GOOGLE_API_KEY;
const placeId = process.env.GOOGLE_PLACE_ID;

const TESTIMONIALS_PATH = path.join(
  __dirname,
  "../public/data/testimonials.json"
);
const OUTPUT_PATH = path.join(__dirname, "../public/data/reviews.json");

const fetchGoogleReviews = () => {
  const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=reviews,rating,user_ratings_total&key=${apiKey}`;

  return new Promise((resolve, reject) => {
    https
      .get(url, (res) => {
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
      })
      .on("error", reject);
  });
};

(async () => {
  try {
    const googleResult = await fetchGoogleReviews();
    const googleReviews = (googleResult?.reviews || []).filter(
      (r) => r.rating >= 4
    );
    googleReviews.push({
      author_name: "Fake Reviewer",
      rating: 5,
      text: "This is a test review from Google.",
      time: Date.now() / 1000,
      relative_time_description: "Just now",
      author_url: null,
      profile_photo_url: null,
      language: "en",
    });

    const irlData = JSON.parse(fs.readFileSync(TESTIMONIALS_PATH, "utf-8"));
    const irlReviews = irlData?.result?.testimonials || [];

    const allReviews = [...irlReviews, ...googleReviews];

    const averageRating =
      allReviews.length > 0
        ? (
            allReviews.reduce((sum, r) => sum + (r.rating || 0), 0) /
            allReviews.length
          ).toFixed(1)
        : null;

    const combined = {
      average_rating: averageRating,
      total_reviews: allReviews.length,
      reviews: allReviews,
    };

    fs.writeFileSync(OUTPUT_PATH, JSON.stringify(combined, null, 2));
    console.log("✅ reviews.json updated successfully.");
  } catch (error) {
    console.error("❌ Failed to update reviews:", error);
    process.exit(1);
  }
})();
