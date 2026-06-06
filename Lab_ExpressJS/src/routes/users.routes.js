const { Router } = require("express");

const usersController = require("../controllers/users.controller");
// const reqLogger = require("../middlewares/reqLogger");

const usersRouter = Router();

// /users
usersRouter.post("/", usersController.createUser);
usersRouter.get("/", usersController.readUsers);
usersRouter.get("/:id", usersController.getUserById);
usersRouter.put("/:id", usersController.updateUser);
usersRouter.delete("/:id", usersController.deleteUser);



module.exports = usersRouter;
