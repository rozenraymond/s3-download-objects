import cloneS3Bucket from '../../src/cloneS3Bucket';

describe('Clone S3 bucket', () => {
  afterEach(() => {
    process.argv = [];
  });

  it('should throw error if argv is missing', async () => {
    await expect(cloneS3Bucket()).rejects.toThrow();
  });
});
