const Database = require('../main/database');

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
    getUserCarDetails: async (req, res) => {

    },
    getAllCarBrands: async (req, res) => {
        const car = Database.getCollection('car');
        var isCarBrand = await car.find().toArray()
        if (!isCarBrand) {
            res.send({ status: false, message: "something went wrong" })
            return
        }
        res.send({ status: true, message: "fetched", resp: isCarBrand })
    }
}