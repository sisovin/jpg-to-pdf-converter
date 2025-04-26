# Use an official PostgreSQL runtime as a parent image
FROM postgres:13.3-alpine

# Set environment variables for PostgreSQL
ENV POSTGRES_USER=admin
ENV POSTGRES_PASSWORD=admin
ENV POSTGRES_DB=jpg_to_pdf

# Expose the PostgreSQL port
EXPOSE 5432

# Use an official Redis runtime as a parent image
FROM redis:6.2.5-alpine

# Expose the Redis port
EXPOSE 6379

# Use an official Node.js runtime as a parent image
FROM node:14-alpine

# Set the working directory
WORKDIR /app

# Copy package.json to the container
COPY package.json .

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Start the application
CMD ["npm", "start"]
