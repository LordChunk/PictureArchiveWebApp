FROM node:12.16.3-alpine

WORKDIR /app

# Copy already built app
COPY /dist /app/dist/
COPY /local.js /package.json /app/

# Install AngularFire for SSR support
RUN npm install @angular/fire firebase

# Expose the port the app runs in
EXPOSE 8080

# Serve the app
CMD ["npm", "run", "serve:ssr"]
