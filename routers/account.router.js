const express = require("express");
const { allAccount, detailAccount, createAccount, updateAccount, deleteAccount } = require("../controllers/account.controller");
const accountRouter = express.Router();

accountRouter.get("/", allAccount);
accountRouter.get("/:id", detailAccount);
accountRouter.post("/", createAccount);
accountRouter.put("/:id", updateAccount);
accountRouter.delete("/:id", deleteAccount);
module.exports = {
    accountRouter
};