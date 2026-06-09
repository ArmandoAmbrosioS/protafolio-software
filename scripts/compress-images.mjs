import sharp from "sharp";
import { readdir, stat, writeFile, readFile } from "fs/promises";
import { join, extname } from "path";

const PUBLIC_DIR = "./public";

const CONFIGS = {
  "images/gallery": { width: 1920, quality: 82 },
  "images/projects": { width: 1200, quality: 85 },
  "images/tennis":   { width: 1200, quality: 83 },
  "images/gaming":   { width: 1200, quality: 83 },
  "images":          { width: 800,  quality: 85 },
};

function getConfig(relativePath) {
  for (const [folder, cfg] of Object.entries(CONFIGS)) {
    if (relativePath.startsWith(folder + "/") || relativePath === folder) {
      return cfg;
    }
  }
  return { width: 1200, quality: 83 };
}

async function processImage(filePath, relativePath) {
  const ext = extname(filePath).toLowerCase();
  if (![".jpg", ".jpeg", ".png"].includes(ext)) return;

  const { size: sizeBefore } = await stat(filePath);
  const { width: cfg_width, quality } = getConfig(relativePath);

  const input = await readFile(filePath);
  const meta = await sharp(input).metadata();
  const resizeOpts = meta.width > cfg_width ? { width: cfg_width } : {};

  let buffer;
  if (ext === ".png") {
    buffer = await sharp(input).resize(resizeOpts).png({ quality, compressionLevel: 9 }).toBuffer();
  } else {
    buffer = await sharp(input).resize(resizeOpts).jpeg({ quality, mozjpeg: true, progressive: true }).toBuffer();
  }

  const sizeAfter = buffer.length;
  await writeFile(filePath, buffer);

  if (sizeAfter < sizeBefore) {
    const saved = ((1 - sizeAfter / sizeBefore) * 100).toFixed(1);
    console.log(`✓ ${relativePath.padEnd(45)} ${(sizeBefore/1024).toFixed(0).padStart(7)} KB → ${(sizeAfter/1024).toFixed(0).padStart(6)} KB  (-${saved}%)`);
  } else {
    console.log(`~ ${relativePath.padEnd(45)} ya estaba optimizada`);
  }
}

async function walkDir(dir, base = PUBLIC_DIR) {
  const entries = await readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      await walkDir(full, base);
    } else {
      const rel = full.replace(base + "\\", "").replace(base + "/", "").replaceAll("\\", "/");
      await processImage(full, rel);
    }
  }
}

console.log("Comprimiendo imágenes en /public...\n");
await walkDir(PUBLIC_DIR);
console.log("\nListo.");
