const User = require("../models/UserModel");
const MessageModel = require("../models/MessageModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const UserModel = require("../models/UserModel");
const dotenv = require("dotenv").config();
const jwtSecret = process.env.JWT_SECRET;


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
									token: `${token}`
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
			const id = user._id
			bcrypt.compare(password, hashedPassword, (err , result) => {
				if(err){
					throw err;
				}
				else if(result) {
					jwt.sign({id ,username, password}, jwtSecret, (err, token)=>{
						if(err) throw err;
						res.cookie("token" , token, { httpOnly: true , secure : true, sameSite : 'none' , }).status(200).send({
							msg: "User profile verifcation complete",
							token: `${token}`,
							user : user

						})
						
					})
					
				}
				else{
					res.status(400).send({ msg: "password mismatch" }).end();

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
	
}

const dbFetchMessages = async (req, res) => {
	const {userId} = req.params;
	const data = req.data
	const ourUserId = data.id
	
	const messages = await MessageModel.find({
		sender : { $in : [ userId,  ourUserId] },
		recipient : { $in : [ userId, ourUserId] }
	}).sort({createdAt : 1})

	res.json(messages);

}

const manageOnline = async (req, res) => {
	const users = await User.find({}, {
		_id : 1,
		username : 1
	})
	res.send(users)
}
module.exports = {
	registerUser,
	loginUser,
	protectedRoute,
	dbFetchMessages,
	manageOnline
};

