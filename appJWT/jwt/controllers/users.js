const mdbconn = require("../lib/utils/mongo.js");
const mongo = require("mongodb");

function insertUser(product) {
  const MongoClient = require("mongodb").MongoClient;
  const uri =
    "mongodb+srv://user69:<password>@cluster0.qidvm.mongodb.net/<dbname>?retryWrites=true&w=majority";
  const client = new MongoClient(uri, { useNewUrlParser: true });
  client.connect((err) => {
    return client.db("expressMessage").collection("Users").insertOne(product);
    // perform actions on the collection object
  });
}

module.exports = [insertUser];
