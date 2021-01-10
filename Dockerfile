# build environment
FROM node:13.12.0-alpine as build
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY [ "offline-cache", "./"]
COPY [ "package.json", "yarn.lock", ".yarnrc", "./" ]
RUN npm config set unsafe-perm true
RUN yarn install --frozen-lockfile
RUN yarn global add react-scripts@3.4.1 -g --silent
ENV NODE_OPTIONS="--max-old-space-size=2048"
COPY . ./
RUN yarn run build

# production environment
FROM nginx:stable-alpine
COPY --from=build /app/build /usr/share/nginx/html
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
