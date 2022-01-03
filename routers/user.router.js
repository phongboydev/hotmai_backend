const express = require("express");
const { authenticate } = require("../middlewares/auth/authenticate");

const {
  getUser,
  register,
  login,
  uploadAvatar,
  updateUserById,
  deleteUserById,
  allUser,
  addUser,
} = require("../controllers/user.controller");
const { uploadImage } = require("../middlewares/upload/upload-image");
const userRouter = express.Router();

userRouter.post("/register", register);
userRouter.post("/login", login);
userRouter.get("/", allUser);
userRouter.post("/", addUser);
userRouter.get("/detail", authenticate, getUser);
userRouter.post("/upload-avatar", authenticate, uploadImage(), uploadAvatar);
userRouter.put("/:id", authenticate, updateUserById);
userRouter.delete("/:id", authenticate, deleteUserById);

module.exports = {
  userRouter,
};
