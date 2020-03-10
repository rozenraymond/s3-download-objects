#!/usr/bin/env bash

export TEST_BUCKET_NAME=test-bucket
export LOCAL_FILE=test-file.txt
export LOCALSTACK_S3=http://localhost:4572
export LOCALSTACK_KMS=http://localhost:4599
export TEST_KMS_ALIAS_NAME=alias/s3-test-key
export AWS_REGION=ap-southeast-2