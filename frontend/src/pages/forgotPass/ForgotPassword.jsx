import { useState } from "react";
import { Link } from "react-router-dom";
import useForgotPassword from "../../hooks/useForgotPassword";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const { loading, forgotPassword } = useForgotPassword();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await forgotPassword(email);
  };

  return (
    <div className="flex flex-col items-center justify-center min-w-96 mx-auto">
      <div className="h-full w-full bg-white-400 rounded-2xl bg-clip-padding backdrop-filter backdrop-blur-xl bg-opacity-30 border border-gray-100 p-5">
        <h1 className="text-3xl font-semibold text-center text-gray-300">
          Forgot
          <span className="text-blue-500"> Password</span>
        </h1>

        <form onSubmit={handleSubmit}>
          <div>
            <label className="label pb-0">
              <span className="text-base label-text text-gray-50">Email</span>
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              className="input input-bordered input-info w-full h-8"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="text-center py-3">
            <button
              className="btn min-h-0 h-8 btn-outline btn-info"
              disabled={loading}
            >
              {loading ? (
                <span className="loading loading-spinner "></span>
              ) : (
                "Submit"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
