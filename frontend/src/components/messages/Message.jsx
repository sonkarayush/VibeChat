import { useEffect, useState } from "react";
import { useAuthContext } from "../../context/AuthContext";
import { extractTime } from "../../utils/extractTime";
import useConversation from "../../zustand/useConversation";

const Message = ({ message }) => {
	const { authUser } = useAuthContext();
	const { selectedConversation } = useConversation();
	const [imgError, setImgError] = useState(false);
	const [imgLoaded, setImgLoaded] = useState(false);
	const fromMe = message.senderId === authUser._id;
	const formattedTime = extractTime(message.createdAt);
	const chatClassName = fromMe ? "chat-end" : "chat-start";
	const profilePic = fromMe ? authUser.profilePic : selectedConversation?.profilePic;
	const displayName = fromMe ? authUser.fullName : selectedConversation?.fullName;

	useEffect(() => {
		setImgError(false);
		setImgLoaded(false);
	}, [profilePic]);
	const initials = displayName?.trim().charAt(0).toUpperCase() || "?";
	const bubbleBgColor = fromMe ? "bg-blue-500" : "";

	const shakeClass = message.shouldShake ? "shake" : "";

	return (
		<div className={`chat ${chatClassName}`}>
			<div className='chat-image avatar'>
				<div className='w-10 h-10 rounded-full overflow-hidden bg-sky-600'>
					{!imgError && profilePic && imgLoaded ? (
						<img
							alt='Tailwind CSS chat bubble component'
							src={profilePic}
							loading='lazy'
							decoding='async'
							fetchPriority='low'
							onLoad={() => setImgLoaded(true)}
							onError={() => setImgError(true)}
							className='w-10 h-10 object-cover'
						/>
					) : (
						<div className='w-10 h-10 rounded-full bg-sky-600 text-white flex items-center justify-center text-sm font-semibold'>
							{initials}
						</div>
					)}
				</div>
			</div>
			<div className={`chat-bubble text-white ${bubbleBgColor} ${shakeClass} pb-2`}>{message.message}</div>
			<div className='chat-footer opacity-50 text-xs flex gap-1 items-center'>{formattedTime}</div>
		</div>
	);
};
export default Message;
