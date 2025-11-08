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
        // `${ApiUrl}/users/register`,
        `/api/v1/users/register`,
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
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
      {/* <Toaster position="top-right" /> */}
      {!showOtpInput && (
        <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-md w-80 max-w-md">
          {/* Title */}
          <h1 className="text-2xl font-bold text-center mb-6">
            <h1 className="text-2xl md:text-3xl font-bold text-purple-600">
              Monetrix
            </h1>
          </h1>

          {/* Form */}
          <form className="space-y-4" onSubmit={handleSubmit}>
            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Name
              </label>
              <input
                type="text"
                placeholder="Enter your name"
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-400"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
            </div>

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

            {/* Password */}
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

            {passwordErrors.length > 0 && (
              <ul className="text-red-500 text-sm">
                {passwordErrors.map((error, index) => (
                  <li key={index}>{error}</li>
                ))}
              </ul>
            )}
            {error && <p className="text-red-500 text-sm">{error}</p>}

            {/* Signup Button */}
            <button
              type="submit"
              className="w-full py-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-md transition cursor-pointer"
              disabled={loading}
            >
              {loading ? "Signing Up..." : "Sign Up"}
            </button>
          </form>

          {/* Login Link */}
          <p className="mt-4 text-center text-gray-600 dark:text-gray-300 text-sm">
            Already have an account?{" "}
            <Link to="/login" className="text-purple-600 hover:underline">
              Log In
            </Link>
          </p>
        </div>
      )}
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
