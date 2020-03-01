import * as AWS from "aws-sdk";
import * as fs from "fs";

// List all objects
// Download objects from a bucket
//   Read bucket name from argument / environment variable?
//   Download all objects with concurrency of 4 (Bluebird)
//     Save to local directory relative to script execution
// Track all list of objects to be dowloaded
//   Using exising KMS with CMK, otherwise, create one
//   Encrypt the list into a file using AWS KMS with CMK (master key)

const s3 = new AWS.S3();
const params = {
 Bucket: "test-bucket-s3"
};

const download = async (s3Objects: AWS.S3.Object[]): Promise<void> => {
 const [item, ...items] = s3Objects;

 if (item.Key) {
  const result = await s3.getObject({ ...params, Key: item.Key }).promise();

  fs.writeFile(item.Key, result.Body, err => {
   if (err) {
    throw err;
   }
   console.log("File saved. File:", item.Key);
  });
 }

 console.log("S3 download complete");
};

const listAllObjects = async (): Promise<AWS.S3.Object[]> => {
 try {
  const response = await s3.listObjectsV2(params).promise();

  const contents: AWS.S3.Object[] = response.Contents || [];

  if (response.IsTruncated) {
   const result = await listAllObjects();
   return [...contents, ...result];
  }

  return contents;
 } catch (e) {
  console.error("Error:", e.message);
  return [];
 }
};

// Run download
(async () => {
 await download(await listAllObjects());
})();
