const User = require("../models/UserModel");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv").config();
const jwtSecret = process.env.JWT_SECRET;
const test = (req, res) => {
	res.json("test successful");
};

const registerUser = async (req, res) => {
	const { username, password } = req.body;
	if (username && password) {
		const user = await User.findOne({ username: username });

		if (user) {
			res.send({ msg: `username ${username} already exists` });
		} else {
			const createdUser = new User({ username, password });

			createdUser.save().then((data, err) => {
				if (err) {
					res.send({ msg: err.message });
				} else {
					jwt.sign(
						{ userId: createdUser._id },
						jwtSecret,
						(err, token) => {
							if (err) throw err;
							res.cookie("token", token).status(201).send({msg: "new user created",data: data,token: `ok and token is ${token}`,								});
						}
					);
				}
			});
		}
	} else {
		res.send({ msg: "please fill in the missing fields" });
	}
};

const loginUser = async (req, res) => {
	const { username, password } = req.body;
	if (username && password) {
		const user = await User.findOne({ username: username });

		if (user) {
			console.log("user found");
			{user.password !== password
					? res.send({ msg: "password mismatch" })
					:res.send({msg: "User profile verifcation complete",});
			}
		} else {
			res.send({ msg: "User not found" });
		}
	} else {
		res.send({ msg: "please fill in the missing fields" });
	}
};

module.exports = {
	test,
	registerUser,
	loginUser,

};
