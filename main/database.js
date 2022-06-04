
var mongodb = require('mongodb');
var mainDb;
const databaseName="MasterGarage"
const dbUrl="mongodb+srv://manoj2717:manoj2717@cluster0.jhqos.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
module.exports = {
    loadDB: function (callback) {
        var MongoClient = mongodb.MongoClient;
        var urlString = dbUrl;
        MongoClient.connect(urlString, { useNewUrlParser: true },async function (err, client) {
            if (err) {
                setTimeout(function () {
                    callback("something went wrong",null)
                }, 3000);
            }
            else {
                mainDb =client.db(databaseName);
                if (callback)
                    callback(null,"database Connected");
            }
        }
        );
    },
    init: function (mainCallback) {
        this.loadDB(mainCallback)
    },
    getCollection: function (name) {
        let collection = mainDb.collection(name);
        return collection;
    },
    getDB: function () {
        return mainDb;
    },
    setDB: function (db) {
        mainDb = db;
    }

}