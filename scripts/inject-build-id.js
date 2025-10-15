const fs = require("fs");
const path = require("path");

// Vercel'de commit SHA / deployment ID varsa onu kullan; yoksa tarih tabanlı bir ID üret
const id = (process.env.VERCEL_GIT_COMMIT_SHA || process.env.VERCEL_DEPLOYMENT_ID || Date.now().toString(36))
  .toString()
  .slice(0, 12);

// Çıktıyı public klasörüne yazıyoruz; SW buradan okuyacak
const outPath = path.join(__dirname, "..", "public", "sw-build-id.txt");
fs.writeFileSync(outPath, id, "utf8");

console.log("[SW_BUILD_ID]", id, "->", outPath);
