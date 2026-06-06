 const Router = require("express").Router;
const postsController = require("../controllers/posts.controller");

const validate = require("../middlewares/validate.middleware");
const postCreateSchema = require("../validators/posts/create.post.validator");
const postUpdateSchema = require("../validators/posts/update.post.validator");


const postRouter = Router();

// /posts
postRouter.post("/", validate(postCreateSchema),postsController.createPost);
postRouter.get("/", postsController.getAllPosts);
postRouter.get("/:id", postsController.getPostById);
postRouter.put("/:id", validate(postUpdateSchema),postsController.updatePostById);
postRouter.delete("/:id", postsController.deletePostById);


module.exports = postRouter;