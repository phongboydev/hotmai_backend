'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Account extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Category,AccountSales,OrderBill}) {
      // define association here
      this.belongsTo(Category, { foreignKey: "category_id", as: "categoryType" });
      this.hasMany(AccountSales, { foreignKey: "account_id", as: "sellAccount" });
      this.hasMany(OrderBill, { foreignKey: "account_id", as: "accountOrdered" });
    }
  };
  Account.init({
    name: DataTypes.STRING,
    price: DataTypes.INTEGER,
    amount: DataTypes.INTEGER,
    country: DataTypes.STRING,
    description: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Account',
  });
  return Account;
};