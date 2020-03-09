import convict from 'convict';

const config = convict({
  env: {
    format: ['test', 'production'],
    default: 'production',
    env: 'NODE_ENV',
  },
  s3TestEndpoint: {
    format: String,
    default: 'http://localhost:4572',
    env: 'LOCALSTACK_S3',
  },
  kmsTestEndpoint: {
    format: String,
    default: 'http://localhost:4599',
    env: 'LOCALSTACK_KMS',
  },
});

export default config;
