export const getBucketName = () => {
  const bucketName = process.argv[2];
  if (!bucketName) {
    throw new Error("Bucket name is not found");
  }
  return bucketName;
};
