FROM node:14.15.0-alpine

ARG BASE_URL_API
ARG BASE_URL
ARG PORT

ENV BASE_URL_API=${BASE_URL_API}
ENV BASE_URL=${BASE_URL}
ENV PORT=${PORT}

ENV APP_ROOT /usr/src/app


WORKDIR ${APP_ROOT}

# Installing dependencies
COPY package*.json ./
RUN npm install

# Copying source files
COPY . .

RUN rm -rf ./.env

# Building app
RUN npm run build
