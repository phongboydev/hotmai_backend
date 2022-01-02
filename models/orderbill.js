'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class OrderBill extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({User,AccountSales,Account}) {
      // define association here
      this.belongsTo(User, { foreignKey: "user_id", as: "user" });
      this.hasMany(AccountSales, { foreignKey: "orderBill_id", as: "type_bill_account_id" });
      this.belongsTo(Account, { foreignKey: "account_id", as: "accountOrdered" });     
    }
  };
  OrderBill.init({
    quantity: DataTypes.INTEGER,
    totalMoney:DataTypes.FLOAT,
  }, {
    sequelize,
    modelName: 'OrderBill',
  });
  return OrderBill;
};