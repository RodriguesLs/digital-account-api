const express = require('express');
const router = express.Router();
const controller = require('./controllers/applicationController');

router.post('/initialize', async (req, res) => {
  let response = controller.initialize(req);

  res.status(200).send(response);
});

module.exports = app => app.use('/', router);
