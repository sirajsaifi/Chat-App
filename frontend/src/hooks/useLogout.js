import { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";

import { useAuthContext } from "../context/AuthContext";

const useLogout = () => {
	const [loading, setLoading] = useState(false);
	const { setAuthUser } = useAuthContext();

	const logout = async () => {
		setLoading(true);
		try {
			const res = await axios.get('/api/v1/auth/logout',
				{
					headers: { "Content-Type": "application/json" },
				}
			)

			localStorage.removeItem("chat-user")
			setAuthUser(null);
			toast.success("Successfully logged out!")
		} catch (error) {
			toast.error(error.message);
		} finally {
			setLoading(false);
		}
	};

	return { loading, logout };
};
export default useLogout;
