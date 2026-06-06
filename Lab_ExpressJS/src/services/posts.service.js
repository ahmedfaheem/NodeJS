const postModel = require("../models/post.model");
const getAllPosts =async  () =>{

    const posts = await postModel.find();
    return posts;
}

const writePost = async (post)=>{
   const newPost =  await postModel.create(post);
   return newPost;
}


const getPostById = async (id) =>{
    return  await postModel.findOne({_id: id});
}


const createPost = async (_userId, _title, _body)=>{
       
          return await writePost({
            title:_title,
            body:_body,
            userId:_userId
        });
}

const updatePostById = async (postId, title, body)=>{
    const updatedPost = await postModel.findOneAndUpdate(postId, {title:title, body:body}, {new:true});
        if(!updatedPost){
            return null;
        }
        return updatedPost;
}

const deletePostById = async (postId)=>{
    const post = await postModel.findByIdAndDelete(postId);
    if(!post){
        return null
    }
    return post;
}


module.exports = {
    getAllPosts,
    getPostById,
    createPost,
    updatePostById,
    deletePostById
}