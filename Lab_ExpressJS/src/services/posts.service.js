const postModel = require("../models/post.model");
const getAllPosts =async  (currentUserID) =>{

    const posts = await postModel.find();
    return posts.map(post=>{
        return {
            ...post.toObject(),
            isOwner: currentUserID == post.userId
        }
    });
}

const writePost = async (post)=>{
   const newPost =  await postModel.create(post);
   return newPost;
}


const getPostById = async (id, currentUserID) =>{
    const post =   await postModel.findOne({_id: id});
      return {
        ...post.toObject(),
        isOwner: currentUserID == post.userId
      };
}


const createPost = async (_userId, _title, _body)=>{
       
          return await writePost({
            title:_title,
            body:_body,
            userId:_userId
        });
}

const updatePostById = async (postId, title, body)=>{
    const updatedPost = await postModel.findOneAndUpdate({_id: postId}, {title:title, body:body}, {new:true});
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