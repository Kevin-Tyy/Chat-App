import React, { useState } from "react";
import SendIcon from "@mui/icons-material/Send";
import { useEffect } from "react";
import AvatarComponent from "./Avatar";
import { Typography } from "@mui/material";
import Logo from "./logo";


const Chatpage = ({loggedInUser}) => {
	const [onlinePeople, setOnlinePeople] = useState({});
	const [wsConnection, setWsConnection] = useState(null);
	const [selectedUserId, setSelectedUserId] = useState(null);

	useEffect(() => {
		const ws = new WebSocket("ws://localhost:4000");
		setWsConnection(ws);
		ws.addEventListener("message", handleMessage);
	}, []);

	const showOnlinePeople = (peopleArray) => {
		const people = {};
		peopleArray.forEach(({ userId, userName }) => {
			people[userId] = userName;
		});
		setOnlinePeople(people);
	};


	const handleMessage = (event) => {
		const messageData = JSON.parse(event.data);
		if (messageData.online) {
			showOnlinePeople(messageData.online);
		}
	};
	console.log(loggedInUser);
	// const onlineUsersExclLoggedInUser = onlinePeople.filter()  
	return (
		<div className="flex h-screen">
			<div className="bg--white w-1/5 pt-4 px-3">
				<Logo/>
				{Object.keys(onlinePeople).map((userId) => (
					<div
						key={userId}
						className={`border-b border-gray-100 py-2 pl-4 flex  items-center gap-3  rounded-2xl cursor-pointer transition-all duration-300 ${userId === selectedUserId ? 'bg-blue-50' : ''}`}
						onClick={() => setSelectedUserId(userId)}>
						<AvatarComponent
							userId={userId}
							userName={onlinePeople[userId]}
						/>
						<Typography
							variant="body1"
							sx={{ textTransform: "capitalize" }}>
							{onlinePeople[userId]}
						</Typography>
					</div>
				))}
			</div>
			<div className="flex flex-col bg-sky-50 w-4/5 p-2 ">
				<div className="flex-grow">
					Messages with selected person
				</div>
				<div className="flex gap-2">
					<input
						type="text"
						className="bg-white border p-2 rounded-md w-full max-w-md"
						placeholder="Type your message"
					/>
					<button className="bg-blue-600 px-3 rounded-md">
						<SendIcon sx={{ color: "#fff" }} />
					</button>
				</div>
			</div>
		</div>
	);
};

export default Chatpage;
