FROM node:20-alpine
WORKDIR /app
COPY services/shared ./services/shared
COPY services/products-service/package*.json ./services/products-service/
WORKDIR /app/services/products-service
RUN npm install
COPY services/products-service ./
EXPOSE 3001
CMD ["npm", "start"]
