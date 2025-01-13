# Stage 1: Builder
FROM hub.lumigame.com/base/node:20.9.0-alpine-24h1.1 AS builder
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Add build argument for environment
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

COPY package.json package-lock.json ./
RUN npm ci

COPY . .
COPY .env.${NODE_ENV} .env
RUN npm run build

# Stage 2: Runner
FROM hub.lumigame.com/base/node:20.9.0-alpine-24h1.1 AS runner
WORKDIR /app
ENV NODE_ENV production

# Copy only necessary files from builder
COPY --from=builder /app/configs.json ./configs.json
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

# Security: Create non-root user
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001
RUN chown -R nextjs:nodejs /app/.next
USER nextjs

EXPOSE 3000
CMD ["npm", "start"] 