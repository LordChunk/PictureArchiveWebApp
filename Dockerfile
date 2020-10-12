FROM node:lts-alpine3.9

WORKDIR /app

# Copy already built app
COPY /dist /app/dist/
COPY /package.json /app/

# Install AngularFire for SSR support
RUN npm install @angular/fire firebase

# Expose the port the app runs in
EXPOSE 8080

# Serve the app
CMD ["npm", "run", "serve:ssr"]
