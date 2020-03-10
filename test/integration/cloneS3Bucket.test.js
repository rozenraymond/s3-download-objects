import fs from 'fs';

import cloneS3Bucket from '../../src/cloneS3Bucket';

const testFileName = process.env.LOCAL_FILE || 'test-file.txt';
const testBucket = process.env.TEST_BUCKET_NAME || 'test-bucket';
const testKeyAliasName = process.env.TEST_KMS_ALIAS_NAME || 'alias/s3-test-key';
const filePath = `./${testBucket}/${testFileName}`;

process.argv = [
  'some command directory call',
  'some command file name',
  testBucket,
  testKeyAliasName,
];

describe('Clone S3 bucket', () => {
  it('should clone bucket', async done => {
    await cloneS3Bucket();

    // Refer to test setup for expected content on the test bucket
    expect.assertions(1);

    try {
      await expect(fs.promises.access(filePath)).resolves.toBeUndefined();
      done();
    } catch (e) {
      console.error('Test file does not exist');
      throw e;
    }
  });
});
