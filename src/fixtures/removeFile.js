import { access, unlink } from 'fs';

const removeFile = filename => {
  return new Promise((resolve, reject) => {
    access(filename, res => {
      if (res) {
        unlink(filename, err => {
          if (err) {
            console.log(`Error deleting file. File: ${err.message}`);
            reject();
          }

          console.log(`File deleted. File: ${filename}`);
          resolve();
        });
      } else {
        console.log(`No file found. File: ${filename}`);
        resolve();
      }
    });
  });
};

export default removeFile;
