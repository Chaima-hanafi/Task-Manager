# Use official Node.js LTS image
FROM node:20-alpine

# Set working directory
WORKDIR /

# Copy dependency files first (for caching)
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy application source
COPY . .

# Expose app port (change if needed)
EXPOSE 3000

# Start the application
CMD ["node", "index.js"]
