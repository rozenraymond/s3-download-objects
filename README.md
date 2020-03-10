# s3-download-objects

This is a Node.js script to download all objects from a S3 bucket locally with the same directory structure as in S3.

Prerequisite before running script to clone your s3 bucket:

- Node
  - Version 12 or higher
- AWS
  - AWS account is setup
  - AWS credentials are configured locally. ([More information](https://docs.aws.amazon.com/sdk-for-java/v1/developer-guide/setup-credentials.html))
  - Existing S3 bucket to be cloned
  - Existing KMS Key Alias Name that can be used to encrypt text file containing list of S3 objects that have been downloaded

## ⬇️ Installation

You can either use the `npm` or `yarn` to install depedencies.

```sh
yarn install
```

## 📦 Build

Run

```sh
yarn build
```

## 🏁 Start Cloning

Clone your bucket with the compiled code from build. The cloned bucket can be found on the same level as this directory with the name of the cloned bucket name.

🚨Please ensure that build script has been run before running the following command.

Run

```sh
yarn run clone <bucket-name> <kms-alias-key-name>
```

## 🧪 Test

### ⚙️ Unit Test

Running the unit test command will generate [files](./test/unit/output/coverage/jest/lcov-report/index.html) containing the coverage of the unit test.

```sh
yarn test:unit
```

### 🗳 Integration Test

Pre-requisite:

- [Docker](https://docs.docker.com/install/)
- [jq](https://stedolan.github.io/jq/download/) is installed in your local machine

To run the integration tests on your local development machine, run:

Run:

```sh
yarn test:integration
```

## ✨Lint

```sh
yarn run check:lint
```

## 🙏 Future Improvement

- Logs
- Deployment
