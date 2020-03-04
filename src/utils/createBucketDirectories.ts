import { Promise as BluebirdPromise } from 'bluebird';
import fs from 'fs';

export const createBucketDirectories = (
  directories: string[],
  bucketName: string
): Promise<string[]> => {
  return BluebirdPromise.each(directories, (directory: string) => {
    const directoryPath = `${process.cwd()}/${bucketName}/${directory}`;
    fs.mkdir(directoryPath, { recursive: true }, err => {
      if (err) throw err;
      console.log('Directory created. Directory name:', directoryPath);
    });
  });
};
