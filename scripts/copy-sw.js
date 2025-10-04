// scripts/copy-sw.js
const fs = require('fs');
const path = require('path');

const src = path.join(__dirname, '..', 'public', 'sw.js');
const dest = path.join(__dirname, '..', 'build', 'sw.js');

try {
  fs.copyFileSync(src, dest);
  console.log('[copy-sw] OK:', src, '->', dest);
} catch (err) {
  console.error('[copy-sw] HATA:', err);
  process.exit(1);
}
