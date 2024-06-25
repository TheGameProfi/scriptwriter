# Stage 1: Build dependencies
FROM node:current-alpine AS builder

WORKDIR /app
COPY package*.json ./
RUN npm install

# Stage 2: Production image
FROM node:current-alpine

WORKDIR /app
COPY --from=builder /app/node_modules ./node_modules
COPY . .

# Build the application
RUN npm run build

# Start the application
CMD ["npm", "start"]