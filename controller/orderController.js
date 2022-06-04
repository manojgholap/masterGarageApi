const Database = require('../main/database');
const otp_generator = require('otp-generator');


module.exports = {
    addOrder: async (req, res) => {
        const orderId = otp_generator.generate(8, { upperCaseAlphabets: false, lowerCaseAlphabets: false, specialChars: false })
        const order = Database.getCollection('order');
        let isOrderInserted = await order.insertOne({
            mobileNumber:req.body.mobileNumber,
            isServiceSelect: req.body.isServiceSelect,
            isCarSelect: req.body.isCarSelect,
            isGarageSelected: req.body.isGarageSelected,
            address: req.body.address,
            date: req.body.date,
            time: req.body.time,
            payment: req.body.payment,
            paymentStatus:req.body.paymentStatus,
            status:true,
            garageStatus:"waiting",
            orderId:"MG"+orderId
        })
        if (isOrderInserted) {
            res.send({ status:true,message: "order placed successfully",resp:{orderId:"MG"+orderId} })
        }
        else {
            res.send({status:false,err: "error while placing order ! please try again" })
        }
    },
    getOrderById:async(req,res)=>{
        const order = Database.getCollection('order');
        let orderDetail=await order.findOne({orderId:req.body.orderId})
        if(!orderDetail){
            res.send({status:false,err:"something went wrong"});
            return
        }
        res.send({status:true,message:"fetched",resp:orderDetail})
    }
}
