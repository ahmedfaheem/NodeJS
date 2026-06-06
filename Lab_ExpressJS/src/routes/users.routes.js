const { Router } = require("express");

const usersController = require("../controllers/users.controller");
// const reqLogger = require("../middlewares/reqLogger");

const usersRouter = Router();


const validate = require("../middlewares/validate.middleware");
const userCreateSchema =  require("../validators/users/create.user.validator");
const userUpdateSchema =  require("../validators/users/update.user.validator");

// /users
usersRouter.post("/",validate(userCreateSchema), usersController.createUser);
usersRouter.get("/", usersController.readUsers);
usersRouter.get("/:id", usersController.getUserById);
usersRouter.put("/:id", validate(userUpdateSchema) ,usersController.updateUser);
usersRouter.delete("/:id", usersController.deleteUser);



module.exports = usersRouter;
