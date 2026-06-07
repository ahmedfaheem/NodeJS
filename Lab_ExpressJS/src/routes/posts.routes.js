 const Router = require("express").Router;
const postsController = require("../controllers/posts.controller");

const {validate, auth, restrictTo} = require("../middlewares/index");
const postCreateSchema = require("../validators/posts/create.post.validator");
const postUpdateSchema = require("../validators/posts/update.post.validator");


const postRouter = Router();

// /posts
postRouter.post("/", auth, validate(postCreateSchema),postsController.createPost);
postRouter.get("/", auth, postsController.getAllPosts);
postRouter.get("/:id", auth, postsController.getPostById);
postRouter.put("/:id", auth,  validate(postUpdateSchema),postsController.updatePostById);
postRouter.delete("/:id", auth, postsController.deletePostById);


module.exports = postRouter;