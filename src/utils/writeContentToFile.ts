import fs from 'fs';
import { Readable } from 'stream';

export const writeContentToFile = (
  filePath: string,
  content: Buffer | Uint8Array | Blob | string | Readable
): Promise<void> =>
  new Promise((resolve, reject) => {
    fs.writeFile(filePath, content, err => {
      if (err) {
        reject(err);
      }
      console.log('File downloaded. File path:', filePath);
      resolve();
    });
  });
