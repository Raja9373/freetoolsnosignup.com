const fs = require('fs');
const path = require('path');
const zlib = require('zlib');

// CRC32 table
const crcTable = new Uint32Array(256);
for (let i = 0; i < 256; i++) {
  let c = i;
  for (let k = 0; k < 8; k++) {
    c = (c & 1) ? (0xedb88320 ^ (c >>> 1)) : (c >>> 1);
  }
  crcTable[i] = c;
}

function crc32(buf) {
  let c = 0xffffffff;
  for (let i = 0; i < buf.length; i++) {
    c = crcTable[(c ^ buf[i]) & 0xff] ^ (c >>> 8);
  }
  return (c ^ 0xffffffff) >>> 0;
}

function createChunk(type, data) {
  const len = data.length;
  const buf = Buffer.alloc(12 + len);
  buf.writeUInt32BE(len, 0);
  buf.write(type, 4, 4, 'ascii');
  data.copy(buf, 8);
  const typeAndData = buf.subarray(4, 8 + len);
  const crc = crc32(typeAndData);
  buf.writeUInt32BE(crc, 8 + len);
  return buf;
}

function generatePNG(size, isMaskable = false) {
  // Signature
  const sig = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);

  // IHDR
  const ihdrData = Buffer.alloc(13);
  ihdrData.writeUInt32BE(size, 0);
  ihdrData.writeUInt32BE(size, 4);
  ihdrData[8] = 8; // 8-bit depth
  ihdrData[9] = 6; // RGBA
  ihdrData[10] = 0; // Deflate
  ihdrData[11] = 0; // Filter
  ihdrData[12] = 0; // No interlace
  const ihdr = createChunk('IHDR', ihdrData);

  // Raw image data: scanlines with filter byte 0
  // Each scanline: 1 byte filter (0) + size * 4 bytes RGBA
  const rawData = Buffer.alloc((1 + size * 4) * size);
  let pos = 0;

  const cx = size / 2;
  const cy = size / 2;
  const radius = size * 0.42;

  // Background Royal Navy: #0A1931 -> R:10, G:25, B:49
  // Accent Gold: #C5A059 -> R:197, G:160, B:89
  // Orange Accent: #FF7A00 -> R:255, G:122, B:0
  // White: #FFFFFF -> R:255, G:255, B:255

  for (let y = 0; y < size; y++) {
    rawData[pos++] = 0; // Filter None
    for (let x = 0; x < size; x++) {
      const dx = x - cx;
      const dy = y - cy;
      const dist = Math.sqrt(dx * dx + dy * dy);

      let r = 10;
      let g = 25;
      let b = 49;
      let a = 255;

      // Outer gold border ring
      if (!isMaskable && dist > radius - 6 && dist <= radius) {
        r = 197;
        g = 160;
        b = 89;
      } else if (!isMaskable && dist > radius) {
        // Transparent outside circular badge if not maskable
        r = 0;
        g = 0;
        b = 0;
        a = 0;
      } else {
        // Central icon pattern (wrench/gear & bolt geometry)
        // Draw centered gold diamond / bolt
        const manhattan = Math.abs(dx) + Math.abs(dy);
        if (manhattan < size * 0.22 && manhattan > size * 0.16) {
          // Gold inner frame
          r = 197;
          g = 160;
          b = 89;
        } else if (dist < size * 0.11) {
          // Orange center core
          r = 255;
          g = 122;
          b = 0;
        } else if (Math.abs(dx) < size * 0.04 && Math.abs(dy) < size * 0.28) {
          // Gold vertical cross beam
          r = 255;
          g = 255;
          b = 255;
        } else if (Math.abs(dy) < size * 0.04 && Math.abs(dx) < size * 0.28) {
          // Gold horizontal cross beam
          r = 255;
          g = 255;
          b = 255;
        }
      }

      rawData[pos++] = r;
      rawData[pos++] = g;
      rawData[pos++] = b;
      rawData[pos++] = a;
    }
  }

  // Compress IDAT
  const compressed = zlib.deflateSync(rawData);
  const idat = createChunk('IDAT', compressed);

  // IEND
  const iend = createChunk('IEND', Buffer.alloc(0));

  return Buffer.concat([sig, ihdr, idat, iend]);
}

const pubDir = path.join(__dirname, '../public');

fs.writeFileSync(path.join(pubDir, 'pwa-192x192.png'), generatePNG(192));
fs.writeFileSync(path.join(pubDir, 'pwa-512x512.png'), generatePNG(512));
fs.writeFileSync(path.join(pubDir, 'pwa-maskable-512x512.png'), generatePNG(512, true));
fs.writeFileSync(path.join(pubDir, 'apple-touch-icon.png'), generatePNG(180));

console.log('Successfully generated compliant PWA PNG icons!');
