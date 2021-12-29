# Specify a base image
FROM node:alpine

# Install some depenendencies
WORKDIR /usr/app
# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY ./package*.json ./
RUN npm install

# COPY ./ ./ is equivalent
COPY . .

EXPOSE 8080

# Default command
CMD ["npm", "start"]