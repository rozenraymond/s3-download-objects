import fs from 'fs';

const saveEncryptedListToFile = content => {
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

export default saveEncryptedListToFile;