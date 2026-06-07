const { Router } = require("express");

const usersController = require("../controllers/users.controller");
// const reqLogger = require("../middlewares/reqLogger");

const usersRouter = Router();


const {validate, auth, restrictTo} = require("../middlewares/index");
const {signUpSchema, userUpdateSchema, signInSchema} = require("../validators/users/index");
// /users
usersRouter.post("/sign-up", validate(signUpSchema), usersController.createUser);
usersRouter.post("/sign-in", validate(signInSchema), usersController.signIn);
usersRouter.get("/", auth, restrictTo('admin'), usersController.readUsers);
usersRouter.get("/:id", usersController.getUserById);
usersRouter.put("/:id", validate(userUpdateSchema) ,usersController.updateUser);
usersRouter.delete("/:id", usersController.deleteUser);



module.exports = usersRouter;
