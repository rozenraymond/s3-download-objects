#!/usr/bin/env bash

set -eou pipefail

# Set environment variable
TEST_BUCKET_NAME=test-bucket
LOCAL_FILE=test-file.txt
LOCALSTACK_S3=http://localhost:4572
LOCALSTACK_KMS=http://localhost:4599
TEST_KMS_ALIAS_NAME=alias/s3-test-key

# Set to run as test environment
NODE_ENV=test

# Export out concerned value
export NODE_ENV
export LOCAL_FILE
export TEST_BUCKET_NAME
export LOCALSTACK_S3
export LOCALSTACK_KMS
export TEST_KMS_ALIAS_NAME

# Start up the service
docker-compose up -d

# Let the service ease itself to start
sleep 10

# Create test file
echo 'Test file. Ignore this.' > test-file.txt

# Create bucket in localstack
aws --endpoint-url $LOCALSTACK_S3 s3 mb s3://$TEST_BUCKET_NAME >/dev/null

# Upload file to newly created bucket
aws --endpoint-url $LOCALSTACK_S3 s3 cp $LOCAL_FILE s3://$TEST_BUCKET_NAME --only-show-errors

# Generate KMS key
KMS_KEY_ID=$(aws --endpoint-url $LOCALSTACK_KMS kms create-key | jq -r .KeyMetadata.KeyId)
echo "KMS KEY ID: $KMS_KEY_ID"

# Assign alias to KMS Key
aws --endpoint-url $LOCALSTACK_KMS kms create-alias --alias-name $TEST_KMS_ALIAS_NAME --target-key-id $KMS_KEY_ID >/dev/null

echo "Test setup complete! 🆗"
