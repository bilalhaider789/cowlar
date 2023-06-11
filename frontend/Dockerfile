FROM node:19-alpine

# Working directory be app
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app


COPY package*.json ./

###  Installing dependencies
RUN npm install --silent

# copy local files to app folder
COPY . .
ENV NEXT_PUBLIC_SERVER=http://localhost:7000/
EXPOSE 3000

CMD ["npm","run", "dev"]