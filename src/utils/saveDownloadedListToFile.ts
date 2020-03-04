import * as fs from 'fs';

export const saveDownloadedListToFile = (
  list: string[]
): Promise<void | Error> => {
  const filename = 'downloaded.txt';
  const content = list.join('\n');

  return new Promise((resolve, reject) => {
    fs.writeFile(`${process.cwd()}/${filename}`, content, err => {
      if (err) {
        console.log(`Error writing to file. File name: ${filename}`);
        reject(err);
      }

      console.log(
        `File created with list of downloaded S3 objects. File name: ${filename}`
      );
      resolve();
    });
  });
};
