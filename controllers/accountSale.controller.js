const { Category, AccountSales } = require("../models");

// const {
//     getList,
//     create,

// } = require("../services/category.service");
// All Category
const allAccountSale = async (req, res) => {
  try {
    const accountList = await AccountSales.findAll();
    if (accountList) {
      res.status(200).json({
        isSuccess: true,
        data: accountList,
      });
    } else {
      res.status(500).json({
        isSuccess: false,
        data: null,
      });
    }
  } catch (error) {
    res.status(500).json({
      isSuccess: false,
      data: null,
    });
  }
};

// Create Category
// const createAccountSale = async(req, res) => {

//     const accountSales = req.body;
//     console.log(accountSales);
//     try {
//         const accountSale = await AccountSales.create(accountSales);
//         if (accountSale) {
//             res.status(201).send(accountSale);
//         }
//         res.status(404).send("Không tạo được");
//     } catch (error) {
//         console.log(error)
//     }
// }

// Detail account
const detailAccountSale = async (req, res) => {
  let detailAccountSales = null;
  const id = req.params.id;
  try {
    detailAccountSales = await AccountSales.findOne({
      where: {
        id: id,
      },
    });
    if (detailAccountSales) {
      res.status(200).json({
        isSuccess: true,
        data: detailAccountSales,
      });
    } else {
      res.status(500).json({
        isSuccess: false,
        data: detailAccountSales,
      });
    }
  } catch (error) {
    res.status(500).json({
      isSuccess: false,
      data: detailAccountSales,
    });
  }
};

// Create account
const createAccountSale = async (req, res) => {
  const { email, password, account_id } = req.body;
  try {
    const newAccountSales = await AccountSales.create({
      email: email,
      password: password,
      account_id: account_id,
      status: 0,
    });
    if (newAccountSales) {
      res.status(201).json({
        isSuccess: true,
        data: newAccountSales,
      });
    } else {
      res.status(500).json({
        isSuccess: false,
        data: null,
      });
    }
  } catch (error) {
    res.status(500).json({
      isSuccess: false,
      data: null,
    });
  }
};

// Update account
const updateAccountSale = async (req, res) => {
  const id = req.params.id;
  const { email, password, account_id, status } = req.body;
  try {
    const updateAccountSales = await AccountSales.update(
      {
        email: email,
        password: password,
        account_id: account_id,
        status: status,
      },
      {
        where: {
          id: id,
        },
      }
    );
    if (updateAccountSales) {
      res.status(200).json({
        isSuccess: true,
        data: updateAccountSales,
      });
    } else {
      res.status(500).json({
        isSuccess: false,
        data: null,
      });
    }
  } catch (error) {
    res.status(500).json({
      isSuccess: false,
      data: null,
    });
  }
};

// Delete account
const deleteAccountSale = async (req, res) => {
  const id = req.params.id;
  try {
    const deleteAccountSales = await AccountSales.destroy({
      where: {
        id: id,
      },
    });
    if (deleteAccountSales) {
      res.status(200).json({
        isSuccess: true,
        data: deleteAccountSales,
      });
    } else {
      res.status(500).json({
        isSuccess: false,
        data: null,
      });
    }
  } catch (error) {
    res.status(500).json({
      isSuccess: false,
      data: null,
    });
  }
};

module.exports = {
  allAccountSale,
  detailAccountSale,
  createAccountSale,
  updateAccountSale,
  deleteAccountSale,
};
