FROM node:lts-alpine
WORKDIR /app
COPY package.json ./
COPY package-lock.json ./
RUN npm install
COPY . .
RUN apk add --no-cache bash
ADD https://raw.githubusercontent.com/vishnubob/wait-for-it/master/wait-for-it.sh /wait-for-it.sh
RUN chmod +x /wait-for-it.sh && chown node:node /wait-for-it.sh
EXPOSE 3333
RUN chown -R node /app
USER node
CMD ["/wait-for-it.sh", "db:5432", "--", "npm", "run", "dev"]
