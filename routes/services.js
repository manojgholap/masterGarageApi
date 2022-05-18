const express = require('express');
const router = express.Router();
router.use(express.json())
const service = require('../controller/serviceController');

router.post('/addServiceByCategory', (req, res) => { service.addServiceByCategory(req, res) })
router.get('/getAllServices', (req, res) => { service.getAllServices(req, res) })
router.post('/getServiceById',(req, res) => { service.getServiceById(req, res) })

module.exports = router