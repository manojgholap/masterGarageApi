const express = require('express');
const router = express.Router();
router.use(express.json())
const order = require('../controller/orderController');

router.post('/addOrder',(req,res)=>{order.addOrder(req,res)})
router.post('/getOrderById',(req,res)=>{order.getOrderById(req,res)})

module.exports=router