import AWS, { KMS } from 'aws-sdk';

export const getKMSKeyByAlias = async (
  aliasName: string
): Promise<KMS.Types.AliasListEntry | undefined> => {
  if (!aliasName) return undefined;

  const kms = new AWS.KMS();
  const aliases = await kms.listAliases({}).promise();

  return aliases.Aliases
    ? aliases.Aliases.find(alias => alias.AliasName === `alias/${aliasName}`)
    : undefined;
};
