FROM node:8.6
ENV NODE_OPTIONS=--max-old-space-size=8096 
WORKDIR /
COPY . /
RUN npm install
EXPOSE 3000
CMD ["npm", "start"]