import React, { useState } from "react";
import axios from "axios";
import CircularProgress from '@mui/material/CircularProgress';	
import { Link , useNavigate} from "react-router-dom";
import { Button, TextField } from "@mui/material";
const Register = () => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();
	const registerUser = async (event) => {
		event.preventDefault();
		setLoading(true);
		const { data } = await axios.post(
			"http://localhost:4000/api/login",
			{ username, password }
		);

		console.log(data);
		setLoading(false);
			
		if(data.user){
			alert(data.msg);
			navigate('/dashboard');	
			localStorage.setItem('token', data.token);	

		}		
		else{
			alert(data.msg);
		}
	};
	return (
		<div className="h-screen flex items-center">
			<form
				className="w-96 mx-auto mb-60 p-5 rounded-lg h-96 shadow-2xl"
				onSubmit={registerUser}>
				<h1 className="text-center text-blue-500 mb-6 text-lg ">
					Login
				</h1>

				<TextField
					label="Username"
					variant="outlined"
					required={true}
					type="text"
					className="text-field  block w-full rounded-md p-2 mb-2 !important"
					value={username}
					onChange={(e) => setUsername(e.target.value)}
				/>

				<TextField
					label="Password"
					variant="outlined"
					type="password"
					className="text-field  block w-full rounded-md p-2 "
					value={password}
					required={true}
					onChange={(e) => setPassword(e.target.value)}
				/>

				<Button className="button" type="submit" disabled={loading}>
					{loading ? <CircularProgress sx= {{color :'#fff' }} size={20}/> : 'Submit'}
				</Button>

				<p className="text-center mt-4">
					Don't have an account?&nbsp;
					<Link to="/register" className="text-blue-500">
						Sign Up
					</Link>
				</p>
			</form>
		</div>
	);
};

export default Register;
