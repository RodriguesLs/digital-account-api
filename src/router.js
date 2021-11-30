const express = require('express');
const router = express.Router();
const controller = require('./controllers/applicationController');

router.post('/initialize', async (req, res) => {
    let response = controller.initialize(req);

    res.status(200).send(response);
})

router.post('/transference', async (req,res) => {
    const { operation_type } = req.body;

    return res.send({
        operation_type
    });
})

router.get('/history', async (req,res) => {
    const { operation_type } = req.body;

    return res.send({
        operation_type
    });
})

module.exports = app => app.use('/', router);
