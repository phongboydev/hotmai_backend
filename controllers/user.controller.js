const { User } = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { host } = require("./constants");

const allUser = async (req, res) => {
  try {
    const listUser = await User.findAll();
    if (listUser) {
      res.status(200).json({
        isSuccess: true,
        data: listUser,
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
const addUser = async (req, res) => {
  const user = req.body;
  try {
    const salt = bcrypt.genSaltSync(10);

    const hashPassword = bcrypt.hashSync(user.password, salt);
    user.password = hashPassword;
    const newUser = await User.create({
      username: user.username,
      password: user.password,
      role: user.role,
      balance: user.balance,
    });
    if (newUser) {
      res.status(200).json({
        isSuccess: true,
        data: newUser,
      });
    } else {
      res.status(500).json({
        isSuccess: false,
        data: null,
      });
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const register = async (req, res) => {
  const user = req.body;
  try {
    const salt = bcrypt.genSaltSync(10);
    // mã hóa salt +password
    const hashPassword = bcrypt.hashSync(user.password, salt);
    user.password = hashPassword;
    const newUser = await User.create({
      username: user.username,
      password: user.password,
      role: "client",
      balance: 0,
    });
    res.status(201).send(newUser);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const login = async (req, res) => {
  const { username, password } = req.body;
  // b1: tìm ra user đang đăng nhập dưa trên username
  const user = await User.findOne({
    where: {
      username,
    },
  });

  if (user) {
    //b2: kiểm tra mật khẩu có đúng hay không
    const isAuth = bcrypt.compareSync(password, user.password);
    console.log("isAuth : ", isAuth);
    if (isAuth) {
      const token = jwt.sign(
        {
          username: user.username,
          role: user.role,
          balance: user.balance,
          id: user.id,
        },
        "Dai-Phong-1807",
        { expiresIn: 60 * 60 }
      );

      res.status(200).send({ message: "Đăng nhập thành công", token });
    } else {
      res.status(500).send({ message: "tài khoản hoặc mật khẩu không đúng" });
    }
  } else {
    res.status(404).send({ message: "Không tìm thấy email phù hợp" });
  }
};

const uploadAvatar = async (req, res) => {
  let { file } = req;
  file.path = file.path.slice(6);
  console.log(file.path);
  const urlImage = `${host}/${file.path}`;
  const { user } = req;
  console.log(user);
  const userFound = await User.findOne({
    where: {
      email: user.email,
    },
  });
  userFound.avatar = urlImage;
  await userFound.save();
  res.send(userFound);
};

const getUser = (req, res) => {
  res.status(200).send({ user: req.user });
};

const getBalance = () => {
  var partnerCode = "MOMO";
  var accessKey = "F8BBA842ECF85";
  var secretkey = "K951B6PE1waDMi640xX08PD3vg6EkVlz";
  var requestId = partnerCode + new Date().getTime();
  var orderId = requestId;
  var orderInfo = "pay with MoMo";
  var redirectUrl = "https://momo.vn/return";
  var ipnUrl = "https://callback.url/notify";
  // var ipnUrl = redirectUrl = "https://webhook.site/454e7b77-f177-4ece-8236-ddf1c26ba7f8";
  var amount = "50000";
  var requestType = "captureWallet";
  var extraData = ""; //pass empty value if your merchant does not have stores

  //before sign HMAC SHA256 with format
  //accessKey=$accessKey&amount=$amount&extraData=$extraData&ipnUrl=$ipnUrl&orderId=$orderId&orderInfo=$orderInfo&partnerCode=$partnerCode&redirectUrl=$redirectUrl&requestId=$requestId&requestType=$requestType
  var rawSignature =
    "accessKey=" +
    accessKey +
    "&amount=" +
    amount +
    "&extraData=" +
    extraData +
    "&ipnUrl=" +
    ipnUrl +
    "&orderId=" +
    orderId +
    "&orderInfo=" +
    orderInfo +
    "&partnerCode=" +
    partnerCode +
    "&redirectUrl=" +
    redirectUrl +
    "&requestId=" +
    requestId +
    "&requestType=" +
    requestType;
  //puts raw signature
  console.log("--------------------RAW SIGNATURE----------------");
  console.log(rawSignature);
  //signature
  const crypto = require("crypto");
  var signature = crypto
    .createHmac("sha256", secretkey)
    .update(rawSignature)
    .digest("hex");
  console.log("--------------------SIGNATURE----------------");
  console.log(signature);

  //json object send to MoMo endpoint
  const requestBody = JSON.stringify({
    partnerCode: partnerCode,
    accessKey: accessKey,
    requestId: requestId,
    amount: amount,
    orderId: orderId,
    orderInfo: orderInfo,
    redirectUrl: redirectUrl,
    ipnUrl: ipnUrl,
    extraData: extraData,
    requestType: requestType,
    signature: signature,
    lang: "en",
  });
  //Create the HTTPS objects
  const https = require("https");
  const options = {
    hostname: "test-payment.momo.vn",
    port: 443,
    path: "/v2/gateway/api/create",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Content-Length": Buffer.byteLength(requestBody),
    },
  };
  //Send the request and get the response
  const req = https.request(options, (res) => {
    console.log(`Status: ${res.statusCode}`);
    console.log(`Headers: ${JSON.stringify(res.headers)}`);
    res.setEncoding("utf8");
    res.on("data", (body) => {
      console.log("Body: ");
      console.log(body);
      console.log("payUrl: ");
      console.log(JSON.parse(body).payUrl);
    });
    res.on("end", () => {
      console.log("No more data in response.");
    });
  });

  req.on("error", (e) => {
    console.log(`problem with request: ${e.message}`);
  });
  // write data to request body
  console.log("Sending....");
  req.write(requestBody);
  req.end();
};

const getListUser = async (req, res) => {
  try {
    const listUser = await User.findAll();
    if (listUser) {
      res.status(200).json({
        isSuccess: true,
        data: listUser,
      });
    } else {
      res.status(500).json({
        isSuccess: false,
        data: orderBill,
      });
    }
  } catch (error) {
    res.status(500).json({
      isSuccess: false,
      data: orderBill,
    });
  }
};

const getUserDetailById = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findOne({
      where: {
        id: id,
      },
    });
    if (user) {
      res.status(200).json({
        isSuccess: true,
        data: user,
      });
    } else {
      res.status(500).json({
        isSuccess: false,
        data: user,
      });
    }
  } catch (error) {
    res.status(500).json({
      isSuccess: false,
      data: user,
    });
  }
};

const updateUserById = async (req, res) => {
  try {
    const id = req.params.id;
    const { username, password, role, balance, image } = req.body;
    const user = await User.findOne({
      where: {
        id: id,
      },
      raw: true,
    });
    console.log(user);
    let updateUser = null;
    const salt = bcrypt.genSaltSync(10);
    const hashPassword = bcrypt.hashSync(password, salt);
    if (req.user.role === "admin") {
      updateUser = await User.update(
        {
          username: username,
          password: hashPassword,
          role: role,
          balance: balance,
          image: image,
        },
        {
          where: {
            id: id,
          },
        }
      );
    }

    if (updateUser) {
      res.status(200).json({
        isSuccess: true,
        data: updateUser,
      });
    } else {
      res.status(500).json({
        isSuccess: false,
        data: null,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      isSuccess: false,
      data: null,
    });
  }
};

const deleteUserById = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.destroy({
      where: {
        id: id,
      },
      raw: true,
    });

    if (user) {
      res.status(200).json({
        isSuccess: true,
        data: user,
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
  register,
  login,
  uploadAvatar,
  getUser,
  getListUser,
  getUserDetailById,
  updateUserById,
  deleteUserById,
  allUser,
  addUser,
};
