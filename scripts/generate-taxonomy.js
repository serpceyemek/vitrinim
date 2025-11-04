// ✅ scripts/generateTaxonomy.js
// Google Sheet olmadan basit CSV → taxonomy.json dönüştürücü
// Yinelenen ve boş satırları otomatik temizler

import fs from "fs";
import path from "path";

// --- CSV'yi satırlara ve sütunlara ayır ---
function parseCSV(csvText) {
  const lines = csvText.trim().split(/\r?\n/);
  const headers = lines[0].split(",").map((h) => h.trim());
  return lines.slice(1).map((line) => {
    const cols = line.split(",").map((c) => c.trim());
    const obj = {};
    headers.forEach((h, i) => (obj[h] = cols[i] ?? ""));
    return obj;
  });
}

// --- Taksonomiyi inşa et ---
function buildTaxonomy(rows) {
  const taxonomy = {};

  for (const r of rows) {
    const parent = (r.parent || "").trim();
    const child = (r.child || "").trim();

    // Boş satırları atla
    if (!parent || !child) continue;

    const slug = parent ? `${parent}/${child}` : child;

    // Düğümler yoksa oluştur
    if (!taxonomy[parent]) taxonomy[parent] = { title: parent, children: [] };
    if (!taxonomy[child]) taxonomy[child] = { title: child, children: [] };

    // Aynı slug zaten varsa tekrar ekleme
    if (!taxonomy[parent].children.some((c) => c.slug === slug)) {
      taxonomy[parent].children.push({ slug, title: child });
    }
  }

  return taxonomy;
}

// --- Ana çalıştırıcı ---
function main() {
  const projectRoot = process.cwd();
  const inputPath = path.join(projectRoot, "src", "data", "categories.csv");
  const outputPath = path.join(projectRoot, "src", "data", "taxonomy.json");

  if (!fs.existsSync(inputPath)) {
    console.error("❌ src/data/categories.csv bulunamadı.");
    process.exit(1);
  }

  const csvText = fs.readFileSync(inputPath, "utf8");
  const rows = parseCSV(csvText);
  const taxonomy = buildTaxonomy(rows);

  fs.writeFileSync(outputPath, JSON.stringify(taxonomy, null, 2), "utf8");
  console.log("✅ taxonomy.json başarıyla üretildi:", outputPath);
}

main();
