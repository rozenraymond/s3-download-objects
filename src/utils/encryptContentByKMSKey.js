import AWS from 'aws-sdk';

const encryptContentByKMSKey = async (content, kmsKeyId) => {
  const kms = new AWS.KMS();

  const { KeyId, CiphertextBlob } = await kms
    .encrypt({ KeyId: kmsKeyId, Plaintext: Buffer.from(content) })
    .promise();

  return { KeyId, CiphertextBlob };
};

export default encryptContentByKMSKey;
