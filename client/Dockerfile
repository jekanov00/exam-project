 # start build start
FROM node:14.15.0-stretch as build-stage

ENV NODE_ENV="production"

RUN mkdir ./client

COPY ./pa

WORKDIR /client

COPY . .

RUN npm install \
    && npm run build
# end of build stage

FROM nginx:1.13.12-alpine as production-stage

RUN mkdir -p /var/www/html/

COPY --from=build-stage /client/build /var/www/html/

COPY ./nginx.conf /etc/nginx/nginx.conf

COPY ./nginx.vh.default.conf /etc/nginx/nginx.vh.default.conf

STOPSIGNAL SIGTERM

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]