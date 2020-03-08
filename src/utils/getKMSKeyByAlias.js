import AWS from 'aws-sdk';

const getKMSKeyByAlias = async aliasName => {
  if (!aliasName) return undefined;

  const kms = new AWS.KMS();
  const aliases = await kms.listAliases({}).promise();

  return aliases.Aliases
    ? aliases.Aliases.find(alias => alias.AliasName === `alias/${aliasName}`)
    : undefined;
};

export default getKMSKeyByAlias;
