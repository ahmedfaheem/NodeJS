 const Router = require("express").Router;
const postsController = require("../controllers/posts.controller");




const postRouter = Router();

// /posts
postRouter.post("/", postsController.createPost);
postRouter.get("/", postsController.getAllPosts);
postRouter.get("/:id", postsController.getPostById);
postRouter.put("/:id", postsController.updatePostById);
postRouter.delete("/:id", postsController.deletePostById);


module.exports = postRouter;