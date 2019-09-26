const Sequelize = require("sequelize");
const con = require("../config/config");

var tbl_country = con.define(
  "tbl_country",
  {
    ID: {
      type: Sequelize.INTEGER, //ill result in an attribute that is firstName when user facing but first_name in the database
      primaryKey: true
    },
    Name: {
      type: Sequelize.STRING
    }
  },
  {
    freezeTableName: true, // Model tableName will be the same as the model name
    timestamps: false
  }
);

module.exports = tbl_country;
