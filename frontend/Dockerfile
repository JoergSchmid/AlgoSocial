# File inspired from
# https://jsramblings.com/dockerizing-a-react-app/
FROM node:18-alpine3.15
WORKDIR /frontend
COPY package.json yarn.lock ./
RUN yarn install
COPY . .
ENV NODE_ENV production
EXPOSE 3000
CMD ["yarn", "start"]