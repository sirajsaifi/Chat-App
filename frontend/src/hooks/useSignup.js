import { useState } from "react";
import toast from "react-hot-toast";
import validator from "validator"
import axios from "axios";
import { useAuthContext } from "../context/AuthContext";

const useSignup = () => {
	// the below line is to show the loading icon in signup button which runs after submitting data
	const [loading, setLoading] = useState(false);
	const { setAuthUser } = useAuthContext();

	const signup = async ({ name, userName, email, password, passwordConfirm, gender }) => {
		const success = await handleInputErrors({ name, userName, email, password, passwordConfirm, gender });
		if (!success) return;

		setLoading(true)
		try {
			const res = await axios.post("/api/v1/auth/signup",
				JSON.stringify({ name, userName, email, password, passwordConfirm, gender }),
				{
					headers: { "Content-Type": "application/json" },
					withCredentials: true
				});

			if (res?.data?.status === 'success') {
				toast.success('Successfully signed in!')
			}

			localStorage.setItem("chat-user", JSON.stringify(res.data))
			setAuthUser(res.data);

		} catch (error) {
			if (error.message === 'Request failed with status code 409') {
				toast.error('User with this username or email already exist')
			}
			else {
				toast.error(error.message)
			}
		} finally {
			setLoading(false);
		}
	};

	return { loading, signup };
};
export default useSignup;

async function handleInputErrors({ name, userName, email, password, passwordConfirm, gender }) {
	if (!name || !userName || !email || !password || !passwordConfirm || !gender) {
		toast.error("Please fill in all fields");
		return false;
	}

	if (password !== passwordConfirm) {
		toast.error("Passwords do not match");
		return false;
	}

	if (password.length < 8) {
		toast.error("Password must be at least 8 characters");
		return false;
	}

	if (name.length > 15) {
		toast.error("Name must not exceed 15 characters");
		return false;
	}

	if (userName.length > 15) {
		toast.error("Username must not exceed 15 characters")
		return false;
	}

	if (!validator.isEmail(email)) {
		toast.error('Please enter a valid email.')
		return false
	}

	return true;

}
