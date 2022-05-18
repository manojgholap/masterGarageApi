const express = require('express');
const router = express.Router();
router.use(express.json())
const login = require('../controller/loginController');



router.post('/generateOtp', (req, res) => { login.generateOtp(req, res) })
router.post('/validateOtp', (req, res) => { login.validateOtp(req, res) })
router.post('/login', (req, res) => { login.login(req, res) })

module.exports=router