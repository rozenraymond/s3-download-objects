import { KMS } from 'aws-sdk';

import { getBucketObjectList } from './utils/getBucketObjectList';
import { groupByKeyType } from './utils/groupByKeyType';
import { createBucketDirectories } from './utils/createBucketDirectories';
import { downloadBucketObjects } from './utils/downloadBucketObjects';
import { saveEncryptedListToFile } from './utils/saveEncryptedListToFile';
import { getKMSKeyByAlias } from './utils/getKMSKeyByAlias';
import { encryptContentByKMSKey } from './utils/encryptContentByKMSKey';

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
  const args = process.argv.slice(2, 4);

  if (args.length) {
    const bucketName = args[0];
    const aliasKeyName = args[1];

    if (!aliasKeyName) {
      console.log('No KMS alias key found');
      process.exit(1);
    }

    const aliasKeyInfo = await getKMSKeyByAlias(aliasKeyName);

    if (!aliasKeyInfo || !aliasKeyInfo.TargetKeyId) {
      console.log(`No KMS alias key found. Alias=[alias/${aliasKeyName}]`);
      process.exit(1);
    }

    try {
      const s3ListObjects = await getBucketObjectList(bucketName);
      const { files, directories } = groupByKeyType(s3ListObjects);

      // Create bucket directories
      await createBucketDirectories(directories, bucketName);

      // Download bucket objects
      await downloadBucketObjects(files, bucketName);

      // Encrypt downloaded list
      const encryptedList = await encryptContentByKMSKey(
        files.join('\n'),
        aliasKeyInfo.TargetKeyId as string
      );

      // Create file containing encrypted downloaded item name
      await saveEncryptedListToFile(
        encryptedList.CiphertextBlob as Pick<
          KMS.Types.EncryptResponse,
          'CiphertextBlob'
        >
      );
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
