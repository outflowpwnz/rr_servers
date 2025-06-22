FROM node:20.11.1

WORKDIR /app

COPY dist .

CMD ["node", "dist/main.js"]