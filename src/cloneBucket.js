import getBucketObjectList from './utils/getBucketObjectList';
import groupByKeyType from './utils/groupByKeyType';
import createBucketDirectories from './utils/createBucketDirectories';
import downloadBucketObjects from './utils/downloadBucketObjects';
import saveEncryptedListToFile from './utils/saveEncryptedListToFile';
import getKMSKeyByAlias from './utils/getKMSKeyByAlias';
import encryptContentByKMSKey from './utils/encryptContentByKMSKey';

const cloneBucket = async (bucketName, aliasKMSKeyName) => {
  if (!aliasKMSKeyName) {
    throw new Error('KMS alias key not found');
  }

  try {
    const aliasKeyInfo = await getKMSKeyByAlias(aliasKMSKeyName);

    if (!aliasKeyInfo || !aliasKeyInfo.TargetKeyId) {
      throw new Error(
        `No KMS alias key found. Alias=[alias/${aliasKMSKeyName}]`
      );
    }

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
  } catch (e) {
    console.error(`Fail to clone S3 bucket. Bucket=[${bucketName}]`);
    throw e;
  }
};

export default cloneBucket;
