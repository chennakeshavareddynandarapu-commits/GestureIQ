# Multi-stage Dockerfile for GestureIQ Full-Stack App

# ---- Backend Build ----
FROM node:18-alpine AS backend-build
WORKDIR /app/server
COPY server/package*.json ./
RUN npm install
COPY server/ ./

# ---- Frontend Build ----
FROM node:18-alpine AS frontend-build
WORKDIR /app/client
COPY client/package*.json ./
RUN npm install
COPY client/ ./
RUN npm run build

# ---- Production Image ----
FROM node:18-alpine
WORKDIR /app

# Copy Backend
COPY --from=backend-build /app/server /app/server

# Copy Frontend Build to public/ if using static delivery or keep separate
COPY --from=frontend-build /app/client/dist /app/client/dist

# Expose ports
EXPOSE 5000

WORKDIR /app/server
CMD ["npm", "start"]
