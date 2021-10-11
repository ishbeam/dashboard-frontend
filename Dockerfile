# FROM node:8
FROM node:10
WORKDIR /app/client/

COPY package.json /app/client/
COPY public /app/client/public/
COPY src /app/client/src/
RUN npm install
CMD ["npm","start"]