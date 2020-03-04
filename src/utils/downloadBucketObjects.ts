import { Promise as BluebirdPromise } from 'bluebird';
import AWS from 'aws-sdk';

import { writeContentToFile } from './writeContentToFile';

export const downloadBucketObjects = async (
  s3ObjectKeys: string[],
  bucketName: string
): Promise<void> => {
  await BluebirdPromise.map(
    s3ObjectKeys,
    async (key: string) => {
      const s3 = new AWS.S3();
      const result = await s3
        .getObject({
          Bucket: bucketName,
          Key: key,
        })
        .promise();
      const filePath = `${process.cwd()}/${bucketName}/${key}`;

      return writeContentToFile(filePath, result.Body);
    },
    { concurrency: 4 }
  );
};
