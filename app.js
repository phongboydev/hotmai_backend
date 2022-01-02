// Requiring the module
const express = require('express');
const fs = require('fs');
const { sequelize } = require('./models')
const { listAccount } = require('./helpers/listAccount');
const path = require('path');
const { rootRouter } = require("./routers");
const { getDetailOrderBillUserId } = require("./controllers/orderBill.controller");
const { authenticate } = require('./middlewares/auth/authenticate');

const app = express();
// const http = require("http");
// const socketio = require("socket.io");


//chuyen req,res về  dang json
app.use(express.json());


app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Methods",
      "OPTIONS, GET, POST, PUT, PATCH, DELETE"
    );
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    next();
  });

  const publicPathDirectory = path.join(__dirname, './public')
  app.use(express.static(publicPathDirectory));


//create server socket
// const server = http.createServer(app);
// const io = socketio(server);
// //lăng nghe sư kiện từ client
// io.on("connection", (socket) => {

//   socket.on("createAccountEmailToServer",async ({ hello }) => {
//       console.log('hello',hello);
//       await updateAmountAccount();
//       // gửi cho client vừa kết nối vào
//       socket.emit("createAccountEmailToClient",hello);

//       // gửi cho các client còn lại
//       socket.broadcast.to(room).emit("send message from server to client", createMessages(`Client ${username} vừa tham gia vào Phòng ${room}`))

//   })
// })



// dùng router
app.use('/api', rootRouter);
app.get('/api/download', function (req, res) {
  console.log(1234);
  var nameFile = req.query.nameFile;
  var nameFileOrigin = `public/download/${nameFile}`;
  res.download(nameFileOrigin);
});
app.get("/api/seeBillOrder",authenticate, getDetailOrderBillUserId);
// Server setup
app.listen(8080, () => {
    console.log('server listening on port 8080');
});

//sequelize.sync({ force: true });