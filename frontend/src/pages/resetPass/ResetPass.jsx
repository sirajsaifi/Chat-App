import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import useResetPassword from "../../hooks/useResetPass";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [token, setToken] = useState("");
  const { loading, reset } = useResetPassword();
  const location = useLocation();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const token = queryParams.get("token");
    if (token) {
      setToken(token);
    }
  }, [location]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await reset(password, passwordConfirm, token);
  };

  return (
    <div className="flex flex-col items-center justify-center min-w-96 mx-auto">
      <div className="h-full w-full bg-white-400 rounded-2xl bg-clip-padding backdrop-filter backdrop-blur-xl bg-opacity-30 border border-gray-100 p-5">
        <h1 className="text-3xl font-semibold text-center text-gray-300">
          Reset
          <span className="text-blue-500"> ChatApp</span>
        </h1>

        <form onSubmit={handleSubmit}>
          <div>
            <label className="label pb-0">
              <span className="text-base label-text text-gray-50">
                Password
              </span>
            </label>
            <input
              type="password"
              placeholder="Enter Password"
              className="input input-bordered input-info w-full h-8"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div>
            <label className="label pb-0">
              <span className="text-base label-text text-gray-50">
                Confirm Password
              </span>
            </label>
            <input
              type="password"
              placeholder="Confirm Password"
              className="input input-bordered input-info w-full h-8"
              value={passwordConfirm}
              onChange={(e) => setPasswordConfirm(e.target.value)}
            />
          </div>

          <div className="text-center py-3">
            <button
              className="btn min-h-0 h-8 btn-outline btn-info"
              disabled={loading}
            >
              {loading ? (
                <span className="loading loading-spinner"></span>
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

export default ResetPassword;
