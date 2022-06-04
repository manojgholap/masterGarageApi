const Database = require('../main/database');

module.exports={
    getAllGarage:(req,res)=>{

    },
    addGarage:async(req,res)=>{
       const garage = Database.getCollection('garage');
       let isgarageAdded = await garage.insertOne({
            garageName:req.body.garageName,
            garageType:req.body.garageType,
            garageAddress:req.body.garageAddress,
            garageMobileNumber:req.body.garageMobileNumber,
            garageAmenities:req.body.garageAmenities,})
        if(isgarageAdded){
            res.send({status:true,message:"garage added"})
        }
        else{
            res.send({status:false,message:"error while inserting garage"})
        }
    },
    getGarageByPinCode:async(req,res)=>{
        const garage = Database.getCollection('garage');
        let getDetails = await garage.find({"garageAddress": {$elemMatch: {"pincode":req.body.pincode}}}).toArray()
        if(getDetails){
            res.send({status:true,message:"data fetched",resp:getDetails})
        }
        else{
            res.send({stauts:false,message:"error while getting garage details"})
        }
    },
    
}