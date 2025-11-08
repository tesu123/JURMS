import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
const ApiUrl = import.meta.env.VITE_BACKEND_URL;

function ForgotPassword({ setSuccess, setResetPasswordEmail }) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    axios
      .post(
        `${ApiUrl}/users/forgot-password`,
        { email },
        { withCredentials: true }
      )
      .then(() => {
        setSuccess(true);
        setResetPasswordEmail(email);
        toast.success("OTP sent successfully");
      })
      .catch(() => {
        setSuccess(false);
        toast.error("User not found");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-md w-80 max-w-md">
      {/* Title */}
      <h2 className="text-xl font-bold text-center mb-4 text-black dark:text-white">
        Enter Your <span className="text-purple-600">Email</span>
      </h2>

      {/* Email Input Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Email
          </label>
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-400"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <button
          type="submit"
          className="w-full py-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-md transition cursor-pointer"
          disabled={loading}
        >
          {loading ? "Continuing..." : "Continue"}
        </button>
      </form>
    </div>
  );
}

export default ForgotPassword;
