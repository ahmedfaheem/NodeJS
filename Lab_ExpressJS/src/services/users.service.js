//const fs = require("fs").promises;
const userModel = require("../models/user.model")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const readUsers = async () => {
        const data = await userModel.find();
    return data;
}



const createUser = async (user) => {
    // 10 count of times that hash function hash the password
    const hashedPass = await bcrypt.hash(user.password, 10);
    const mappedUser = {
        ...user,
        birthDate: new Date(user.birthDate),
        password:hashedPass
    }
    const newUser = await userModel.create(mappedUser);
    return newUser;
}

const isPasswordMatch = async (password, hashedPassword)=>{
    return await bcrypt.compare(password, hashedPassword);
}


const generateToken = async (user)=>{
    // prepare data
    //console.log(user);
    const payload = {
        name: user.name,
        email:user.email,
        birthDate: user.birthDate,
        role: user.role
    }
    const secretKey = process.env.JWT_SECRET;

    const options = {
        expiresIn:"1h",
    }

    const token = await jwt.sign(payload, secretKey, options);

   return token;
}

const getUserById = async (id) => {

    const user = userModel.findOne({_id:id});

    return user;
}

const getUserByEmail = async (_email)=>{
    const user = userModel.findOne({email:_email});
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
    getUserByEmail,
    updateUser,
    deleteUser,
    isPasswordMatch,
    generateToken
}