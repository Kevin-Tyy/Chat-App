import React from "react";
import SendIcon from '@mui/icons-material/Send';
const Chatpage = () => {
	return (
		<div className="flex h-screen">
			<div className="bg-sky-400 w-1/3 ">Contacts</div>
			<div className="bg-sky-300 w-2/3 ">
				<div>Messages with selected person</div>
				<div className="flex gap-2">
					<input
						type="text"
						className="bg-white border p-2"
						placeholder="Type your message"
					/>
                    <button className="bg-blue-600 px-3 rounded-md">
                        <SendIcon sx={{ color : '#fff'}}/>
                    </button>
				</div>
			</div>
		</div>
	);
};

export default Chatpage;
