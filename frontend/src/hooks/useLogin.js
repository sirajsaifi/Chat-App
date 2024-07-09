import { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";

import { useAuthContext } from "../context/AuthContext";

const useLogin = () => {
	const [loading, setLoading] = useState(false);
	const { authUser, setAuthUser } = useAuthContext();

	const login = async (userName, password) => {
		const success = await handleInputErrors(userName, password);
		if (!success) return;
		setLoading(true);
		try {
			const res = await axios.post('/api/v1/auth/login',
				JSON.stringify({ userName, password }),
				{
					headers: { "Content-Type": "application/json" },
				});

			if (res?.data?.status === 'success') {
				toast.success('Successfully logged in!')
			}
			localStorage.setItem("chat-user", JSON.stringify(res.data));
			setAuthUser(res.data)
		} catch (error) {
			if (error.message === 'Request failed with status code 401') {
				toast.error('Incorrect username or password')
			}
			else {
				toast.error(error.message)
			}
		} finally {
			setLoading(false);
		}
	};

	return { loading, login };
};
export default useLogin;

async function handleInputErrors(userName, password) {
	if (!userName || !password) {
		toast.error("Please fill in all fields");
		return false;
	}

	return true;
}
