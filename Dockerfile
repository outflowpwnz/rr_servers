FROM node:20.11.1

WORKDIR /app

COPY . .
RUN npm install

RUN npm run build

CMD ["node", "dist/main.js"]