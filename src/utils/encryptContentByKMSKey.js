import AWS from 'aws-sdk';

import config from '../config';

const encryptContentByKMSKey = async (content, kmsKeyId) => {
  const kms = new AWS.KMS({
    endpoint:
      config.get('env') === 'test' ? config.get('kmsTestEndpoint') : undefined,
  });

  const { KeyId, CiphertextBlob } = await kms
    .encrypt({ KeyId: kmsKeyId, Plaintext: Buffer.from(content) })
    .promise();

  return { KeyId, CiphertextBlob };
};

export default encryptContentByKMSKey;
