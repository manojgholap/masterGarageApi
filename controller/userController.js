const Database = require('../main/database');


module.exports = {
    updateProfile: async (req, res) => {
        const user = Database.getCollection('user');
        let isUserUpdated = await user.findOneAndUpdate({
            mobileNumber: req.body.mobileNumber
        }, {
            $set: {
                "firstName": req.body.firstName,
                "lastName": req.body.lastName,
                "email": req.body.email,
                "mobileNumber": req.body.mobileNumber,
                "alternateMobileNumber": req.body.alternateMobileNumber,
                "dateOfBirth": req.body.dob,
                "gender": req.body.gender,
                "homeAddress": req.body.homeAddress,
                "officeAddress": req.body.officeAddress,
                "otherAddress": req.body.otherAddress,
                "profilePhoto": req.file ? req.file.filename : req.body.mobileNumber + ".jpg"
            }
        })
        if (!isUserUpdated) {
            res.send({ status: false, err: "something went wrong please try again" });
            return
        }
        res.send({ status: true, message: "user details updated successfully" })
    },
    setPassword: async (req, res) => {
        const user = Database.getCollection('user');
        let createUser = await user.insertOne({
            mobileNumber: req.body.mobileNumber,
            password: req.body.password
        })
        if (!createUser) {
            res.send({ status: false, err: "err while creating user" });
            return
        }
        res.send({ status: true, message: "user details saved successfully" });
        return
    },
    getUserDetails: async (req, res) => {
        const user = Database.getCollection('user');
        console.log(req.body);
        let userDetails = await user.findOne({ mobileNumber: req.body.mobileNumber })
        if (!userDetails) {
            res.send({ status: false, err: "error while getting data" })
            return
        }
        res.send({ status: true, message: "user details fetch successfully", resp: userDetails })
    },
    addUserCar:async(req,res)=>{
        console.log(req.body);
    }
}
