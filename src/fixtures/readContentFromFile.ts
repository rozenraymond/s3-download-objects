import { readFile } from 'fs';

export const readContentFromFile = (filename: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    readFile(filename, 'utf-8', (err, data) => {
      if (err) {
        reject(err);
      }

      resolve(data);
    });
  });
};
