FROM node:20-alpine

WORKDIR /usr/src/api

COPY . .

RUN yarn
RUN yarn build

EXPOSE 3000

CMD ["node", "dist/main.js"]