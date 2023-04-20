import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
const Register = () => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	const registerUser = async (e) => {
		e.preventDefault();
		const {data} = await axios.post('http://localhost:4000/api/register', {username, password});

		console.log(data);
	}
	return (
		<div className="h-screen flex items-center">
			<form className="w-96 mx-auto mb-60 p-5 rounded-lg h-80 shadow-2xl" onSubmit={registerUser}>
				<h1 className="text-center text-blue-500 mb-6 text-lg ">Another One</h1>
				<input
					value={username}
					onChange={(e) => setUsername(e.target.value)}
					type="text"
					placeholder="username"
					className="block w-full  rounded-md p-2 mb-6 outline-sky-600"
				/>

				<input
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					type="password"
					placeholder="password"
					className="block w-full rounded-md p-2 mb-6 outline-sky-600"
				/>
				<button className="bg-blue-500 text-white block w-full rounded-md p-2 mb-6 " >
					Register
				</button>
				<p className="text-center">Already have an account? <Link to="/login" className="text-blue-500">Login here</Link></p>
			</form>
		</div> 
	);
};

export default Register;
