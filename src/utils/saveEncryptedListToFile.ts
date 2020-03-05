import * as fs from 'fs';
import { KMS } from 'aws-sdk';

export const saveEncryptedListToFile = (
  content: Pick<KMS.Types.EncryptResponse, 'CiphertextBlob'>
): Promise<void | Error> => {
  const filename = 'downloaded.txt';

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
