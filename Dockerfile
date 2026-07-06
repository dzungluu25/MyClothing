# Build stage
FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

# Production stage
FROM node:20-alpine

WORKDIR /app

COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist

# The default port in app.ts is 5001 if PORT isn't set
ENV PORT=5001
ENV NODE_ENV=production

EXPOSE 5001

CMD ["npm", "start"]
