#!/bin/sh
# docker-entrypoint.sh

# Create required folders
mkdir -p /app/logs
mkdir -p /app/uploads

# Start the service
npm run dev