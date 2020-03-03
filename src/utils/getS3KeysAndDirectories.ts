interface s3KeysAndDirectories {
  s3Keys: string[];
  directories: string[];
}

export const getS3KeysAndDirectories = (
  s3ListObjects: AWS.S3.Object[]
): s3KeysAndDirectories => {
  return s3ListObjects.reduce(
    (
      acc: { s3Keys: string[]; directories: string[] },
      currentObject: AWS.S3.Object
    ) => {
      const { s3Keys, directories } = acc;

      const currentObjectKey = currentObject.Key;
      if (currentObjectKey) {
        if (currentObjectKey.endsWith("/")) {
          directories.push(currentObjectKey);
        } else {
          s3Keys.push(currentObjectKey);
        }
      }
      return {
        s3Keys,
        directories
      };
    },
    { s3Keys: [], directories: [] }
  );
};
