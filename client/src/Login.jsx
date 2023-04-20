import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";
const Login = () => {
	const [username , setUsername] = useState("");
	const [password , setPassword] = useState("");

	const loginUser = async (e) => {
		e.preventDefault();

		const {response} = axios.post('http://localhost:4000/api/login', {username , password}); 

	}
	return (
		<div className="h-screen flex items-center">
			<form className="w-96 mx-auto mb-60 p-5 rounded-lg h-80 shadow-2xl" onSubmit={loginUser}>
				
				<h1 className="text-center text-blue-500 mb-6 ">Another One</h1>

				<input
					type="text"
					className="w-full p-2 mb-6 rounded-md "
					placeholder="Username"
					onChange={(e)=> setUsername(e.target.value)}
				/>
				<input
					type="password"
					className="w-full p-2 mb-6 rounded-md "
					placeholder="Password"
					onChange={(e)=> setPassword(e.target.value)}
				/>
				<button className="bg-blue-500 w-full p-2 mb-4 rounded-md text-white">
					Sign in
				</button>
        <p className="text-center">Don't have an account? <Link to="/register" className="text-blue-500">Register</Link></p>
			</form>
		</div>
	);
  
};

export default Login;
