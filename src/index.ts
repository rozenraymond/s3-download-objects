import { getBucketName } from "./utils/getBucketName";
import { getS3ObjectsList } from "./utils/getS3ObjectsList";
import { getS3KeysAndDirectories } from "./utils/getS3KeysAndDirectories";
import { createAllDirectories } from "./utils/createAllDirectories";
import { downloadAllS3Objects } from "./utils/downloadAllS3Objects";
import { saveListToFile } from "./utils/saveListToFile";

// List all objects
// Download objects from a bucket
//   Read bucket name from argument / environment variable?
//   Download all objects with concurrency of 4 (Bluebird)
//     Save to local directory relative to script execution
// Track all list of objects to be dowloaded
//   Using exising KMS with CMK, otherwise, create one
//   Encrypt the list into a file using AWS KMS with CMK (master key)

(async () => {
  // get the list of objects from the s3 bucket
  const bucketName = getBucketName();
  const s3ListObjects = await getS3ObjectsList(bucketName);
  const { s3Keys, directories } = getS3KeysAndDirectories(s3ListObjects);

  // create directories
  createAllDirectories(directories, bucketName);

  // download all s3 objects
  await downloadAllS3Objects(s3Keys, bucketName);

  // create list of downloaded objects
  saveListToFile(s3Keys);
})();
