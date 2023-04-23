import React from "react";
import AvatarComponent from "./Avatar";
import { Typography } from "@mui/material";

const Contact = ({userId ,userName, setSelectedUserId, selectedUserId, online}) => {
	return (
		<div>
			<div
				key={userId}
				className={`border-b border-gray-200 py-2 pl-4 my-2 flex  items-center gap-3  rounded-lg cursor-pointer transition-all duration-300 ${
					userId === selectedUserId ? "bg-gray-300" : ""
				}`}
				onClick={() => setSelectedUserId(userId)}>
				<AvatarComponent
					userId={userId}
					userName={userName}
					online={online}
				/>
				<Typography
					variant="body1"
					sx={{ textTransform: "capitalize" }}>
					{userName}
				</Typography>
			</div>
		</div>
	);
};

export default Contact;
