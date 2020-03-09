import { readFile, existsSync, unlink } from 'fs';

import saveEncryptedListToFile from '../../src/utils/saveEncryptedListToFile';

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

const removeFile = filename => {
  return new Promise((resolve, reject) => {
    if (existsSync(filename)) {
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
};

const pathToFile = `${process.cwd()}/downloaded.txt`;

describe('Downloaded list', () => {
  afterEach(async () => {
    await removeFile(pathToFile);
  });

  it('should create a file with downloaded list', async () => {
    const filenames = [
      'puppies.jpg',
      'breed/shiba-inu.jpg',
      'breed/frenchies.png',
    ];

    const buffer = Buffer.from(filenames.join('\n'));

    await saveEncryptedListToFile(buffer);

    const content = await readContentFromFile(pathToFile);

    expect(content).toEqual(buffer.toString());
  });
});
