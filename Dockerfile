FROM node:12-slim
RUN mkdir /app && chown -R node:node /app
WORKDIR /app
COPY --chown=node:node package*.json ./
USER node
RUN npm install && npm cache clean --force --loglevel=error
COPY --chown=node:node index.js .
COPY --chown=node:node healthcheck.js .
HEALTHCHECK --interval=15s --timeout=2s --start-period=5s \  
    CMD node healthcheck.js
CMD [ "node", "index.js" ]
