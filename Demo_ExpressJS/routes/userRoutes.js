const { Router } = require("express");
const { UserController } = require("../controllers/userController");

const userRouter = Router();
const userController = new UserController();

userRouter.get('/', userController.index);

module.exports = userRouter;