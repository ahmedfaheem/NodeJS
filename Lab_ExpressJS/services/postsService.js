
const fs = require('fs').promises;

const getAllPosts =async  () =>{

    const posts = await fs.readFile("./posts.json", "utf-8");
    return JSON.parse(posts);
}

const writePost = async (posts)=>{
    await fs.writeFile("./posts.json", JSON.stringify(posts));
}


const getPostById = async (id) =>{
    const posts = await getAllPosts();
    return  posts.find((data)=> data.id == id);
}


const createPost = async (userId, title, body)=>{
        const posts = await getAllPosts();
        const newPost = {id: posts.length +1, userId: userId, title: title, body:body};
        posts.push(newPost);
        await writePost(posts);
        return newPost;
}

const updatePostById = async (postId, title, body)=>{
     const posts = await getAllPosts();
        const postIndex = posts.findIndex((data)=> data.id == postId);
        if(postIndex === -1){
            return null;
        }
        posts[postIndex] = {
            ...posts[postIndex],
            title: title,
            body: body
        }
        await writePost(posts);
        return posts[postIndex];
}

const deletePostById = async (postId)=>{
    const posts = await getAllPosts();
    const postIndex = posts.findIndex((data)=> data.id == postId);
    if(postIndex === -1){
        return null;
    }
    posts.splice(postIndex, 1);
    await writePost(posts);
    return true;
}


module.exports = {
    getAllPosts,
    getPostById,
    createPost,
    updatePostById,
    deletePostById
}