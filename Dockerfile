FROM node:22-alpine AS builder

# Cài pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate

WORKDIR /app

COPY public/ /app/public
COPY src/ /app/src
COPY jsconfig.json /app/jsconfig.json
COPY vite.config.js /app/vite.config.js
COPY index.html /app/index.html
COPY package.json /app/package.json
COPY pnpm-lock.yaml /app/pnpm-lock.yaml

RUN pnpm install --frozen-lockfile
RUN pnpm run build

# Stage 2
FROM nginx:alpine
COPY config/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
# docker run -dp 80:80 --name pokemon-app pokemon-vue:1.0.0
