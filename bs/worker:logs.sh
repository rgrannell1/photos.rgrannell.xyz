#!/bin/bash

# View Cloudflare Worker logs
# Usage: ./bs/worker:logs.sh [env]
# Where env can be 'production' or 'staging' (defaults to production)

ENV=${1:-production}

echo "Viewing logs for environment: $ENV"
echo "Press Ctrl+C to stop"

npx wrangler tail --env $ENV