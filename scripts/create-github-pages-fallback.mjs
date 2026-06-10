import { copyFile, stat } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { join } from "node:path";

const distDirectory = fileURLToPath(new URL("../dist/", import.meta.url));
const indexPath = join(distDirectory, "index.html");
const fallbackPath = join(distDirectory, "404.html");

await stat(indexPath);
await copyFile(indexPath, fallbackPath);
