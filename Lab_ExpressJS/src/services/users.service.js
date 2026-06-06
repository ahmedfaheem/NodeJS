//const fs = require("fs").promises;
const userModel = require("../models/user.model")

const readUsers = async () => {
        const data = await userModel.find();
    return data;
}



const createUser = async (user) => {
    const newUser = await userModel.create(user);
    return newUser;
}

const getUserById = async (id) => {

    const user = userModel.findOne({_id:id});

    return user;
}

const updateUser = async (id, user) => {

     const updatedUser = await userModel.findOneAndUpdate({_id:id}, user, {new: true});
    if (!updatedUser) {
        return null;
    }
    return updatedUser;
}

const deleteUser = async (id) => {

  const user = userModel.findByIdAndDelete(id);
    if (!user) {
        return null;
    }


    return user;
}

module.exports = {
    readUsers,
    createUser,
    getUserById,
    updateUser,
    deleteUser
}