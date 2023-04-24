import React, { useState, useRef } from "react";
import SendIcon from "@mui/icons-material/Send";
import axios from "axios";
import { useEffect } from "react";
import { Typography } from "@mui/material";
import { uniqBy } from "lodash";
import Contact from "./Contact";
const Chatpage = ({ loggedInUserId }) => {
	const [onlinePeople, setOnlinePeople] = useState({});
	const [wsConnection, setWsConnection] = useState(null);
	const [selectedUserId, setSelectedUserId] = useState(null);
	const [newMessageText, setNewMessageText] = useState("");
	const [offlinePeople, setOfflinePeople] = useState({});
	const [messages, setMessages] = useState([]);
	const divUnderMessages = useRef();
	const token = localStorage.getItem("token");

	useEffect(() => {
		connectToWebSocket();
	}, []);

	const connectToWebSocket = () => {
		const ws = new WebSocket("ws://localhost:4000");
		setWsConnection(ws);
		ws.addEventListener("message", handleMessage);
		ws.addEventListener("close", () => connectToWebSocket());
	};
	const showOnlinePeople = (peopleArray) => {
		const people = {};
		peopleArray.forEach(({ userId, userName }) => {
			people[userId] = userName;
		});
		setOnlinePeople(people);
	};

	const handleMessage = (event) => {
		const messageData = JSON.parse(event.data);

		if ("online" in messageData) {
			showOnlinePeople(messageData.online);
		} else if ("text" in messageData) {
			console.log({ messageData });
			setMessages((prev) => [...prev, { ...messageData }]);
		}
	};

	const onlineUsersExclLoggedInUser = { ...onlinePeople };
	delete onlineUsersExclLoggedInUser[loggedInUserId];

	const sendMessage = (event) => {
		if (newMessageText) {
			event.preventDefault();
			console.log(newMessageText);
			wsConnection.send(
				JSON.stringify({
					recipient: selectedUserId,
					text: newMessageText,
				})
			);
			setNewMessageText("");
			setMessages((prev) => [
				...prev,
				{
					text: newMessageText,
					sender: loggedInUserId,
					recipient: selectedUserId,
					_id: Date.now(),
				},
			]);
		}
	};
	const msgWithoutDups = uniqBy(messages, "_id");

	useEffect(() => {
		const div = divUnderMessages.current;
		if (div) {
			div.scrollIntoView({ behavior: "smooth" });
		}
	}, [messages]);

	useEffect(() => {
		if (selectedUserId) {
			axios.get(
				`http://localhost:4000/api/messages/${selectedUserId}`,
				{
					headers: {
						Authorization: "Bearer " + token,
					},
				}
			).then((response) => {
				const { data } = response;
				setMessages(data);
			});
		}
	}, [selectedUserId]);

	useEffect(() => {
		axios.get("http://localhost:4000/api/people", {
			headers: {
				Authorization: "Bearer " + token,
			},
		}).then((response) => {
			const offlineUsersArray = response.data
				.filter((person) => person._id !== loggedInUserId)
				.filter(
					(person) =>
						!Object.keys(onlinePeople).includes(person._id)
				);
			const offlinePeople = {};
			offlineUsersArray.forEach((person) => {
				offlinePeople[person._id] = person;
			});
			
			setOfflinePeople(offlinePeople);
			console.log(offlinePeople)
		});
	}, [onlinePeople]);

	return (
		<div className="flex gap-3 h-5/6 w-full xl:w-5/6  rounded-2xl p-8 shadow-2xl">
			<div className="bg--white w-3/12 pt-4 px-3 ">
				
				{Object.keys(onlineUsersExclLoggedInUser).map((userId) => (
					<Contact
						key={userId}
						userId={userId}
						userName={onlineUsersExclLoggedInUser[userId]}
						setSelectedUserId={setSelectedUserId}
						selectedUserId={selectedUserId}
						online={true}
					/>
				))}

				{Object.keys(offlinePeople).map((userId) => (
					<Contact
						key={userId}
						userId={userId}
						userName={offlinePeople[userId].username}
						setSelectedUserId={setSelectedUserId}
						selectedUserId={selectedUserId}
						online={false}
					/>
				))}
			</div>

			<div className="flex flex-col bg-[url('https://t4.ftcdn.net/jpg/03/38/75/29/240_F_338752910_Th7euFDcjaI0nWNOBoi0JDSR0zu92WkM.jpg')] w-9/12 rounded-2xl">
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
					<div className="relative h-full">
						<div className="overflow-y-scroll absolute inset-0 m-3 ">
							{msgWithoutDups.map((message) => (
								<div
									key={message._id}
									className={`${
										message.sender ===
										loggedInUserId
											? "text-right"
											: "text-left"
									}`}>
									<div
										className={`inline-block py-3 px-5 m-1 rounded-3xl max-w-sm   whitespace-normal break-words ${
											message.sender ===
											loggedInUserId
												? "bg-blue-500 text-white rounded-tl-3xl rounded-bl-3xl rounded-tr-3xl rounded-br-none "
												: "bg-white rounded-tl-3xl rounded-bl-none rounded-tr-3xl rounded-br-3xl"
										}`}>
										<Typography variant="body1">
											{message.text}
										</Typography>
									</div>
								</div>
							))}
							<div
								className="h-12"
								ref={divUnderMessages}></div>
						</div>
					</div>
				)}
				{!!selectedUserId && (
					<form onSubmit={sendMessage}>
						<div className="flex gap-2 justify-center  bg-stone-400 p-2 rounded-b-2xl">
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
