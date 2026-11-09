FROM node:20-alpine
WORKDIR /app
COPY services/shared ./services/shared
COPY services/cart-service/package*.json ./services/cart-service/
WORKDIR /app/services/cart-service
RUN npm install
COPY services/cart-service ./
EXPOSE 3003
CMD ["npm", "start"]
