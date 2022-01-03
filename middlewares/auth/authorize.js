const { User } = require("../../models");
const authorize = (arrType) => (req, res, next) => {
  const { user } = req;
  console.log("authorize : ", user.type);
  if (arrType.findIndex((ele) => ele === user.type) > -1) {
    next();
  } else {
    res.status(403).send("Bạn đã đăng nhập nhưng không có quyền");
  }
};

const checkBalanceUser = async (req, res, next) => {
  const { user_id, totalMoney } = req.body;
  console.log("id : ", user_id);
  var user = await User.findOne({
    where: {
      id: user_id,
    },
    raw: true,
  });
  if (user.balance < totalMoney) {
    res.status(200).json({
      isSuccess: false,
      data: "bạn không đủ số dư",
    });
  } else {
    next();
  }
};

const checkAdmin = async (req, res, next) => {
  const { user_id, totalMoney } = req.body;
  console.log("id : ", user_id);
  var user = await User.findOne({
    where: {
      id: user_id,
    },
    raw: true,
  });
  if (user.role !== "admin") {
    res.status(403).json({
      isSuccess: false,
      data: "Bạn không có quyền",
    });
  } else {
    next();
  }
};

module.exports = {
  authorize,
  checkBalanceUser,
  checkAdmin,
};
