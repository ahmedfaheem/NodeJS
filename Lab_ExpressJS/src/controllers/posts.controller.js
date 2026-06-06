const postService = require("../services/posts.service");

const getAllPosts = async (req, res) => {
        const posts = await postService.getAllPosts();
        res.status(200).json(posts);
}

const getPostById = async (req, res) => {
    const id = req.params.id;
    const post = await postService.getPostById(id);
    if (!post) {
        return res.status(404).json({ message: "Post not found" });
    }
    res.status(200).json(post);
}

const createPost = async (req, res) => {
    
    const { title, body,  userId } = req.body;
    
    const newPost = await postService.createPost(userId, title, body);
    res.status(201).json(newPost);
    
}

const updatePostById = async (req, res) => {
    const postId = req.params.id;
    const { title, body } = req.body;
    const updatedPost = await postService.updatePostById(postId, title, body);
    if (!updatedPost) {
        return res.status(404).json({ message: "Post not found" });
    }
    res.status(200).json(updatedPost);
}

const deletePostById = async (req, res) => {
    const postId = req.params.id;
    const deletedPost = await postService.deletePostById(postId);
    if (!deletedPost) {
        return res.status(404).json({ message: "Post not found" });
    }
    res.status(200).json({ message: "Post deleted successfully" });
}

module.exports = {
    getAllPosts,
    getPostById,
    createPost,
    updatePostById,
    deletePostById
};