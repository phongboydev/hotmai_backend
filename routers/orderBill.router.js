const express = require("express");
const { createOrderBill,downloadFileOrderBill,createFileOrderBill, getDetailOrderBillUser,getDetailOrderBillUserId,deleteOrderBill, allOrderBill } = require("../controllers/orderBill.controller");
const { authenticate } = require("../middlewares/auth/authenticate");
const { checkBalanceUser } = require("../middlewares/auth/authorize");

const orderBillRouter = express.Router();
orderBillRouter.post("/",authenticate,checkBalanceUser, createOrderBill);
orderBillRouter.get("/", allOrderBill);
orderBillRouter.get("/:id",authenticate, getDetailOrderBillUser);
orderBillRouter.post("/createFile",authenticate, createFileOrderBill);
orderBillRouter.delete("/:id",authenticate, deleteOrderBill);
module.exports = {
    orderBillRouter
};