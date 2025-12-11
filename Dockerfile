# Use official Node.js image with ARM64 and AMD64 support
FROM node:22-alpine AS build

# Install pnpm globally
RUN npm install -g pnpm

WORKDIR /app

# Copy package files and install dependencies
COPY package.json pnpm-lock.yaml* ./

RUN pnpm install --frozen-lockfile

# Copy app source code
COPY . .

# Build your app (adjust this command if your build script differs)
RUN pnpm run build

# Production image
FROM node:22-alpine

WORKDIR /app

# Copy built files from build stage
COPY --from=build /app/dist ./dist

# Install serve globally to serve static files
RUN npm install -g serve

EXPOSE 3000

# Start the app with serve on port 3000
CMD ["serve", "-s", "dist", "-l", "3000"]
