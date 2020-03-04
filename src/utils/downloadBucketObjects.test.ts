import AWS, { S3 } from 'aws-sdk';
import AWSMock from 'aws-sdk-mock';

import * as File from './writeContentToFile';

jest.mock('./writeContentToFile', () => {
  return {
    writeContentToFile: jest.fn().mockImplementation(() => Promise.resolve()),
  };
});

import { downloadBucketObjects } from './downloadBucketObjects';

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
    AWSMock.mock(
      'S3',
      'getObject',
      (params: S3.Types.GetObjectRequest, callback: Function) => {
        mockFn(params.Key);
        callback(null, { Body: params.Key });
      }
    );

    await downloadBucketObjects(files, 'test-bucket');

    expect(mockFn).toHaveBeenCalledTimes(files.length);
    expect(mockFn.mock.calls).toEqual([[files[0]], [files[1]], [files[2]]]);
    expect(File.writeContentToFile).toHaveBeenCalledTimes(files.length);
  });
});
