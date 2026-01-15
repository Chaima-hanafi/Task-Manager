# Use official Node.js LTS image
FROM node:20-alpine

# Set working directory inside container
WORKDIR /

# Copy package files first (better caching)
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy the rest of the application
COPY . .

# Expose application port (change if needed)
EXPOSE 3000

# Start the application
CMD ["npm", "start"]
