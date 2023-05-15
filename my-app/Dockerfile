# Base image
FROM node:16.16.0-alpine

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the entire project to the container
COPY . .

# Build the production-ready static files
RUN npm run build

# Expose the desired port (e.g., 80)
EXPOSE 80

# Start the web server
CMD ["npm", "start"]