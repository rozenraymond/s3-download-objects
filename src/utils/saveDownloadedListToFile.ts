import * as fs from 'fs';

export const saveDownloadedListToFile = (
  list: string[]
): Promise<void | Error> => {
  const filename = 'downloaded.txt';
  const content = list.join('\n');

  // TODO: Encrypt downloaded list item using KMS
  // List key
  //   If found, use key
  //   If not found, generate new key
  // Encrypt content using key specified or generated key
  // Write encrypted content to a file

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
