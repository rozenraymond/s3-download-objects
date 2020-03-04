import fs from 'fs';

// Content data could be of any type - Hence, setting it to "any" type
export const writeContentToFile = (
  filePath: string,
  content: any // eslint-disable-line
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
