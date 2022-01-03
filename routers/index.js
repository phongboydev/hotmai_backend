const express = require("express");
const { categoryRouter } = require("./category.router");
const { userRouter } = require("./user.router");
const { accountSaleRouter } = require("./accountSale.router");
const { orderBillRouter } = require("./orderBill.router");
const { accountRouter } = require("./account.router");

const rootRouter = express.Router();

rootRouter.use("/category", categoryRouter);
rootRouter.use("/user", userRouter);
rootRouter.use("/accountSales", accountSaleRouter);
rootRouter.use("/orderBill", orderBillRouter);
rootRouter.use("/account", accountRouter);

module.exports = {
  rootRouter,
};
