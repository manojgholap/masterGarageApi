const Database = require('../main/database');
const cars =require('./car.json')

module.exports = {
    getCarByBrandName: async (req, res) => {
        const car = Database.getCollection('car');
        let isCar =await car.find({ make: req.body.brandName }).toArray();
        if (!isCar) {
            res.send({ status: false, err: "something went wrong" })
            return
        }
        res.send({ status: true, message: "fetched", resp: isCar })
    },
    getAllCarBrands: async (req, res) => {
        const car = Database.getCollection('car');
        var isCarBrand = await car.find().toArray()
        if (!isCarBrand) {
            res.send({ status: false, message: "something went wrong" })
            return
        }
        res.send({ status: true, message: "fetched", resp: isCarBrand })    
    },
    addCarByBrand:async(req,res)=>{
        var j=0
        var k=0
        let car = Database.getCollection('car');
          for (const key in cars) {
            var isbrandadded=await car.insertOne({
                "make":key,
                "makePhoto":key+".jpeg"
            })
            j=j+1
             let carObj = cars[`${key}`]
             carObj.forEach(async element => {
                cardata = element["cars"];
                fueltype = element['fueltype']
               for (x in cardata){
                   k=k+1;
                const carName = cardata[x].split('.')
                // console.log("brand",key);
                // console.log("carPhoto",cardata[x]);
                // console.log("car",carName);
                // console.log("fueltype",fueltype[x]);
                 var iscaradded= await car.findOneAndUpdate({ make:key },{$push:{
                    "car":carName[0],
                    "carPhoto":cardata[x],
                    "fueltype":fueltype[x]
                 }})
                 console.log("inserted",cardata[x]);
               }
               console.log(key,k);
               k=0
             })
            }
            console.log("brands",j);
            res.send({status:true,message:"mapped"})
    }
}