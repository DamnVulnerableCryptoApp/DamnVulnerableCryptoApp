FROM node:18-alpine3.15 as builder

COPY . .
RUN yarn install
RUN yarn run build-with-deps

FROM node:18-alpine3.15 as runner


RUN mkdir /app
COPY --from=builder backend/build /app/build
COPY --from=builder backend/yarn.lock /app
COPY --from=builder backend/package.json /app

WORKDIR /app

RUN yarn global add cross-env
RUN yarn install --production

EXPOSE 4000
ENV PORT 4000
ENV NODE_ENV production


CMD ["yarn", "start:prod"]
