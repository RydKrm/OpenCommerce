# #state 1: Build
# FROM node:22-alpine AS builder
# RUN npm install -g nodemon
# WORKDIR /app
# COPY package*.json ./
# RUN npm install
# COPY ./ ./

# #state 2:Run
# FROM node:22-alpine
# WORKDIR /app
# COPY --from=builder /app ./
# EXPOSE 3004
# CMD ["npm", "run", "dev"] 

# Stage 1: Build
FROM node:22-alpine AS builder
RUN npm install -g nodemon
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY ./ ./

# Stage 2: Run
FROM node:22-alpine
WORKDIR /app
COPY --from=builder /app ./

# Copy entrypoint script
COPY docker-entrypoint.sh /app/docker-entrypoint.sh
RUN chmod +x /app/docker-entrypoint.sh

EXPOSE 3004

# Use entrypoint to create folders before running dev
ENTRYPOINT ["/app/docker-entrypoint.sh"]
