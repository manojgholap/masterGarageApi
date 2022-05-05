
var mongodb = require('mongodb');
var mainDb;

module.exports = {
    loadDB: function (callback) {
        var MongoClient = mongodb.MongoClient;
        var urlString = process.env.dbUrl;
        MongoClient.connect(urlString, { useNewUrlParser: true },async function (err, client) {
            if (err) {
                setTimeout(function () {
                    this.loadDB(callback);
                }, 3000);
            }
            else {
                mainDb =client.db(process.env.databaseName);
                if (callback)
                    callback();
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