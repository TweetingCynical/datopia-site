require("dotenv").config();

console.log("PRIVATE_KEY_B64 loaded?", !!process.env.GOOGLE_PRIVATE_KEY_B64);
console.log("Length:", process.env.GOOGLE_PRIVATE_KEY_B64?.length);
