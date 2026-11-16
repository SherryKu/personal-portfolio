import fs from "node:fs";
import path from "node:path";

/**
 * Finds optional files in /public while the site is being built, so the page
 * only shows what actually exists:
 *
 *   public/work/<project-slug>/web.png      the first desktop screenshot
 *   public/work/<project-slug>/web-2.png    the second desktop screenshot
 *   public/work/<project-slug>/web-3.png    the third desktop screenshot
 *   public/work/<project-slug>/mobile.png   a phone screenshot
 *   public/<anything with "resume" or "cv">.pdf
 *
 * PNG, JPG and WebP are all accepted for screenshots.
 */

const PUBLIC_DIR = path.join(process.cwd(), "public");
const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const IMAGE_EXTENSIONS = ["png", "jpg", "jpeg", "webp"];

export type Shot = { src: string; width?: number; height?: number };
export type ProjectShots = { web: Shot[]; mobile: Shot | null };

function readImageSize(file: string): { width: number; height: number } | null {
  try {
    const data = fs.readFileSync(file);

    // PNG: width and height sit in the IHDR chunk right after the signature.
    if (data.length > 24 && data.readUInt32BE(0) === 0x89504e47) {
      return { width: data.readUInt32BE(16), height: data.readUInt32BE(20) };
    }

    // JPEG: walk the segments until a start-of-frame marker.
    if (data.length > 4 && data[0] === 0xff && data[1] === 0xd8) {
      let offset = 2;
      while (offset + 9 < data.length) {
        if (data[offset] !== 0xff) {
          offset += 1;
          continue;
        }
        const marker = data[offset + 1];
        if (marker === 0xff) {
          offset += 1;
          continue;
        }
        const isFrame =
          marker >= 0xc0 && marker <= 0xcf && marker !== 0xc4 && marker !== 0xc8 && marker !== 0xcc;
        if (isFrame) {
          return { width: data.readUInt16BE(offset + 7), height: data.readUInt16BE(offset + 5) };
        }
        const hasNoLength = (marker >= 0xd0 && marker <= 0xd9) || marker === 0x01;
        offset += hasNoLength ? 2 : 2 + data.readUInt16BE(offset + 2);
      }
      return null;
    }

    // WebP: three container flavours, each storing the size differently.
    if (
      data.length > 30 &&
      data.toString("ascii", 0, 4) === "RIFF" &&
      data.toString("ascii", 8, 12) === "WEBP"
    ) {
      const flavour = data.toString("ascii", 12, 16);
      if (flavour === "VP8X") {
        return { width: 1 + data.readUIntLE(24, 3), height: 1 + data.readUIntLE(27, 3) };
      }
      if (flavour === "VP8 ") {
        return { width: data.readUInt16LE(26) & 0x3fff, height: data.readUInt16LE(28) & 0x3fff };
      }
      if (flavour === "VP8L") {
        const bits = data.readUInt32LE(21);
        return { width: (bits & 0x3fff) + 1, height: ((bits >>> 14) & 0x3fff) + 1 };
      }
    }
  } catch {
    // An unreadable image still gets shown; it just falls back to a default shape.
  }
  return null;
}

function findShots(slug: string, kind: "web" | "mobile"): Shot[] {
  const directory = path.join(PUBLIC_DIR, "work", slug);
  if (!fs.existsSync(directory)) return [];

  const pattern = kind === "web" ? /^web(?:-(\d+))?\.(png|jpe?g|webp)$/i : /^mobile\.(png|jpe?g|webp)$/i;
  const files = new Map<number, { name: string; extensionRank: number; isBase: boolean }>();

  for (const name of fs.readdirSync(directory)) {
    const match = pattern.exec(name);
    if (!match) continue;

    const extensionRank = IMAGE_EXTENSIONS.indexOf(match[kind === "web" ? 2 : 1].toLowerCase());
    if (extensionRank === -1) continue;

    const number = kind === "web" && match[1] ? Number(match[1]) : 1;
    if (!Number.isSafeInteger(number) || number < 1) continue;

    const isBase = kind === "mobile" || !match[1];
    const current = files.get(number);
    if (
      !current ||
      (isBase && !current.isBase) ||
      (isBase === current.isBase && extensionRank < current.extensionRank)
    ) {
      files.set(number, { name, extensionRank, isBase });
    }
  }

  return [...files.entries()]
    .sort(([a], [b]) => a - b)
    .map(([, { name }]) => {
      const size = readImageSize(path.join(directory, name));
      return { src: `${BASE_PATH}/work/${slug}/${encodeURIComponent(name)}`, ...(size ?? {}) };
    });
}

export function findProjectShots(slug: string): ProjectShots {
  return {
    web: findShots(slug, "web"),
    mobile: findShots(slug, "mobile")[0] ?? null,
  };
}

/** Returns a link to the résumé PDF in /public, or null when there isn't one yet. */
export function findResume(): string | null {
  let files: string[] = [];
  try {
    files = fs.readdirSync(PUBLIC_DIR);
  } catch {
    return null;
  }
  const match = files.find((name) => {
    const plain = name.normalize("NFD").replace(/[̀-ͯ]/g, "");
    return /\.pdf$/i.test(plain) && /(resume|(^|[^a-z])cv([^a-z]|$))/i.test(plain);
  });
  return match ? `${BASE_PATH}/${encodeURIComponent(match)}` : null;
}
