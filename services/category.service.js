const { Category, Account, AccountSales } = require("../models");
var sequelize = require("sequelize");

// Get List
const getList = async () => {
  const categoryList = await Category.findAll();
  if (categoryList) {
    return categoryList;
  }
  return false;
};

// Get Detail
const getDetail = async (id) => {
  const category = await Category.findOne({
    where: {
      id,
    },
  });

  if (category) {
    return category;
  } else {
    return false;
  }
};

// Create
const create = async (newCategory) => {
  console.log(newCategory);
  const createCategory = await Category.create(newCategory);
  if (createCategory) {
    return createCategory;
  }
  return false;
};

// Update
const update = async (id, category) => {
  const categoryUpdate = await getDetail(id);
  if (categoryUpdate) {
    categoryUpdate.name = category.name;
    categoryUpdate.address = category.address;
    categoryUpdate.province = category.province;
    const CategoryUpdated = await Category.save();
    return CategoryUpdated;
  } else {
    return false;
  }
};

// Delete
const deleteById = async (id) => {
  const categoryDelete = await getDetail(id);
  if (categoryDelete) {
    await Category.destroy({
      where: {
        id,
      },
    });
    return categoryDelete;
  } else {
    return false;
  }
};

const getListByCondition = async () => {
  try {
    const categoryList = await Category.findAll({
      include: [
        {
          model: Account,
          as: "categoryType",
        },
      ],
    });

    if (categoryList) {
      return categoryList;
    }
    console.log(categoryList);
  } catch (error) {
    console.log(error);
  }

  return false;
};
const updateAmountAccount = async () => {
  try {
    const list_Account_Id = await AccountSales.findAll({
      attributes: [
        "account_id",
        [
          sequelize.fn("COUNT", sequelize.col("account_id")),
          "count_account_id",
        ],
      ],
      where: {
        status: 0,
      },
      group: ["account_id"],
    });

    for (var i = 0; i < list_Account_Id.length; i++) {
      let amount = list_Account_Id[i].dataValues.count_account_id;
      let id = list_Account_Id[i].dataValues.account_id;
      await Account.update(
        {
          amount: amount,
        },
        {
          where: {
            id: id,
          },
        }
      );
    }
    console.log("update thành công ");
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getList,
  getDetail,
  create,
  update,
  deleteById,
  getListByCondition,
  updateAmountAccount,
};
