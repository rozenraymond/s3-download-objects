#!/usr/bin/env bash

LOCAL_FILE=test-file.txt

# Set environment variable
source ./scripts/env/test.sh

set -eou pipefail

# Stop all services
docker-compose down

# Grace period
sleep 3

if [[ -e "./$LOCAL_FILE" ]]; then
  rm -rf "./$LOCAL_FILE"
  echo "✅ Test file deleted"
fi

echo 'Test cleanup complete! 🆗'
