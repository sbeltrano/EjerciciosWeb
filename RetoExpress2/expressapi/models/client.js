const { DataTypes, Model } = require("sequelize");
const sequelize = require("../lib/sequelize");

class Client extends Model {}

Client.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Client",
  }
);

Client.sync();

module.exports = Client;