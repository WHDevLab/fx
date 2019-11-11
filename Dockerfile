FROM keymetrics/pm2:latest-alpine

RUN mkdir -p /home/fx
WORKDIR /home/fx
COPY . /home/fx

RUN npm install express serve-favicon

EXPOSE 1378
CMD ["pm2-runtime", "start", "pm2.json"]
