'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class AccountSales extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Account,OrderBill}) {
      // define association here
      this.belongsTo(Account, { foreignKey: "account_id", as: "sellAccount"});
      this.belongsTo(OrderBill, { foreignKey: "orderBill_id", as: "type_bill_account_id"});
    }
  };
  AccountSales.init({
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    status: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'AccountSales',
  });
  return AccountSales;
};