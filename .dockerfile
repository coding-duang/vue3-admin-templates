FROM nginx:latest

COPY /templates/dist/ /usr/share/nginx/html/
COPY /templates/nginx/default.conf /etc/nginx/conf.d/default.conf

# FROM node:16.17.0-alpine as build-stage

# WORKDIR /app

# COPY package.json ./

# RUN npm install

# COPY . .
# RUN npm run build
