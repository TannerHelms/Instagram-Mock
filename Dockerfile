# Use an official Node runtime as a parent image
FROM node:16

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies including TypeScript and any types you need
RUN npm install

# Install TypeScript globally in the container
RUN npm install -g typescript

# Copy your source code into the container
COPY . .

# Compile TypeScript to JavaScript
RUN tsc

# Your app binds to port 3000, so use the EXPOSE instruction to have it mapped by Docker
EXPOSE 3000

# Define the command to run your app
CMD [ "node", "dist/index.js" ]
