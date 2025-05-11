#!/bin/sh

echo "🔄 Generating Prisma client..."
npx prisma generate

echo "🚀 Starting the app..."
npm run dev
