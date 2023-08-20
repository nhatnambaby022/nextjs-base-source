FROM node:18.10.0
COPY . /app
WORKDIR /app
RUN npm install
RUN npm run build
EXPOSE 80
CMD ["npm","run","start"]