const mdbconn = require("../lib/utils/mongo.js");
const mongo = require("mongodb");

function getProducts() {
  return mdbconn.conn().then((client) => {
    return client
      .db("expressMessage")
      .collection("Messages")
      .find({})
      .toArray();
  });
}

function getProduct(ts) {
  var myquery = { timestamp: new mongo.Double(ts) };
  return mdbconn.conn().then((client) => {
    return client
      .db("expressMessage")
      .collection("Messages")
      .find(myquery)
      .toArray();
  });
}

function insertProduct(product) {
  return mdbconn.conn().then((client) => {
    return client
      .db("expressMessage")
      .collection("Messages")
      .insertOne(product); // Si no se provee un ID, este será generado automáticamente
  });
}

function deleteMessage(ts) {
  // Elimina un documento que sea tenga un ts igual al del parámetro.
  var myquery = { timestamp: new mongo.Double(ts) };
  return mdbconn.conn().then((client) => {
    return client
      .db("expressMessage")
      .collection("Messages")
      .deleteOne(myquery);
  });
}

function updateMessage(ts, msg, author) {
  var myquery = { timestamp: new mongo.Double(ts) };
  // Modifica el atributo name de un documento específico
  return mdbconn.conn().then((client) => {
    return client
      .db("expressMessage")
      .collection("Messages")
      .updateOne(
        myquery, // Filtro al documento que queremos modificar
        {
          $set: {
            message: String(msg),
            author: String(author),
          },
        } // El cambio que se quiere realizar
      );
  });
}

module.exports = [
  getProducts,
  insertProduct,
  deleteMessage,
  updateMessage,
  getProduct,
];
