const path = require("path");
const dotenvPath = path.resolve(__dirname, "../.env");
require("dotenv").config({ path: dotenvPath });

console.log("✅ Loaded env from:", dotenvPath);

const privateKey = Buffer.from(
  process.env.GOOGLE_PRIVATE_KEY_B64,
  "base64"
).toString("utf-8");
const fs = require("fs");
const { google } = require("googleapis");

async function fetchSocials() {
  const auth = new google.auth.JWT(
    process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    null,
    privateKey,
    ["https://www.googleapis.com/auth/spreadsheets.readonly"]
  );

  const sheets = google.sheets({ version: "v4", auth });
  const sheetId = process.env.GOOGLE_SHEET_ID;

  const res = await sheets.spreadsheets.values.get({
    spreadsheetId: sheetId,
    range: "Social-Posts", // Adjust if your sheet is named differently
  });

  const rows = res.data.values;
  const headers = rows[0];
  const data = rows
    .slice(1)
    .map((row) => Object.fromEntries(headers.map((h, i) => [h, row[i] || ""])));

  const filtered = data.filter(
    (row) =>
      row.Company === "Datopia" &&
      (row.Status === "Ready" || row.Status === "Completed")
  );

  fs.writeFileSync(
    "public/data/socials.json",
    JSON.stringify(filtered, null, 2)
  );
  console.log("✅ Socials data written to public/data/socials.json");
}

fetchSocials().catch((err) => {
  console.error("❌ Failed to fetch socials:", err);
  process.exit(1);
});
