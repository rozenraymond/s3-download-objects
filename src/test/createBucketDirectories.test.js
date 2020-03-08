import fs from 'fs';
import createBucketDirectories from '../utils/createBucketDirectories';

jest.mock('fs', () => {
  return {
    mkdir: jest.fn(),
  };
});

describe('createBucketDirectories', () => {
  it('should call "fs.mkdir" when creating directories from list', async () => {
    const bucketName = 'test-bucket';
    const folders = ['puppies', 'puppies/breed'];

    await createBucketDirectories(folders, bucketName);

    expect(fs.mkdir).toHaveBeenCalledTimes(2);
  });
});
