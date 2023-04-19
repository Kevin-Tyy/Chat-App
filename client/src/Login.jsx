import React from "react";

const Login = () => {
	return (
		<div className="h-screen flex items-center">
			<form className="mx-auto w-96 p-5 rounded-lg h-80 shadow-2xl">
				<h1 className="text-center text-blue-500 mb-6 ">Another One</h1>

				<input
					type="text"
					className="w-full p-2 mb-6 rounded-md "
					placeholder="Username"
				/>
				<input
					type="password"
					className="w-full p-2 mb-6 rounded-md "
					placeholder="Password"
				/>
				<button className="bg-blue-500 w-full p-2 mb-4 rounded-md text-white">
					Sign in
				</button>
        <p className="text-center">Don't have an account? <a href="#" className="text-blue-500">Register</a></p>
			</form>
		</div>
	);
  
};

export default Login;
