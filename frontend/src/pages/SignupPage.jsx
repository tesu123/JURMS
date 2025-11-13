import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { OTPInput } from "../components";
const ApiUrl = import.meta.env.VITE_BACKEND_URL;
import { Eye, EyeOff } from "lucide-react";

function SignupPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordErrors, setPasswordErrors] = useState([]);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showOtpInput, setShowOtpInput] = useState(false);

  const validatePassword = (password) => {
    const errors = [];
    if (password.length < 8)
      errors.push("Password must be at least 8 characters long.");
    if (!/[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]/.test(password))
      errors.push("Password must contain at least one special character.");
    if (!/[A-Z]/.test(password))
      errors.push("Password must contain at least one uppercase letter.");
    if (!/[a-z]/.test(password))
      errors.push("Password must contain at least one lowercase letter.");
    if (!/[0-9]/.test(password))
      errors.push("Password must contain at least one digit.");
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errors = validatePassword(password);
    if (errors.length > 0) {
      setPasswordErrors(errors);
      return;
    }

    setPasswordErrors([]);
    setLoading(true);
    setError("");

    axios
      .post(
        `${ApiUrl}/users/register`,
        // `/api/v1/users/register`,
        {
          name: name,
          email: email,
          password: password,
        },
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        setName("");
        setPassword("");
        toast.success("OTP send to your email");
        setShowOtpInput(true);
      })
      .catch((err) => {
        console.log(err);

        if (err.status === 500) {
          setError(err.response.statusText);
        }

        if (err.status === 400) {
          setError("User with this email already exists");
        }
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
      {/* ---------- SIGNUP CARD ---------- */}
      {!showOtpInput && (
        <div className="w-full max-w-md bg-white/70 dark:bg-gray-800/60 backdrop-blur-xl shadow-xl rounded-2xl p-8 border border-white/20 dark:border-gray-700/40 animate-fadeIn">
          {/* Logo */}
          <div className="text-center mb-6">
            <h1 className="text-4xl font-extrabold bg-gradient-to-r from-indigo-600 to-purple-600 text-transparent bg-clip-text">
              JURMS
            </h1>
            <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
              Create your account and get started
            </p>
          </div>

          {/* Signup Form */}
          <form className="space-y-5" onSubmit={handleSubmit}>
            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Full Name
              </label>
              <input
                type="text"
                placeholder="e.g. John Doe"
                className="w-full px-4 py-2.5 rounded-lg bg-white dark:bg-gray-700 
                         border border-gray-300/70 dark:border-gray-600 
                         focus:ring-2 focus:ring-indigo-500 dark:focus:ring-purple-500 
                         focus:outline-none text-gray-900 dark:text-white transition"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Email Address
              </label>
              <input
                type="email"
                placeholder="example@university.edu"
                className="w-full px-4 py-2.5 rounded-lg bg-white dark:bg-gray-700 
                         border border-gray-300/70 dark:border-gray-600 
                         focus:ring-2 focus:ring-indigo-500 dark:focus:ring-purple-500 
                         focus:outline-none text-gray-900 dark:text-white transition"
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
                  placeholder="Create a strong password"
                  className="w-full px-4 py-2.5 pr-10 rounded-lg bg-white dark:bg-gray-700 
                           border border-gray-300/70 dark:border-gray-600 
                           focus:ring-2 focus:ring-indigo-500 dark:focus:ring-purple-500 
                           focus:outline-none text-gray-900 dark:text-white transition"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            {/* Password Errors */}
            {passwordErrors.length > 0 && (
              <ul className="text-red-500 text-sm">
                {passwordErrors.map((err, i) => (
                  <li key={i}>{err}</li>
                ))}
              </ul>
            )}

            {/* General Error */}
            {error && <p className="text-red-500 text-sm">{error}</p>}

            {/* Signup Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 
                       text-white font-semibold hover:shadow-lg hover:scale-[1.02] 
                       transition-all duration-300 disabled:opacity-60"
            >
              {loading ? "Signing Up..." : "Sign Up"}
            </button>
          </form>

          {/* Login Link */}
          <p className="mt-5 text-center text-gray-600 dark:text-gray-300 text-sm">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-semibold text-purple-600 hover:underline"
            >
              Log In
            </Link>
          </p>
        </div>
      )}

      {/* ---------- OTP INPUT COMPONENT ---------- */}
      {showOtpInput && (
        <OTPInput
          email={email}
          context={"signup"}
          verifyOtpApiEndpoint={"verify-otp"}
          resendOtpApiEndpoint={"resend-otp"}
          toast={toast}
        />
      )}
    </div>
  );
}

export default SignupPage;
