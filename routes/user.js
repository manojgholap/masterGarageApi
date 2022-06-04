const express = require('express');
const router = express.Router();
const multer = require('multer');
const userController = require('../controller/userController');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/')
    },
    filename: function (req, file, cb) {
        console.log(req.body);
        cb(null, req.body.mobileNumber + ".jpg")
    }
})

router.use(express.json())

const upload = multer({ storage: storage })
router.post('/uploads', upload.single('profile'), (req, res) => { userController.updateProfile(req, res)})
router.post('/setPassword', (req, res) => { userController.setPassword(req,res)})
router.post('/getUserDetails',(req, res) => {userController.getUserDetails(req,res)})
router.post('/addUserCar', (req, res) => {userController.addUserCar(req,res)})
router.post('/addUserTempCar', (req, res) => {userController.addUserTempCar(req,res)})
router.post('/getUserCarDetails',(req,res)=>{userController.getUserCarDetails(req,res)})
router.post('/getUserTempCarDetails',(req,res)=>{userController.getUserTempCarDetails(req,res)})
router.post('/updateUserCar',(req,res)=>{userController.updateUserCar(req,res)})
router.post('/updateUserTempCar',(req,res)=>{userController.updateUserTempCar(req,res)})
router.post('/updateAddress',(req,res)=>{userController.updateAddress(req,res)});

module.exports = router