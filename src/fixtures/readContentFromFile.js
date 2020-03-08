import { readFile } from 'fs';

const readContentFromFile = filename => {
  return new Promise((resolve, reject) => {
    readFile(filename, 'utf-8', (err, data) => {
      if (err) {
        reject(err);
      }

      resolve(data);
    });
  });
};

export default readContentFromFile;
