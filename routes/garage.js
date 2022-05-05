const express = require('express');
const router = express.Router();
const garage= require('../controller/garageController');
router.use(express.json())

router.post('/getGarageByPinCode', (req, res) => { garage.getGarageByPinCode(req, res) });
router.post('/getAllGarage', (req, res) => { garage.getAllGarage(req, res) });
router.post('/addGarage', (req, res) => { garage.addGarage(req, res) });

module.exports=router