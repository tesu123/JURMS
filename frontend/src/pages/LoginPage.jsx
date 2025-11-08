import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { login } from "../features/auth/authSlice.js";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import OTPInput from "../components/OTPInput.jsx";
import { ForgotPassword } from "../components";
import toast from "react-hot-toast";
import { ResetPassword } from "../components";
const ApiUrl = import.meta.env.VITE_BACKEND_URL;

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [success, setSuccess] = useState(false);
  const [resetPasswordEmail, setResetPasswordEmail] = useState("");
  const [showResetPassword, setShowResetPassword] = useState(false);
  const [resetPasswordSuccess, setResetPasswordSuccess] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    axios
      .post(
        `${ApiUrl}/users/login`,
        // `/api/v1/users/login`,
        { email: email, password: password },
        { withCredentials: true }
      )
      .then((res) => {
        // console.log(res);
        toast.success("Successfully logged in");
        dispatch(login(res.data.data.user));
        setEmail("");
        setPassword("");

        navigate("/dashboard");
      })
      .catch(() => {
        setError("Error while logging in");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const toggleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
      {/* <Toaster position="top-right" /> */}
      {(!showForgotPassword || resetPasswordSuccess) && (
        <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-md w-80 max-w-md">
          {/* Title */}
          <h1 className="text-2xl font-bold text-center mb-6">
            <h1 className="text-2xl md:text-3xl font-bold text-purple-600">
              Monetrix
            </h1>
          </h1>

          {/* Form */}
          <form className="space-y-4" onSubmit={handleSubmit}>
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Email
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-400"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Password
              </label>
              <div className="relative">
                {showPassword ? (
                  <EyeOff
                    className="w-5 absolute top-3 right-3 text-black dark:text-white cursor-pointer"
                    onClick={toggleShowPassword}
                  />
                ) : (
                  <Eye
                    className="w-5 absolute top-3 right-3 text-black dark:text-white cursor-pointer"
                    onClick={toggleShowPassword}
                  />
                )}

                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  className="w-full pl-4 pr-10 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-400"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
              </div>
            </div>
            <div className="w-full flex items-end justify-end text-black dark:text-white">
              <span
                className="cursor-pointer hover:text-purple-500"
                onClick={() => {
                  setShowForgotPassword(true);
                }}
              >
                Forgot Password?
              </span>
            </div>

            {error ? <p className="text-red-500">{error}</p> : ""}
            {/* Login Button */}
            <button
              type="submit"
              className="w-full py-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-md transition cursor-pointer"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Log In"}
            </button>
          </form>

          {/* Signup Link */}
          <p className="mt-4 text-center text-gray-600 dark:text-gray-300 text-sm">
            Don’t have an account?{" "}
            <Link to="/signup" className="text-purple-600 hover:underline">
              Sign Up
            </Link>
          </p>
        </div>
      )}
      {showForgotPassword && !success && (
        <ForgotPassword
          setSuccess={setSuccess}
          setResetPasswordEmail={setResetPasswordEmail}
        />
      )}
      {success && !showResetPassword && (
        <OTPInput
          email={resetPasswordEmail}
          context={"forgot-password"}
          verifyOtpApiEndpoint={"/verify-forgot-password-otp"}
          resendOtpApiEndpoint={"/resend-forgot-password-otp"}
          setShowResetPassword={setShowResetPassword}
          toast={toast}
        />
      )}
      {showResetPassword && !resetPasswordSuccess && (
        <ResetPassword
          email={resetPasswordEmail}
          toast={toast}
          setResetPasswordSuccess={setResetPasswordSuccess}
        />
      )}
    </div>
  );
}

export default LoginPage;
