FROM node:4.8

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

ADD package.json npm-shrinkwrap.json /usr/src/app/
RUN npm install
ADD . /usr/src/app

EXPOSE 10010

RUN adduser --system --group --disabled-password --disabled-login --uid 9010 cody-webhook
USER 9010:9010

CMD ["/usr/src/app/node_modules/.bin/forever", "--minUptime", "10000", "--spinSleepTime", "5000", "./index.js"]
