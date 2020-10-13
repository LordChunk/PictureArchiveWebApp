FROM node:lts-alpine3.9

WORKDIR /app

# Copy already built app
COPY /PictureArchiveWebApp /app/PictureArchiveWebApp/

# Install AngularFire for SSR support
RUN npm install @angular/fire firebase

# Expose the port the app runs in
EXPOSE 8080

# Serve the app
CMD ["node", "PictureArchiveWebApp/server/main.js"]
