import AWS from 'aws-sdk';

export const getBucketObjectList = async (
  bucketName: string,
  contents: AWS.S3.Object[] = [],
  offsetKey?: string | undefined
): Promise<AWS.S3.Object[]> => {
  const s3 = new AWS.S3();
  const response = await s3
    .listObjectsV2({ Bucket: bucketName, StartAfter: offsetKey || '' })
    .promise();

  let contentList: AWS.S3.Object[] = contents;

  if (response.Contents && Array.isArray(response.Contents)) {
    contentList = [...contents, ...response.Contents];
  }

  if (response.IsTruncated) {
    const lastContentInList = contentList[contentList.length - 1];
    const contentOffsetKey = lastContentInList.Key;
    return await getBucketObjectList(bucketName, contentList, contentOffsetKey);
  }
  return contentList;
};
