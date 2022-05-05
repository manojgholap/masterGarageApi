const otp_generator = require('otp-generator');
const Database = require('../main/database');
const SMS = require('fast-two-sms');
module.exports = {
    generateOtp: async function (req, res) {
        const user = Database.getCollection('user');
        let isUserExist=await user.findOne({"mobileNumber":req.body.mobileNumber})
         if(isUserExist){
             res.send({status:false,err:"user allready exist with this number kindly login"})
             return
         }
        const otp = otp_generator.generate(4, { upperCaseAlphabets: false, lowerCaseAlphabets: false, specialChars: false })
        const otpDb = Database.getCollection('otp')
        isNumberExist = await otpDb.find({ "mobileNumber": req.body.mobileNumber }).toArray()
        if (isNumberExist) await otpDb.deleteMany({ "mobileNumber": req.body.mobileNumber })
        isOtpGenerated = await otpDb.insertOne({ "mobileNumber": req.body.mobileNumber, otp: otp })
        var options = {authorization :process.env.API_KEY, 
                        message :'Your One time password for Master Garage is '+otp,
                        numbers : [req.body.mobileNumber]} 
        isSmsSend = SMS.sendMessage(options)
        if (isSmsSend) {
            res.send({ status:true,message: "otp generated successfully please check your phone" })
        }
        else {
            res.send({status:false,err: "error while generating otp please try again" })
        }
    },
    validateOtp:async function(req,res){
        const otpDb = Database.getCollection('otp')
        isNumberExist = await otpDb.findOne({ "mobileNumber":req.body.mobileNumber})
        dbOtp = isNumberExist.otp
        otp = req.body.otp
        if(otp==dbOtp){
            res.send({status:true,message:"otp authenticate successfully"})
        } 
        else{
            res.send({status:false,err:"otp does not match.kindly check your otp or resend it"})
        }       
    },
    login:async function(req,res){
        const user = Database.getCollection('user');
        let isNumberExist=await user.findOne({"mobileNumber":req.body.mobileNumber})
        if(!isNumberExist){
            res.send({status:false,err:"user account not found with this number!create your account"})
            return 
        }
        let isUserExist=await user.findOne({"mobileNumber":req.body.mobileNumber,password:req.body.password})
        if(!isUserExist){
            res.send({status:false,err:"Invalid username or password"})
            return
        }
        res.send({status:true,message:"Login Successfully"})
    }
}