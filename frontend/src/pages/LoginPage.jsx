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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-purple-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-all duration-500 px-4">
      {/* ---------- LOGIN CARD ---------- */}
      {(!showForgotPassword || resetPasswordSuccess) && (
        <div className="w-full max-w-md bg-white/70 dark:bg-gray-800/60 backdrop-blur-xl shadow-xl rounded-2xl p-8 border border-white/20 dark:border-gray-700/40 animate-fadeIn">
          {/* Logo */}
          <div className="text-center mb-6">
            <h1 className="text-4xl font-extrabold bg-gradient-to-r from-indigo-600 to-purple-600 text-transparent bg-clip-text">
              JURMS
            </h1>
            <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
              Welcome back! Log in to continue
            </p>
          </div>

          {/* Login Form */}
          <form className="space-y-5" onSubmit={handleSubmit}>
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Email Address
              </label>
              <input
                type="email"
                placeholder="example@university.edu"
                className="w-full px-4 py-2.5 rounded-lg bg-white dark:bg-gray-700 border border-gray-300/70 dark:border-gray-600 focus:ring-2 focus:ring-indigo-500 dark:focus:ring-purple-500 focus:outline-none text-gray-900 dark:text-white transition"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Password
              </label>
              <div className="relative">
                {showPassword ? (
                  <EyeOff
                    className="w-5 absolute top-3 right-3 text-gray-600 dark:text-gray-300 cursor-pointer"
                    onClick={toggleShowPassword}
                  />
                ) : (
                  <Eye
                    className="w-5 absolute top-3 right-3 text-gray-600 dark:text-gray-300 cursor-pointer"
                    onClick={toggleShowPassword}
                  />
                )}
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="w-full px-4 py-2.5 pr-10 rounded-lg bg-white dark:bg-gray-700 border border-gray-300/70 dark:border-gray-600 focus:ring-2 focus:ring-indigo-500 dark:focus:ring-purple-500 focus:outline-none text-gray-900 dark:text-white transition"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            {/* Forgot Password */}
            <div className="text-right">
              <span
                className="text-sm cursor-pointer text-indigo-600 dark:text-indigo-400 hover:underline"
                onClick={() => setShowForgotPassword(true)}
              >
                Forgot Password?
              </span>
            </div>

            {/* Error Message */}
            {error && <p className="text-red-500 text-sm">{error}</p>}

            {/* Login Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold hover:shadow-lg hover:scale-[1.02] transition-all duration-300 disabled:opacity-60"
            >
              {loading ? "Logging in..." : "Log In"}
            </button>
          </form>

          {/* Signup Link */}
          <p className="mt-5 text-center text-gray-600 dark:text-gray-300 text-sm">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="font-semibold text-purple-600 hover:underline"
            >
              Sign Up
            </Link>
          </p>
        </div>
      )}

      {/* ---------- FORGOT PASSWORD FLOW ---------- */}
      {showForgotPassword && !success && (
        <ForgotPassword
          setSuccess={setSuccess}
          setResetPasswordEmail={setResetPasswordEmail}
        />
      )}

      {/* ---------- OTP INPUT ---------- */}
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

      {/* ---------- RESET PASSWORD ---------- */}
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
