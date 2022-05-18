const express = require('express');
const router = express.Router();
const car= require('../controller/carController');
router.use(express.json())

router.post('/getCarByBrandName',(req,res)=>{car.getCarByBrandName(req,res)})
router.get('/getAllCarBrands',(req,res)=>{car.getAllCarBrands(req,res)})
router.post('/addCarByBrand',(req,res)=>{car.addCarByBrand(req,res)})

module.exports=router
