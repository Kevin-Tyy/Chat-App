import React, { useState } from "react";

const Register = () => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	const register = async () => {
		const {data} = await axios.post('/register', {username, password})
	}
	return (
		<div className="bg-blue-100 h-screen flex items-center">
			<form className="w-80 mx-auto mb-60" onSubmit={register}>
				<input
					value={username}
					onChange={(e) => setUsername(e.target.value)}
					type="text"
					placeholder="username"
					className="block w-full  rounded-md p-2 mb-2"
				/>

				<input
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					type="password"
					placeholder="password"
					className="block w-full rounded-md p-2 mb-2"
				/>
				<button className="bg-blue-500 text-white block w-full rounded-md p-2">
					Register
				</button>
			</form>
		</div>
	);
};

export default Register;
