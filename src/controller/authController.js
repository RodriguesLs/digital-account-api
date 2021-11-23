const express = require('express');
const router = express.Router();
const initMiddleware = require('../middlewares/initialize')
const data = require('../../example.json')

const account = require('../models/initializeAccount');

let initializeAccount = async (data) => {
    let type = data.type
    let payload = {
        name: data.payload.name,
        document: data.payload.document,
        avaliable_limit: data.payload['available-limit']
    }
    let status = initMiddleware.verifyData(payload);
    return {
        type,
        status, 
        payload
    }
}

let accountTransfer = (archive) => {
    /* middleware de validação de dados */

}

router.post('/initialize', async (req,res) => {
    const { payload } = req.body;
    const data = JSON.parse(payload);
    let response = [];

    data.forEach(operation => {
        switch(operation.type) {
            case('initialize_account'):
                let result = account.create(operation.payload);
                response.push(result);
                break;
            default:
                console.log('Unknown operation');
        }
    });
    let arr = [];
    account.create(req.body);
    /* falta: middleware de validação de dados */
    res.status(200).send({data: 'ok'})
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

module.exports = app => app.use('/auth', router);