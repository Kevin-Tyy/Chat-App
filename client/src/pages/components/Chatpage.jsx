import React, { useState } from "react";
import SendIcon from '@mui/icons-material/Send';
import { useEffect } from "react";

const Chatpage = () => {
    const [wsConnection, setWsConnection] = useState(null)
    useEffect(()=>{
        const ws = new WebSocket('ws://localhost:4000');
        setWsConnection(ws)
        ws.addEventListener('message', handleMessage)
    }, [])

    const handleMessage = (e) => {
        console.log('new message received', e)
    }

	return (
		<div className="flex h-screen">
			<div className="bg-sky-200 w-1/3 ">Contacts</div>
			<div className="flex flex-col bg-sky-100 w-2/3 p-2">
				<div className="flex-grow">Messages with selected person</div>
				<div className="flex gap-2">
					<input
						type="text"
						className="bg-white border p-2 rounded-md w-full max-w-md"
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
