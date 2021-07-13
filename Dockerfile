# syntax=docker/dockerfile:1
FROM node:lts-alpine3.13 as build
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY [ "package.json", "package-lock.json", "./" ]
RUN npm ci
COPY . ./
RUN npm run build

# production environment
FROM nginx:stable-alpine
COPY --from=build /app/build /usr/share/nginx/html
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
