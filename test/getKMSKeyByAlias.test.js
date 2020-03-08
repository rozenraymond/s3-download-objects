import AWS from 'aws-sdk';
import AWSMock from 'aws-sdk-mock';

import getKMSKeyByAlias from '../src/utils/getKMSKeyByAlias';

describe('getKMSKeyByAlias', () => {
  beforeEach(() => {
    AWSMock.setSDKInstance(AWS);
  });

  afterEach(() => {
    AWSMock.restore();
  });

  it('should return "undefined" if no alias name given', async () => {
    const alias = await getKMSKeyByAlias('');

    expect(alias).toBeUndefined();
  });

  it('should return KMS key info', async () => {
    const expectedAlias = {
      AliasName: 'alias/frenchies',
      AliasArn: 'arn:aws:kms:frechie-123',
      TargetKeyId: 'abc-123',
    };
    AWSMock.mock('KMS', 'listAliases', (params, callback) => {
      callback(null, { Aliases: [expectedAlias] });
    });

    const alias = await getKMSKeyByAlias('frenchies');
    expect(alias).toEqual(expectedAlias);
  });

  it('should return "undefined" if no alias found', async () => {
    AWSMock.mock('KMS', 'listAliases', (params, callback) => {
      callback(null, { Aliases: [] });
    });

    const alias = await getKMSKeyByAlias('shiba-inu');
    expect(alias).toBeUndefined();
  });
});
