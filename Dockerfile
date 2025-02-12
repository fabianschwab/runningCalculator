# -- Build stage --
FROM node:alpine3.20 AS builder

WORKDIR /app

COPY package.json ./
RUN npm i

COPY . .
RUN npm run build

# -- Production stage --
FROM nginx:alpine AS runner

WORKDIR /usr/share/nginx/html

RUN rm -rf ./*
COPY --from=builder /app/build .

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
