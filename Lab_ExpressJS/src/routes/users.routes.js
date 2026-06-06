const { Router } = require("express");

const usersController = require("../controllers/users.controller");
// const reqLogger = require("../middlewares/reqLogger");

const usersRouter = Router();


const validate = require("../middlewares/validate.middleware");
const userCreateValidator =  require("../validators/users/create.user.validator");
const userUpdateValidator =  require("../validators/users/update.user.validator");

// /users
usersRouter.post("/",validate(userCreateValidator), usersController.createUser);
usersRouter.get("/", usersController.readUsers);
usersRouter.get("/:id", usersController.getUserById);
usersRouter.put("/:id", validate(userUpdateValidator) ,usersController.updateUser);
usersRouter.delete("/:id", usersController.deleteUser);



module.exports = usersRouter;
