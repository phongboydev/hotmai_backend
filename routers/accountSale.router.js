const express = require("express");
const {
  createAccountSale,
  allAccountSale,
  detailAccountSale,
  updateAccountSale,
  deleteAccountSale,
} = require("../controllers/accountSale.controller");
const accountSaleRouter = express.Router();

accountSaleRouter.get("/", allAccountSale);
accountSaleRouter.post("/", createAccountSale);
accountSaleRouter.get("/:id", detailAccountSale);
accountSaleRouter.put("/:id", updateAccountSale);
accountSaleRouter.delete("/:id", deleteAccountSale);

module.exports = {
  accountSaleRouter,
};
