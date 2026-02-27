# Backend Dockerfile for Hotel Management System
FROM node:20-alpine

WORKDIR /app

# Install dependencies for Prisma
RUN apk add --no-cache openssl

# Copy package files
COPY package*.json ./
COPY prisma ./prisma/

# Install dependencies
RUN npm install

# Generate Prisma Client
RUN npx prisma generate

# Copy source code
COPY . .

# Expose port
EXPOSE 5000

# Development command - runs migrations and starts dev server
CMD ["sh", "-c", "npx prisma migrate deploy && npm run dev"]
