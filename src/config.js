import convict from 'convict';

const config = convict({
  env: {
    format: ['test', 'production'],
    default: 'production',
    env: 'NODE_ENV',
  },
  s3TestEndpoint: {
    format: String,
    default: 'http://172.31.0.2:4572', // Based on Docker IP
    env: 'LOCALSTACK_S3',
  },
  kmsTestEndpoint: {
    format: String,
    default: 'http://172.31.0.2:4599', // Based on Docker IP
    env: 'LOCALSTACK_KMS',
  },
});

export default config;
