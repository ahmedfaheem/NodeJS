const userService = require("../services/users.service");
const APIError = require("../utils/APIError");


const createUser = async (req, res) => {
    const user = await userService.getUserByEmail(req.body.email)
    if(user){
        throw  new APIError("Email Exists Before", 401);
    }
    const newUser = await userService.createUser(req.body);

    res.status(201).json({ message: "user created successfully", data: newUser });
}

const signIn = async (req, res) => {
    const user = await userService.getUserByEmail(req.body.email);

    if (!user) {
        throw new APIError("Invalid Email or Password", 401);
    }

    const isPasswordValid = await userService.isPasswordMatch(req.body.password, user.password);

    if (!isPasswordValid) {
        throw new APIError("Invalid Email or Password", 401);
    }

    const token = await userService.generateToken(user);

    return res.status(200).json({
        message: "user signed in successfully",
        token,
        data: {
            name: user.name,
            email: user.email,
            role: user.role,
        },
    });
}

const readUsers = async (req, res) => {
    const users = await userService.readUsers();
    res.json({ message: 'users fetched successfully', data: users });
}

const getUserById = async (req, res) => {
    const user = await userService.getUserById(req.params.id);

    if (!user) {
        return res.status(404).json({
            message: "user not found"
        });
    }

    res.json({ message: 'user fetched successfully', data: user });
}

const updateUser = async (req, res) => {
    const updateUser = await userService.updateUser(req.params.id, req.body);
    if (!updateUser) {
        return res.status(404).json({
            message: "user not found"
        });
    }
    res.json({ message: 'user updated successfully', data: updateUser });
}

const deleteUser = async (req, res) => {
    const deleteUser = await userService.deleteUser(req.params.id);
    if (!deleteUser) {
        return res.status(404).json({
            message: "user not found"
        });
    }
    res.json({ message: 'user deleted successfully' });
}

module.exports = {
    createUser,
    readUsers,
    getUserById,
    updateUser,
    deleteUser,
    signIn
}