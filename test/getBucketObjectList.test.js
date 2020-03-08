import AWS from 'aws-sdk';
import AWSMock from 'aws-sdk-mock';

import getBucketObjectList from '../src/utils/getBucketObjectList';

describe('getBucketObjectList', () => {
  beforeEach(() => {
    AWSMock.setSDKInstance(AWS);
  });

  afterEach(() => {
    AWSMock.restore();
  });

  it('should call to list bucket objects', async () => {
    const mockFn = jest.fn();
    AWSMock.mock('S3', 'listObjectsV2', (params, callback) => {
      mockFn(params.Bucket);
      callback(null, { Contents: [{ Key: 'frenchies.jpg' }] });
    });

    const list = await getBucketObjectList('puppies-bucket');

    expect(mockFn).toHaveBeenCalled();
    expect(list).toEqual([{ Key: 'frenchies.jpg' }]);
  });

  it('should call to list bucket objects recursively when truncated', async () => {
    const mockFn = jest
      .fn()
      .mockImplementationOnce((params, callback) => {
        callback(null, {
          IsTruncated: true,
          Contents: [{ Key: 'frenchies.jpg' }],
        });
      })
      .mockImplementationOnce((params, callback) => {
        callback(null, {
          IsTruncated: false,
          Contents: [{ Key: 'shiba-inu.jpg' }],
        });
      });

    AWSMock.mock('S3', 'listObjectsV2', mockFn);

    const list = await getBucketObjectList('puppies-bucket');

    expect(mockFn).toHaveBeenCalled();
    expect(list).toEqual([{ Key: 'frenchies.jpg' }, { Key: 'shiba-inu.jpg' }]);
  });
});
