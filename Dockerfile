FROM node:14 AS build-stage

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY . .

RUN npm run build --prod

FROM nginx:alpine AS production-stage

COPY --from=build-stage /app/dist/[your-app-name] /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]