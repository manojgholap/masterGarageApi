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
module.exports = router