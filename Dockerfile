# Step 1: Use a base image with Node.js to build the Angular app
FROM node:18 AS build-stage

# Set the working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the app's source code
COPY . .

# Build the Angular app for production
RUN npm run build -- --configuration=production

# Step 2: Use a lightweight web server to serve the built app
FROM nginx:alpine AS production-stage

# Copy the Angular build output to the Nginx HTML directory
COPY --from=build-stage /app/dist/ehsq-frontend/browser /usr/share/nginx/html

# Expose the default Nginx port
EXPOSE 80

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]