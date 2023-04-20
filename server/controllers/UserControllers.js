const User = require("../models/UserModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const dotenv = require("dotenv").config();
const jwtSecret = process.env.JWT_SECRET;
const test = (req, res) => {
	res.json("test successful");
};

const registerUser = async (req, res) => {
	const { username, password } = req.body;
	const hashedPassword = await bcrypt.hash(password, 10);

	if (username && password) {
		const user = await User.findOne({ username: username });

		if (user) {
			res.send({ msg: `username ${username} already exists` });
		} else {
			const createdUser = new User({
				username,
				password: hashedPassword,
			});

			createdUser.save().then((data, err) => {
				if (err) {
					res.send({ msg: err.message });
				} else {
					jwt.sign(
						{ userId: createdUser._id },
						jwtSecret,
						(err, token) => {
							if (err) throw err;
							res.cookie("token", token, { httpOnly: true }	)
								.status(201)
								.send({
									msg: "new user created",
									data: data,
									token: `ok and token is ${token}`
								});
						}
					);
				}
			});
		}
	} else {
		res.status(400).send({ msg: "please fill in the missing fields" });
	}
};

const loginUser = async (req, res) => {
	const { username, password } = req.body;

	if (username && password) {
		const user = await User.findOne({ username: username });

		if (user) {
			const hashedPassword = user.password;
			bcrypt.compare(password, hashedPassword, (err , result) => {
				if(err){
					throw err;
				}
				else if(result) {
					jwt.sign({username, password}, jwtSecret, (err, token)=>{
						if(err) throw err;
						res.cookie("token" , token, { httpOnly: true , secure : true, sameSite : 'none' , }).status(200).send({
							msg: "User profile verifcation complete",
							token: `token is ${token}`

						})
						
					})
					
				}
				else{
					res.status(200).send({ msg: "password mismatch" });

				}

			});


		} else {
			res.status(200).send({ msg: "User not found" });
		}
	} else {
		res.status(400).send({ msg: "please fill in the missing fields" });
	}
};

const protectedRoute = (req, res) => {
	const token = req.cookies?.token;
	if(token){
		jwt.verify(token, jwtSecret , (err, userData)=>{
			if(err){
				throw err;
			}
			else{
				const { id, username } = userData;
				res.send({id , username})
			}
		})

	}else{
		res.status(401).json('no token')
	}
}
module.exports = {
	test,
	registerUser,
	loginUser,
	protectedRoute
};
