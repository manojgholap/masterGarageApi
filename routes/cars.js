const express = require('express');
const router = express.Router();
const car= require('../controller/carController');
router.use(express.json())

router.post('/getCarByBrandName',(req,res)=>{car.getCarByBrandName(req,res)})
router.post('/getUserCarDetails',(req,res)=>{car.getUserCarDetails(req,res)})
router.get('/getAllCarBrands',(req,res)=>{car.getAllCarBrands(req,res)})

module.exports=router
