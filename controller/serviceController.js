const services = require('./services.json');
const Database = require('../main/database');
const { ObjectId } = require('mongodb');

module.exports = {
    addServiceByCategory: async (req, res) => {
        // res.send({ status: true, message: "fetched", resp: services })
        let service = Database.getCollection('service');
        for (const key in services) {
            let category = services[key]
            console.log("key", category);
            var isbrandadded = await service.insertOne({
                "service": key,
                "category": category
            })
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