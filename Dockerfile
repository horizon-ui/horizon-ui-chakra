
FROM node:18-alpine as build-env

WORKDIR /app

COPY . .

RUN npm install --no-frozen-lockfile && npm run build

FROM nginx:1.18-alpine as deploy-env

WORKDIR /deploy

COPY ./nginx.conf /etc/nginx/nginx.conf

COPY --from=build-env /app/build/ .

EXPOSE 80