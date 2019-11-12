FROM base_web

RUN mkdir -p /home/fx
WORKDIR /home/fx
COPY . /home/fx

EXPOSE 1378
CMD ["pm2-runtime", "start", "pm2.json"]
