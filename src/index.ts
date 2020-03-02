import * as AWS from "aws-sdk";
import * as fs from "fs";
import * as BluebirdPromise from "bluebird";

// List all objects
// Download objects from a bucket
//   Read bucket name from argument / environment variable?
//   Download all objects with concurrency of 4 (Bluebird)
//     Save to local directory relative to script execution
// Track all list of objects to be dowloaded
//   Using exising KMS with CMK, otherwise, create one
//   Encrypt the list into a file using AWS KMS with CMK (master key)

const s3 = new AWS.S3();
const bucketName = "test-bucket-s3";
const params = {
  Bucket: bucketName
};

const createDownloadedS3ObjectList = (list: string[]) => {
  const content = list.join("\n");
  fs.writeFile("./downloaded.txt", content, err => {
    if (err) throw err;
    console.log("Downloaded list of S3 object created,");
  });
};

const createDirectory = (dirPath: string) => {
  const directoryPath = `${process.cwd()}/${bucketName}/${dirPath}`;
  fs.mkdir(directoryPath, { recursive: true }, err => {
    if (err) throw err;
    console.log("directory created at", directoryPath);
  });
};

const createAllDirectories = (directories: string[]) => {
  // create all the directories within the s3 bucket
  directories.forEach(createDirectory);
};

const download = async (s3Keys: string[]): Promise<void> => {
  await BluebirdPromise.Promise.map(s3Keys, async (key: string) => {
    const result = await s3.getObject({ ...params, Key: key }).promise();
    const filePath = `${process.cwd()}/${bucketName}/${key}`;
    fs.writeFile(filePath, result.Body, err => {
      if (err) {
        throw err;
      }
      console.log("File saved. File:", key);
    });
  });
  console.log("S3 download complete");
};

const getS3ObjectsList = async (): Promise<AWS.S3.Object[]> => {
  try {
    const response = await s3.listObjectsV2(params).promise();
    const contents: AWS.S3.Object[] = response.Contents || [];

    console.log("response", response);

    if (response.IsTruncated) {
      const result = await getS3ObjectsList();
      return [...contents, ...result];
    }
    return contents;
  } catch (e) {
    console.error("Error:", e.message);
    return [];
  }
};

interface s3KeysAndDirectories {
  s3Keys: string[];
  directories: string[];
}

const getS3KeysAndDirectories = (
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

(async () => {
  // get the list of objects from the s3 bucket
  const s3ListObjects = await getS3ObjectsList();
  const { s3Keys, directories } = getS3KeysAndDirectories(s3ListObjects);
  // create directories
  createAllDirectories(directories);

  // download all s3 objects
  await download(s3Keys);

  createDownloadedS3ObjectList(s3Keys);
})();
