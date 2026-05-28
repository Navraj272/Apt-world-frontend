FROM public.ecr.aws/docker/library/node:18-alpine AS builder
RUN apk add --no-cache g++ make py3-pip libc6-compat
WORKDIR /app
COPY package*.json ./
RUN npm ci --no-cache
COPY . .
RUN rm -rf /app/.git /app/.next/cache
RUN npm run build

FROM public.ecr.aws/docker/library/node:18-alpine AS production
WORKDIR /app
RUN addgroup -g 1001 -S nodejs && adduser -S nextjs -u 1001
USER nextjs
COPY --from=builder --chown=nextjs:nodejs /app/.next ./.next
COPY --from=builder --chown=nextjs:nodejs /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/next.config.js ./next.config.js
COPY --from=builder /app/public ./public
EXPOSE 3000
EXPOSE 8080
CMD ["node_modules/.bin/next","start","-p","3000"]