const express = require("express");
const {  getListByConditions, updateCategory, deleteCategory, createCategory, detailCategory, allCategory } = require("../controllers/category.controller");
const categoryRouter = express.Router();

categoryRouter.get("/getListByConditions", getListByConditions);
categoryRouter.get("/", allCategory);
categoryRouter.post("/", createCategory);
categoryRouter.get("/:id", detailCategory);
categoryRouter.put("/:id", updateCategory);
categoryRouter.delete("/:id", deleteCategory);
module.exports = {
    categoryRouter
};