# Specify a node base image
FROM node:22-alpine

# Work directory
WORKDIR /app

# Install some dependencies
COPY package.json .
COPY package-lock.json .
RUN npm install -g @angular/cli
RUN npm install

# Default Command
CMD ["ng", "serve", "--host", "0.0.0.0"]