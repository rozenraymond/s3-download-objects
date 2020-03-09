import AWS from 'aws-sdk';

import config from '../config';

const getBucketObjectList = async (bucketName, contents = [], offsetKey) => {
  const s3 = new AWS.S3({
    endpoint:
      config.get('env') === 'test' ? config.get('s3TestEndpoint') : undefined,
  });
  const response = await s3
    .listObjectsV2({ Bucket: bucketName, StartAfter: offsetKey || '' })
    .promise();

  let contentList = contents;

  if (response.Contents && Array.isArray(response.Contents)) {
    contentList = [...contents, ...response.Contents];
  }

  if (response.IsTruncated) {
    const lastContentInList = contentList[contentList.length - 1];
    const contentOffsetKey = lastContentInList.Key;
    return getBucketObjectList(bucketName, contentList, contentOffsetKey);
  }
  return contentList;
};

export default getBucketObjectList;
