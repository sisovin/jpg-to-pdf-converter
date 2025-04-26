# Use an official Node.js runtime as a parent image
FROM node:14-alpine AS node

# Set the working directory
WORKDIR /app

# Copy package.json to the container
COPY package.json .

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the application
RUN npm run build

# Use an official PostgreSQL runtime as a parent image
FROM postgres:13.3-alpine AS postgres

# Set environment variables for PostgreSQL
ENV POSTGRES_USER=admin
ENV POSTGRES_PASSWORD=admin
ENV POSTGRES_DB=jpg_to_pdf

# Expose the PostgreSQL port
EXPOSE 5432

# Use an official Redis runtime as a parent image
FROM redis:6.2.5-alpine AS redis

# Expose the Redis port
EXPOSE 6379

# Use the Node.js image to run the application
FROM node:14-alpine

# Set the working directory
WORKDIR /app

# Copy the built application from the build stage
COPY --from=node /app .

# Start the application
CMD ["npm", "start"]
