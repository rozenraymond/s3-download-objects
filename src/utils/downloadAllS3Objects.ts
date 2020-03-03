import BluebirdPromise from "bluebird";
import * as AWS from "aws-sdk";
import fs from "fs";

export const downloadAllS3Objects = async (
  s3Keys: string[],
  bucketName: string
): Promise<void> => {
  await BluebirdPromise.Promise.map(s3Keys, async (key: string) => {
    const s3 = new AWS.S3();
    const result = await s3
      .getObject({
        Bucket: bucketName,
        Key: key
      })
      .promise();
    const filePath = `${process.cwd()}/${bucketName}/${key}`;
    fs.writeFile(filePath, result.Body, err => {
      if (err) {
        throw err;
      }
      console.log("File saved. File:", key);
    });
  });
  console.log("S3 download complete");
};
