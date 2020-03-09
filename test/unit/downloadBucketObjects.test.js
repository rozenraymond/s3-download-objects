import AWS from 'aws-sdk';
import AWSMock from 'aws-sdk-mock';

import downloadBucketObjects from '../../src/utils/downloadBucketObjects';
import writeContentToFile from '../../src/utils/writeContentToFile';

jest.mock('../../src/utils/writeContentToFile', () =>
  jest.fn().mockImplementation(() => Promise.resolve())
);

describe('downloadBucketObjects', () => {
  beforeEach(() => {
    AWSMock.setSDKInstance(AWS);
  });

  afterEach(() => {
    AWSMock.restore('S3');
  });

  it('should call S3 "getObject" method and "writeContentToFile"', async () => {
    const files = [
      'the-puppies.png',
      'puppies/frenchies.jpg',
      'puppies/shiba-inu.jpg',
    ];

    const mockFn = jest.fn();
    AWSMock.mock('S3', 'getObject', (params, callback) => {
      mockFn(params.Key);
      callback(null, { Body: params.Key });
    });

    await downloadBucketObjects(files, 'test-bucket');

    expect(mockFn).toHaveBeenCalledTimes(files.length);
    expect(mockFn.mock.calls).toEqual([[files[0]], [files[1]], [files[2]]]);
    expect(writeContentToFile).toHaveBeenCalledTimes(files.length);
  });
});
