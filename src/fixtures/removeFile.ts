import { exists, unlink } from 'fs';

export const removeFile = (filename: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    exists(filename, res => {
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
