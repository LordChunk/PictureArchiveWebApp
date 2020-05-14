FROM node:12.16.3-alpine as buildContainer
WORKDIR /app
# package files are for dependency installation git folder is to determine the version for Sentry releases
COPY ./package.json ./package-lock.json /app/

# This package is incompatible with Docker and is not required
# https://github.com/bahmutov/add-typescript-to-cypress/issues/57
RUN npm uninstall @bahmutov/add-typescript-to-cypress cypress
# insall is already ran by uninstalling packages
# RUN npm install
COPY . /app
RUN npm run build:ssr

FROM node:12.16.3-alpine

WORKDIR /app
# Copy dependency definitions
COPY --from=buildContainer /app/package.json /app
COPY --from=buildContainer /app/local.js /app

# Get all the code needed to run the app
COPY --from=buildContainer /app/dist /app/dist

# Install AngularFire for SSR support
RUN npm install @angular/fire firebase

# Expose the port the app runs in
EXPOSE 8080

# Serve the app
CMD ["npm", "run", "serve:ssr"]
