import getBucketObjectList from './utils/getBucketObjectList';
import groupByKeyType from './utils/groupByKeyType';
import createBucketDirectories from './utils/createBucketDirectories';
import downloadBucketObjects from './utils/downloadBucketObjects';
import saveEncryptedListToFile from './utils/saveEncryptedListToFile';
import getKMSKeyByAlias from './utils/getKMSKeyByAlias';
import encryptContentByKMSKey from './utils/encryptContentByKMSKey';

const cloneS3Bucket = async () => {
  const args = process.argv.slice(2, 4);

  if (!args.length) {
    throw new Error(
      'No bucket name specified. Please enter the bucket name as first argument. Eg: yarn run clone <bucket-name> <kms-key-alias-name>'
    );
  }

  const bucketName = args[0];
  const aliasKMSKeyName = args[1];

  if (!aliasKMSKeyName) {
    throw new Error(
      'KMS key alias name not found. Please enter the KMS key alias name as second argument. Eg: yarn run clone <bucket-name> <kms-key-alias-name>'
    );
  }

  try {
    const aliasKeyInfo = await getKMSKeyByAlias(aliasKMSKeyName);

    const s3ListObjects = await getBucketObjectList(bucketName);
    const { files, directories } = groupByKeyType(s3ListObjects);

    // Create bucket directories
    await createBucketDirectories(directories, bucketName);

    // Download bucket objects
    await downloadBucketObjects(files, bucketName);

    // Encrypt downloaded list
    const encryptedList = await encryptContentByKMSKey(
      files.join('\n'),
      aliasKeyInfo.TargetKeyId
    );

    // Create file containing encrypted downloaded item name
    await saveEncryptedListToFile(encryptedList.CiphertextBlob);
    console.log(
      `✅ Download completed. Cloned s3 bucket is at ${process.cwd()}/${bucketName}`
    );
  } catch (e) {
    console.error(
      `Fail to clone S3 bucket with bucket name of ${bucketName} and KMS key alias name of ${aliasKMSKeyName}`
    );
    throw e;
  }
};

export default cloneS3Bucket;
