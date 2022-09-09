FROM node:16.17-alpine as node
RUN apk update && \
    apk add --no-cache curl
ARG env

# Create app directory
WORKDIR /app

COPY . .
RUN npm install
RUN npm run build
# COPY . .

#Your app binds to port 3000 so you’ll use the EXPOSE instruction to have it mapped by the docker daemon:
EXPOSE 3000
CMD ["npm", "start"]