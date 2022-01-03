const { OrderBill, AccountSales, User, Account } = require("../models");
var fs = require("fs");

// All allOrderBill
const allOrderBill = async (req, res) => {
  try {
    const listOrderBill = await OrderBill.findAll({
      include: [
        {
          model: Account,
          as: "accountOrdered",
        },
        {
          model: User,
          as: "user",
        },
      ],
    });

    if (listOrderBill) {
      res.status(200).json({
        isSuccess: true,
        data: listOrderBill,
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
const createOrderBill = async (req, res) => {
  console.log("hihi");
  const orderBill = req.body;
  const quantity = parseInt(orderBill.quantity);
  const typeAccountId = parseInt(orderBill.typeAccountId);
  const user_id = parseInt(orderBill.user_id);
  try {
    const newOrderBill = await OrderBill.create(
      {
        quantity: orderBill.quantity,
        totalMoney: orderBill.totalMoney,
        user_id: user_id,
        account_id: typeAccountId,
      },
      {
        raw: true,
      }
    );
    let listAccountEmail = await AccountSales.findAll({
      where: {
        status: 0,
        account_id: typeAccountId,
      },
      limit: quantity,
      raw: true,
    });

    listAccountEmail.forEach(async (element) => {
      await AccountSales.update(
        {
          orderBill_id: newOrderBill.dataValues.id,
          status: 1,
        },
        {
          where: {
            id: element.id,
          },
        }
      );
    });
    var user = await User.findOne({
      where: {
        id: user_id,
      },
    });
    console.log(listAccountEmail);
    var balanceUser = user.balance - orderBill.totalMoney;
    await User.update(
      {
        balance: balanceUser,
      },
      {
        where: {
          id: user_id,
        },
      }
    );

    res.status(200).json({
      isSuccess: true,
      data: listAccountEmail,
    });
  } catch (error) {
    console.log(error);
  }
};

const createFileOrderBill = (req, res) => {
  let { accountSaleString, typeFile, username } = req.body;

  const nameFile = Math.random().toString(36) + username;
  let fileCreate = null;
  let nameFileOrigin = null;
  if (typeFile == "json") {
    nameFileOrigin = nameFile + ".json";
    fileCreate = fs.createWriteStream("public/download/" + nameFileOrigin);
  } else if (typeFile == "txt") {
    nameFileOrigin = nameFile + ".txt";
    fileCreate = fs.createWriteStream("public/download/" + nameFileOrigin);
  }

  fileCreate.once("open", function (fd) {
    fileCreate.write(accountSaleString);
    fileCreate.end();
  });

  res.status(200).send(nameFileOrigin);
};

const downloadFileOrderBill = (req, res) => {
  console.log(1234);
  var nameFile = req.query.nameFile;
  var nameFileOrigin = `public/download/${nameFile}`;
  res.download(nameFileOrigin);
};

const getDetailOrderBillUser = async (req, res) => {
  try {
    const userId = parseInt(req.params.id);
    const listBillUser = await OrderBill.findAll({
      include: [
        {
          model: Account,
          as: "accountOrdered",
        },
        {
          model: User,
          as: "user",
        },
      ],
      where: {
        user_id: userId,
      },
    });
    res.status(200).send(listBillUser);
  } catch (error) {
    console.log(error);
  }
};

const getDetailOrderBillUserId = async (req, res) => {
  try {
    console.log("12345");
    const order_id = parseInt(req.query.orderBill_id);
    const userId = parseInt(req.query.account_id);

    //check exit order
    let orderBill = await OrderBill.findOne({
      where: {
        id: order_id,
      },
      raw: true,
    });

    if (orderBill) {
      // check user login when get orderBilly
      if (req.user.id == userId) {
        const listAccountSales = await AccountSales.findAll({
          where: {
            orderBill_id: order_id,
          },
        });

        res.status(200).json({
          isSuccess: true,
          data: listAccountSales,
        });
      } else {
        res.status(401).json({
          isSuccess: false,
          data: "Không phải bạn đang đăng nhập ",
        });
      }
    } else {
      res.status(400).json({
        isSuccess: false,
        data: "Bill này thực sự không tồn tại ",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({
      isSuccess: false,
      data: "Bill này thực sự không tồn tại ",
    });
  }
};

const deleteOrderBill = async (req, res) => {
  const id = req.params.id;
  const orderBill = await OrderBill.destroy({
    where: {
      id: id,
    },
  });
  if (orderBill) {
    res.status(200).json({
      isSuccess: true,
      data: orderBill,
    });
  }
  res.status(400).json({
    isSuccess: false,
    data: orderBill,
  });
};
module.exports = {
  allOrderBill,
  createOrderBill,
  createFileOrderBill,
  downloadFileOrderBill,
  getDetailOrderBillUser,
  getDetailOrderBillUserId,
  deleteOrderBill,
};
