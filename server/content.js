import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

const COLLECTIONS = new Set(["posts", "products", "learning"]);

export function readCollection(name) {
  if (!COLLECTIONS.has(name)) {
    throw new Error(`Unknown content collection: ${name}`);
  }

  const dataDirectory = resolve(process.env.DATA_DIR || "data");
  const seedDirectory = resolve(process.cwd(), "data");
  const directories =
    dataDirectory === seedDirectory ? [dataDirectory] : [dataDirectory, seedDirectory];
  for (const directory of directories) {
    try {
      const records = JSON.parse(readFileSync(resolve(directory, `${name}.json`), "utf-8"));
      if (!Array.isArray(records)) {
        throw new Error(`Content collection "${name}" must contain a JSON array`);
      }
      return records;
    } catch (error) {
      if (error && typeof error === "object" && "code" in error && error.code === "ENOENT") {
        continue;
      }
      throw error;
    }
  }
  return [];
}

export function writeCollection(name, records) {
  if (!COLLECTIONS.has(name) || !Array.isArray(records)) {
    throw new Error(`Invalid content collection: ${name}`);
  }
  const dataDirectory = resolve(process.env.DATA_DIR || "data");
  mkdirSync(dataDirectory, { recursive: true });
  const file = resolve(dataDirectory, `${name}.json`);
  writeFileSync(file, JSON.stringify(records, null, 2), "utf-8");
}
