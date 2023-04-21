import axios from "axios";
import React, { useState } from "react";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useCookies } from 'react-cookie';

import Chatpage from "./components/Chatpage";
const Home = () => {
	const [username, setUsername] = useState("");
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
		console.log(data);
    	setCookie('token', token , { path: '/' });

	};

	const logout = () => {
		alert("Are you sure you want to log out");
		localStorage.removeItem("token");
		navigate("/login");
	};

	useEffect(() => {
		const token = localStorage.getItem("token");
		if (token) {
			const user = jwt_decode(token);
			setUsername(user.username);

			if (!user) {
				localStorage.removeItem("token");
				navigate("/login");
				
			} else {
				populateDashboard();
				// alert("Token found in local storage");
        
			}
		} else {

			navigate("/login");

		}
	}, []);

	return (

    <Chatpage/>
     
	);
};

export default Home;
