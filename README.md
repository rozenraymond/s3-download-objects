# s3-download-objects

This is a Node.js script to download all objects from a S3 bucket locally with the same directory structure.

Prerequisite before running script to clone your s3 bucket:

- Node
  - version 12 or higher
- AWS
  - AWS account is setup
  - AWS credentials are configured locally. [More information](https://docs.aws.amazon.com/sdk-for-java/v1/developer-guide/setup-credentials.html)
  - Existing S3 bucket to be cloned
  - Existing KMS Key Alias Name that can be used to encrypt download.txt

## ⬇️ Installation

You can either use the `npm` or `yarn` to installl depedencies.

```sh
yarn install
```

## 📦 Build

Run

```sh
yarn build
```

## 🏁 Start Cloning

Clone your bucket with the compiled code from build.

Run

```sh
yarn run clone <bucket-name> <kms-alias-key-name>
```

## 🧪 Test

Run unit test

```sh
yarn test:unit
```

To generate unit test coverage report.
Run

```sh
yarn test:unit:coverage
```

## ✨Lint

```sh
yarn run check:lint
```

## Future Improvement

- Integration Tests
- Logs
