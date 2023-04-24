import axios from "axios";
import React, { useState } from "react";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useCookies } from 'react-cookie';

import Chatpage from "./components/Chatpage";
import Navbar from "./components/Navbar";
const Home = () => {
	const [username, setUsername] = useState("");
	const [userId , setUserId] = useState("");
  const [cookies, setCookie] = useCookies(['token']);

  const navigate = useNavigate();

	const populateDashboard = async () => {
		const token = localStorage.getItem("token");
		const data = await axios.get(
			"http://localhost:4000/api/protectedroute",
			{
				headers: {
					Authorization: "Bearer " + token,
				},
			}
		);
		// console.log(data);

	};

	const logout = () => {
		alert("Are you sure you want to log out");
		localStorage.removeItem("token");
		navigate("/login");
	};

	useEffect(() => {
		const token = localStorage.getItem("token");
		if (token) {
			try {
				const user = jwt_decode(token);
				
				if (!user) {
					localStorage.removeItem("token");
					navigate("/login");
					
				} else {
					populateDashboard();
					setUsername(user.username);
					setUserId(user.id)
					// alert("Token found in local storage");
			
				}
				
			} catch (error) {
				console.log(error);
				alert("Wrong Token")
				localStorage.removeItem('token');	
				navigate('/login')
			}
		} else {

			navigate("/login");

		}
	}, []);

	return (
		<>
			<Navbar username={username}/>	
			<div className="h-screen flex flex-col items-center justify-center " >
				<Chatpage loggedInUserId={userId}/>
			
			</div>
		</>
     
	);
};

export default Home;
