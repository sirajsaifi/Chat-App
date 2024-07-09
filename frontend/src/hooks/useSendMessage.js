import { useState } from "react";
import useConversation from "../zustand/useConversation";
import toast from "react-hot-toast";
import axios from 'axios'

const useSendMessage = () => {
	const [loading, setLoading] = useState(false);
	const { messages, setMessages, selectedConversation } = useConversation();

	const sendMessage = async (message) => {
		setLoading(true);
		try {
			const res = await axios.post(`/api/v1/messages/${selectedConversation._id}`, JSON.stringify({ message }), {
				headers: {
					"Content-Type": "application/json",
				}
			});

			setMessages([...messages, res.data]);
		} catch (error) {
			toast.error(error.message);
		} finally {
			setLoading(false);
		}
	};

	return { sendMessage, loading };
};
export default useSendMessage;
