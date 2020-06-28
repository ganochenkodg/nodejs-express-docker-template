const express = require('express');
const router = express.Router();
const app = express();
const cors = require('permissive-cors');
const process = require('process');
const GracefulShutdownManager = require('@moebius/http-graceful-shutdown').GracefulShutdownManager;

app.use(cors());
app.use('/', router);

router.get('/ping', async (req, res) => {
  res.send('pong');
});

router.get('/health', function(req, res, next) {
  res.json({
    status: 'Healthy'
  });
});

var port = process.env.PORT || 3000;
const server = app.listen(port, function() {
  console.log('App succesfully running!');
});

const shutdownManager = new GracefulShutdownManager(server);
process.on('SIGINT', function onSigint() {
  app.shutdown();
});

process.on('SIGTERM', function onSigterm() {
  app.shutdown();
});

app.shutdown = function() {
  shutdownManager.terminate(() => {
    console.log('Server is gracefully terminated.');
  });
};
