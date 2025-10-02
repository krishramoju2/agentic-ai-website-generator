FROM node:18-alpine
WORKDIR /app
COPY . .
RUN npm ci --legacy-peer-deps
EXPOSE 5000
CMD ["node", "server/index.js"]

