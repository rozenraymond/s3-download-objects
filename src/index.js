import cloneBucket from './cloneBucket';

(async () => {
  const args = process.argv.slice(2, 4);

  if (args.length) {
    const bucketName = args[0];
    const aliasKMSKeyName = args[1];

    if (!aliasKMSKeyName) {
      throw new Error('KMS key alias name not found');
    }

    try {
      await cloneBucket(bucketName, aliasKMSKeyName);
    } catch (e) {
      console.error(`Fail to clone S3 bucket. Bucket=[${bucketName}]`);
      throw e;
    }
  } else {
    throw new Error('No bucket name specified');
  }
})();
