FROM node:14

WORKDIR /alfabroker-app
COPY package.json .
RUN npm install
COPY . .
#CMD npm start
# BD IP 172.21.0.2
CMD ["bash", "-c", "if [ \"$NODE_ENV\" = 'production' ]; then npm start; else npm run dev; fi"]