import { Promise as BluebirdPromise } from 'bluebird';
import fs from 'fs';

const createBucketDirectories = (directories, bucketName) => {
  return BluebirdPromise.each(directories, directory => {
    const directoryPath = `${process.cwd()}/${bucketName}/${directory}`;
    fs.mkdir(directoryPath, { recursive: true }, err => {
      if (err) throw err;
      console.log('Directory created. Directory name:', directoryPath);
    });
  });
};

export default createBucketDirectories;
