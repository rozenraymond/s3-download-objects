const groupByKeyType = bucketObjects => {
  return bucketObjects.reduce(
    (accumulator, currentObject) => {
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

export default groupByKeyType;
