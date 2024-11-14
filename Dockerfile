#build stage for a Node.js application
FROM node:20.18-alpine as build-stage
ARG REACT_APP_APP_ENV
ARG REACT_APP_API_URL
WORKDIR /app
RUN echo "REACT_APP_APP_ENV=${REACT_APP_APP_ENV}" > ./.env
RUN echo "REACT_APP_API_URL=${REACT_APP_API_URL}" >> ./.env
COPY . .
RUN npm install
RUN npm run build

#production stage
FROM nginx:stable-alpine as production-stage
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build-stage /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
