import * as AWS from "aws-sdk";

export const getS3ObjectsList = async (
  bucketName: string
): Promise<AWS.S3.Object[]> => {
  try {
    const s3 = new AWS.S3();
    const response = await s3.listObjectsV2({ Bucket: bucketName }).promise();
    const contents: AWS.S3.Object[] = response.Contents || [];

    console.log("response", response);

    if (response.IsTruncated) {
      const result = await getS3ObjectsList(bucketName);
      return [...contents, ...result];
    }
    return contents;
  } catch (e) {
    console.error("Error:", e.message);
    return [];
  }
};
