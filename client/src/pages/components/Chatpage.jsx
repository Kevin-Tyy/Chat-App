import React, { useState } from "react";
import SendIcon from "@mui/icons-material/Send";
import { useEffect } from "react";
import AvatarComponent from "./Avatar";
import { Typography } from "@mui/material";
import Logo from "./logo";

const Chatpage = ({ loggedInUserId }) => {
	const [onlinePeople, setOnlinePeople] = useState({});
	const [wsConnection, setWsConnection] = useState(null);
	const [selectedUserId, setSelectedUserId] = useState(null);
	const [newMessageText, setNewMessageText] = useState("");
	const [messages , setMessages] = useState([]) 

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
		console.log({ event: event, message: messageData})
		if ('online' in messageData) {
			showOnlinePeople(messageData.online);
			
		}else{
			console.log({messageData});
			setMessages(prev => ([...prev, {isMyMessage : false, text: messageData.text}]))

		}
		
	};

	const onlineUsersExclLoggedInUser = { ...onlinePeople };
	delete onlineUsersExclLoggedInUser[loggedInUserId];

	const sendMessage = (event) => {
		event.preventDefault();
		wsConnection.send(
			JSON.stringify({
					recipient: selectedUserId,
					text: newMessageText,
				},
			)
		);
		setNewMessageText('')
		setMessages(prev => ([...prev, {text : newMessageText , isMyMessage: true}]))
	};

	return (
		<div className="flex gap-3 h-5/6 w-full xl:w-5/6  rounded-2xl p-8 shadow-2xl">
			<div className="bg--white w-3/12 pt-4 px-3 ">
				<Logo />
				{Object.keys(onlineUsersExclLoggedInUser).map((userId) => (
					<div
						key={userId}
						className={`border-b border-gray-200 py-2 pl-4 my-2 flex  items-center gap-3  rounded-lg cursor-pointer transition-all duration-300 ${
							userId === selectedUserId
								? "bg-gray-100"
								: ""
						}`}
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
			<div className="flex flex-col bg-gray-100 w-9/12 p-2 rounded-2xl">
				<div className="flex-grow ">
					{!selectedUserId && (
						<div className="flex h-full items-center justify-center">
							<Typography className="text-gray-500 font-bold ">
								Select a Chat
							</Typography>
						</div>
					)}
				</div>
				{!!selectedUserId && (
					<div>
						{messages.map( message => (
							<div>
								{message.text}
							</div>	
						))}


					</div>
		
				)}
				{!!selectedUserId && (
					<form onSubmit={sendMessage}>
						<div className="flex  gap-2 justify-center">
							<input
								type="text"
								value={newMessageText}
								onChange={(e) =>
									setNewMessageText(e.target.value)
								}
								className="bg-white border p-2 rounded-md w-full max-w-md"
								placeholder="Type your message"
							/>
							<button
								type="submit"
								className="bg-blue-600 px-3 rounded-md">
								<SendIcon sx={{ color: "#fff" }} />
							</button>
						</div>
					</form>
				)}
			</div>
		</div>
	);
};

export default Chatpage;
