FROM node:22-alpine

RUN apk add --no-cache git bash python3 make g++

WORKDIR /app

COPY package*.json ./

RUN npm install

EXPOSE 5173

CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]
