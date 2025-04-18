# # initial layer
# FROM node:20-alpine

# # install nodemon globally
# RUN npm install -g nodemon

# # Initial the working directory
# WORKDIR /app

# # First copy package.json file so that after every run not npm install going to run 
# COPY  ./package.json ./

# RUN npm install

# # first dot for root folder and second dot is to which folder do i need to copy 
# # This will only copy the full project, but not install the package every time
# COPY ./ ./

# # Using prisma ORM so need to update database
# # RUN npx prisma generate --schema=./prisma/schema/schema.prisma
# # Install prisma
# # RUN npm install prisma --save-dev

# # Make sure files are copied correctly
# # COPY ./prisma ./prisma

# # Generate Prisma Client
# RUN npx prisma generate --schema=prisma/schema/schema.prisma

# # on which port application will be run
# EXPOSE 8000

# # run the command after the run time
# # this command will run the server main file

# CMD ["npm", "run", "dev"]

# # now time to run this image
# # - docker build -t my-app .
# # `-t my-app` will give a name to this image and `.` will tell the relative path the the source code located 

# Stage 1: Build
FROM node:22-alpine AS builder
RUN npm install -g nodemon
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY ./ ./

# Stage 2: RUN
FROM node:22-alpine
WORKDIR /app
COPY --from=builder /app ./
EXPOSE 8081
CMD ["npm","run","dev"]
