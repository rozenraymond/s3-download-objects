import fs from 'fs';

const writeContentToFile = (filePath, content) =>
  new Promise((resolve, reject) => {
    fs.writeFile(filePath, content, err => {
      if (err) {
        reject(err);
      }
      console.log('📃 File downloaded. File path:', filePath);
      resolve();
    });
  });

export default writeContentToFile;
