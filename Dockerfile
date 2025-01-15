# Stage 1: Builder
FROM hub.lumigame.com/base/node:20.9.0-alpine-24h1.1 AS builder
WORKDIR /app

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

# Copy config files first
COPY package.json package-lock.json tsconfig.json next.config.js configs.json ./
COPY postcss.config.js tailwind.config.js ./
COPY configs ./configs
RUN npm ci --include=dev

# Copy source code
COPY src ./src
COPY .env.${NODE_ENV} .env

ENV HOSTNAME=0.0.0.0
ENV PORT=5000

RUN npm run build

# Stage 2: Runner
FROM hub.lumigame.com/base/node:20.9.0-alpine-24h1.1 AS runner
WORKDIR /app
ENV NODE_ENV production
ENV HOSTNAME=0.0.0.0
ENV PORT=5000

# Copy standalone output
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/.env ./.env
COPY --from=builder /app/configs.json ./configs.json

RUN addgroup -g 1001 -S nodejs && \
    adduser -S nextjs -u 1001 && \
    chown -R nextjs:nodejs /app

USER nextjs

EXPOSE 5000
ENV PORT 5000
CMD HOSTNAME="0.0.0.0" node server.js
