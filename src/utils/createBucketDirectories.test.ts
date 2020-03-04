import * as fs from 'fs';

jest.mock('fs', () => {
  return {
    mkdir: jest.fn(),
  };
});

import { createBucketDirectories } from './createBucketDirectories';

describe('createBucketDirectories', () => {
  it('should call "fs.mkdir" when creating directories from list', async () => {
    const bucketName = 'test-bucket';
    const folders = ['puppies', 'puppies/breed'];

    await createBucketDirectories(folders, bucketName);

    expect(fs.mkdir).toHaveBeenCalledTimes(2);
  });
});
