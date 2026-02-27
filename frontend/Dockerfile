# Frontend Dockerfile for Hotel Management System
FROM node:20-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# Expose Vite dev server port
EXPOSE 5173

# Development command
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]
