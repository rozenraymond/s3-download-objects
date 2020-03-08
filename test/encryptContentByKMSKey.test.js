import AWS from 'aws-sdk';
import AWSMock from 'aws-sdk-mock';
import encryptContentByKMSKey from '../src/utils/encryptContentByKMSKey';

describe('encryptContentByKMSKey', () => {
  beforeEach(() => {
    AWSMock.setSDKInstance(AWS);
  });

  afterEach(() => {
    AWSMock.restore();
  });

  it('should call method to encrypt', async () => {
    const mockContent = 'imaginary special and secret puppy';
    const mockKey = 'abc123-key';
    const mockFn = jest.fn().mockImplementation((params, callback) => {
      callback(null, {
        KeyId: mockKey,
        CiphertextBlob: Buffer.from(mockContent),
      });
    });
    AWSMock.mock('KMS', 'encrypt', mockFn);

    const result = await encryptContentByKMSKey(mockContent, mockKey);
    expect(mockFn).toHaveBeenCalled();
    expect(result).toEqual({
      KeyId: mockKey,
      CiphertextBlob: Buffer.from(mockContent),
    });
  });
});
