import { createHash } from "crypto";
import fs from "fs";

export async function inspectLocalFile(filePath: string) {
  const stat = await fs.promises.stat(filePath);

  if (!stat.isFile()) {
    throw new Error("Path is not a regular file.");
  }

  const hash = createHash("sha256");

  await new Promise<void>((resolve, reject) => {
    const stream = fs.createReadStream(filePath);

    stream.on("data", chunk => hash.update(chunk));
    stream.on("error", reject);
    stream.on("end", resolve);
  });

  return {
    sizeBytes: stat.size,
    sha256: hash.digest("hex"),
  };
}
