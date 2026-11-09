FROM node:20-alpine
WORKDIR /app
COPY services/shared ./services/shared
COPY services/recommendation-service/package*.json ./services/recommendation-service/
WORKDIR /app/services/recommendation-service
RUN npm install
COPY services/recommendation-service ./
EXPOSE 3004
CMD ["npm", "start"]
