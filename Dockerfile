FROM node:20-alpine AS production

WORKDIR /usr/src/app

RUN npm install -g pnpm

COPY package*.json pnpm-lock.yaml ./

RUN pnpm install --prod --frozen-lockfile

COPY dist ./dist

EXPOSE 8000

CMD ["node", "dist/main.js"]
