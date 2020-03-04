interface BucketObjectKeyType {
  files: string[];
  directories: string[];
}

export const groupByKeyType = (
  bucketObjects: AWS.S3.Object[]
): BucketObjectKeyType => {
  return bucketObjects.reduce(
    (accumulator: BucketObjectKeyType, currentObject: AWS.S3.Object) => {
      const { files, directories } = accumulator;

      const currentObjectKey = currentObject.Key;
      if (currentObjectKey) {
        if (currentObjectKey.endsWith('/')) {
          directories.push(currentObjectKey);
        } else {
          files.push(currentObjectKey);
        }
      }
      return {
        files,
        directories,
      };
    },
    { files: [], directories: [] }
  );
};
