FROM node:20-alpine
WORKDIR /app
COPY services/shared ./services/shared
COPY services/auth-service/package*.json ./services/auth-service/
WORKDIR /app/services/auth-service
RUN npm install
COPY services/auth-service ./
EXPOSE 3002
CMD ["npm", "start"]
