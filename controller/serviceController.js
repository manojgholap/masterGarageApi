const services = require('./services.json');
const Database = require('../main/database');
const { ObjectId } = require('mongodb');

module.exports = {
    addServiceByCategory: async (req, res) => {
        // res.send({ status: true, message: "fetched", resp: services })
        let service = Database.getCollection('service');
        for (const key in services) {

           for(const value in services[key]){
               console.log(services[key][value]);
               var isbrandadded = await service.insertOne({
                "service": key,
                "category": services[key][value]
            })
           } // let category = services[key]
            
        }
    },
    getAllServices: async (req, res) => {
        let service = Database.getCollection('service');
        var getAllService = await service.find().toArray();
        if (!getAllService) {
            res.send({ status: false, err: "something went wrong" })
            return
        }
        res.send({ status: true, message: "services fetched",resp:getAllService})
    },
    getServiceById: async (req, res) => {
        var id = req.body.id
        let service = Database.getCollection('service');
        var getService = await service.find({ "_id": ObjectId(id) }).toArray();
        if (!getService) {
            res.send({ status: false, err: "something went wrong" })
            return
        }
        res.send({ status: true, message: "services fetched", resp: getService })
    }
}