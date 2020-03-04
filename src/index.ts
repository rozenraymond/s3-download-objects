import { getBucketObjectList } from './utils/getBucketObjectList';
import { groupByKeyType } from './utils/groupByKeyType';
import { createBucketDirectories } from './utils/createBucketDirectories';
import { downloadBucketObjects } from './utils/downloadBucketObjects';
import { saveDownloadedListToFile } from './utils/saveDownloadedListToFile';

// List all objects
// Download objects from a bucket
//   Read bucket name from argument / environment variable?
//   Download all objects with concurrency of 4 (Bluebird)
//     Save to local directory relative to script execution
// Track all list of objects to be dowloaded
//   Using exising KMS with CMK, otherwise, create one
//   Encrypt the list into a file using AWS KMS with CMK (master key)

(async (): Promise<void> => {
  // get the list of objects from the s3 bucket
  const args = process.argv.slice(2, 3);

  if (args.length) {
    const bucketName = args[0];

    try {
      const s3ListObjects = await getBucketObjectList(bucketName);
      const { files, directories } = groupByKeyType(s3ListObjects);

      // Create bucket directories
      createBucketDirectories(directories, bucketName);

      // Download bucket objects
      await downloadBucketObjects(files, bucketName);

      // Create file containing downloaded item name
      await saveDownloadedListToFile(files);
    } catch (e) {
      console.log(
        `Fail to download items from S3 bucket (${bucketName}). Error message: ${e.message}`
      );
      process.exit(1);
    }
  } else {
    console.log('No bucket name specified');
    process.exit(1);
  }
})();
