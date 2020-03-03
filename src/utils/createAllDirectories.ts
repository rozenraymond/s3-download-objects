import BluebirdPromise from "bluebird";
import * as fs from "fs";

export const createAllDirectories = (
  directories: string[],
  bucketName: string
) => {
  // create all the directories within the s3 bucket
  BluebirdPromise.Promise.each(directories, (directory: string) => {
    const directoryPath = `${process.cwd()}/${bucketName}/${directory}`;
    fs.mkdir(directoryPath, { recursive: true }, err => {
      if (err) throw err;
      console.log("directory created at", directoryPath);
    });
  });
};
