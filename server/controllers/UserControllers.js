const User = require("../models/UserModel");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv").config();
const jwtSecret = process.env.JWT_SECRET;
const test = (req, res) => {
	res.json("test successful");
};

const registerUser = async (req, res) => {
	const {username , password} = req.body;

	const createdUser = await User.create({username, password});
	jwt.sign({userId : createdUser._id} , jwtSecret, (err, token)=>{
		if( err) throw err;
		res.cookie('token' , token).status(201).json(`ok and token is ${token}`);
	})

}

module.exports = {
	test,
	registerUser,
};
