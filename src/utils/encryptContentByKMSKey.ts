import AWS, { KMS } from 'aws-sdk';

export type EncryptContentByKMSKeyValue = Pick<
  KMS.Types.EncryptResponse,
  'KeyId' | 'CiphertextBlob'
>;

export const encryptContentByKMSKey = async <T>(
  content: T,
  kmsKeyId: string
): Promise<EncryptContentByKMSKeyValue> => {
  const kms = new AWS.KMS();

  const { KeyId, CiphertextBlob } = await kms
    .encrypt({ KeyId: kmsKeyId, Plaintext: Buffer.from(content) })
    .promise();

  return { KeyId, CiphertextBlob };
};
