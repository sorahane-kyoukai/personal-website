import { copyFile, stat } from "node:fs/promises";
import { join } from "node:path";

const distDirectory = new URL("../dist/", import.meta.url);
const indexPath = join(distDirectory.pathname, "index.html");
const fallbackPath = join(distDirectory.pathname, "404.html");

await stat(indexPath);
await copyFile(indexPath, fallbackPath);
