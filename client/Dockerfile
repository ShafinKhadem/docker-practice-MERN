FROM node:latest
WORKDIR /usr/app

## Add the wait script to the image
ADD https://github.com/ufoscout/docker-compose-wait/releases/download/2.9.0/wait /wait
RUN chmod +x /wait

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

EXPOSE 3000
RUN npm install -g serve
CMD /wait && serve -s build -l 3000
