import axios from "axios";
import toast from "react-hot-toast";
import { useState } from "react";


const useForgotPassword = () => {
    const [loading, setLoading] = useState(false)

    const forgotPassword = async (email) => {
        const success = await handleInputErrors(email);
        if (!success) return;
        setLoading(true);
        try {
            const res = await axios.post('/api/v1/auth/forgotPassword',
                JSON.stringify({ email }),
                {
                    headers: { "Content-Type": "application/json" },
                });
            // console.log(res)
            if (res?.data?.status === 'success') {
                toast.success('Reset Password sent to your email account.')
            }
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    }

    return { loading, forgotPassword }
}

export default useForgotPassword

async function handleInputErrors(email) {
    if (!email) {
        toast.error("Please fill the field.");
        return false;
    }

    return true;
}