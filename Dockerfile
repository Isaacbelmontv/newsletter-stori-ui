FROM node:18-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . ./
RUN npm run ng -- build --configuration production


FROM nginx:1.25.4-alpine
COPY nginx.default.conf.template /etc/nginx/templates/default.conf.template
EXPOSE 4200
COPY --from=build /app/dist/newsletter-stori-ui/browser /usr/share/nginx/html/newsletter-stori-ui
