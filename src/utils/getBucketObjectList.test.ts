import AWS, { S3 } from 'aws-sdk';
import AWSMock from 'aws-sdk-mock';

import { getBucketObjectList } from './getBucketObjectList';

describe('getBucketObjectList', () => {
  beforeEach(() => {
    AWSMock.setSDKInstance(AWS);
  });

  afterEach(() => {
    AWSMock.restore();
  });

  it('should call to list bucket objects', async () => {
    const mockFn = jest.fn();
    AWSMock.mock(
      'S3',
      'listObjectsV2',
      (params: S3.Types.ListObjectsV2Request, callback: Function) => {
        mockFn(params.Bucket);
        callback(null, { Contents: [{ Key: 'frenchies.jpg' }] });
      }
    );

    const list = await getBucketObjectList('puppies-bucket');

    expect(mockFn).toHaveBeenCalled();
    expect(list).toEqual([{ Key: 'frenchies.jpg' }]);
  });
});
