# Stage 1: Build
FROM node:22-alpine AS builder
RUN npm install -g nodemon
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY ./ ./
RUN npx prisma generate

# Stage 2: RUN
FROM node:22-alpine
WORKDIR /app
COPY --from=builder /app ./
EXPOSE 3002
CMD ["npm","run","dev"]
