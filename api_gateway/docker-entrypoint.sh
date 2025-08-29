#!/bin/sh

# docker-entrypoint.sh
mkdir -p /app/logs
mkdir -p /app/uploads

# Start the service
npm run dev