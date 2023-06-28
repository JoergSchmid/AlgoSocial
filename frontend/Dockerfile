# File inspired from
# https://jsramblings.com/dockerizing-a-react-app/
FROM node:17-alpine3.15
WORKDIR /frontend
COPY . .
RUN npm ci
RUN npm run build
ENV NODE_ENV production
EXPOSE 3000
CMD ["npx", "serve", "build"]