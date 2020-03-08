import { cloneS3Bucket } from '../src/cloneS3Bucket';

describe('clone s3', () => {
  afterEach(() => {
    process.argv = [];
  });

  it('should throw error if argv is missing', async () => {
    await expect(cloneS3Bucket()).rejects.toThrow();
  });
});
