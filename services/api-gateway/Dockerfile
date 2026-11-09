FROM node:20-alpine
WORKDIR /app
COPY services/shared ./services/shared
COPY services/api-gateway/package*.json ./services/api-gateway/
WORKDIR /app/services/api-gateway
RUN npm install
COPY services/api-gateway ./
EXPOSE 3000
CMD ["npm", "start"]
