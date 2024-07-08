import { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const useResetPassword = () => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const reset = async (password, passwordConfirm, token) => {
        const success = await handleInputErrors(password, passwordConfirm);
        if (!success) return;
        setLoading(true);

        try {
            const res = await axios.patch(
                `/api/v1/auth/resetPassword?token=${token}`,
                JSON.stringify({ password, passwordConfirm }),
                {
                    headers: { "Content-Type": "application/json" },
                }
            );

            if (res?.data?.status === 'success') {
                toast.success('Password changed successfully!');
                setTimeout(() => {
                    toast.success('Login again!')
                    navigate('/login')
                }, 1500)
            }
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    return { loading, reset };
};

export default useResetPassword;

async function handleInputErrors(password, passwordConfirm) {
    if (!password || !passwordConfirm) {
        toast.error("Please fill in all fields");
        return false;
    }

    if (password !== passwordConfirm) {
        toast.error("Passwords are not same");
        return false;
    }

    return true;
}
