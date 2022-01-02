'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({OrderBill}) {
      // define association here
      this.hasMany(OrderBill, { foreignKey: "user_id", as: "user" });
    }
  };
  User.init({
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    image: DataTypes.STRING,
    role:DataTypes.STRING,
    balance:DataTypes.FLOAT,
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};