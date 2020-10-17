FROM node:lts-alpine AS build
WORKDIR /build

# Install all dependencies
COPY package*.json ./
RUN npm install -g @angular/cli
RUN npm install

# Copy source files
COPY . .

# Build ssr client
RUN npm run build:ssr

FROM node:lts-alpine as ssr-npm
WORKDIR /app

# Copy build artifacts
COPY --from=build /build/dist /app/dist

# Install AngularFire for SSR support
RUN npm install @angular/fire firebase

FROM node:lts-alpine

WORKDIR /production

COPY --from=ssr-npm /app /production

# Expose web port
EXPOSE 8080

# Start SSR client
CMD ["node", "dist/PictureArchiveWebApp/server/main.js"]
