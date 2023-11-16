# ビルド用
FROM node:20.9.0-slim as builder

WORKDIR /app

RUN apt-get update && apt-get install -y \
    openssl \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

## パッケージをインストール
COPY package.json ./
COPY package-lock.json ./
COPY tsconfig.json ./
RUN npm ci

COPY . .

RUN npm run build

# 開発用
FROM node:20.9.0-slim AS development

RUN apt-get update && apt-get install -y \
    openssl \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

## ビルド用のレイヤからコピーする
COPY --from=builder /app/build ./build
COPY --from=builder /app/package.json .
COPY --from=builder /app/node_modules ./node_modules

## Svelteが動く5173ポートを開けておく
EXPOSE 5173

# CMD ["npm", "run", "dev", "--", "--host"]

# 本番用
FROM development AS production

CMD ["node", "./build"]
