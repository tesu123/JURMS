import { useState } from "react";
import eyeOpen from "../assets/eye-line.svg";
import eyeClosed from "../assets/eye-off-line.svg";
import { useNavigate } from "react-router";

import axios from "axios";

const ApiUrl = import.meta.env.VITE_BACKEND_URL;

const ResetPassword = ({ email, toast, setResetPasswordSuccess }) => {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordErrors, setPasswordErrors] = useState([]);
  const [showPassword, setShowPassword] = useState(false);
  const [showEyeIcon, setShowEyeIcon] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

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

  const checkConfirmPassword = (password, confirmPassword) => {
    const errors = [];
    if (password !== confirmPassword) {
      errors.push("Password and confirm password must be same");
    }
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let errors = validatePassword(password);
    if (errors.length > 0) {
      setPasswordErrors(errors);
      return;
    }

    errors = checkConfirmPassword(password, confirmPassword);
    if (errors.length > 0) {
      setPasswordErrors(errors);
      return;
    }

    setPasswordErrors([]);
    setLoading(true);
    setError("");

    axios
      .post(
        `${ApiUrl}/users/reset-password`,
        {
          email: email,
          newpassword: password,
        },
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        toast.success("Password reset successfully");
        setResetPasswordSuccess(true);
      })
      .catch((err) => {
        setError(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-md w-80 max-w-md">
      {/* Title */}
      <h2 className="text-xl font-bold text-center mb-4 text-black dark:text-white">
        Reset Your <span className="text-purple-600">Password</span>
      </h2>

      <form className="space-y-4" onSubmit={handleSubmit}>
        {/* Password Field */}
        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
          >
            Password
          </label>
          <div className="relative w-full">
            <input
              type={showPassword ? "text" : "password"}
              required
              id="password"
              value={password}
              onChange={(e) => {
                e.target.value.length > 0
                  ? setShowEyeIcon(true)
                  : (setShowEyeIcon(false), setShowPassword(false));
                setPassword(e.target.value);
              }}
              placeholder="Enter new password"
              className="w-full px-4 py-2 pr-10 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
            <img
              id="eye"
              src={showPassword ? eyeOpen : eyeClosed}
              className={`absolute w-5 h-5 top-3 right-3 cursor-pointer ${
                showEyeIcon ? "block" : "hidden"
              }`}
              onClick={togglePassword}
            />
          </div>
        </div>

        {/* Confirm Password */}
        <div>
          <label
            htmlFor="confirm-password"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
          >
            Confirm Password
          </label>
          <input
            type="password"
            required
            id="confirm-password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Re-enter new password"
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-400"
          />
        </div>

        {/* Errors */}
        {passwordErrors.length > 0 && (
          <ul className="text-red-500 text-sm">
            {passwordErrors.map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </ul>
        )}
        {error && <p className="text-red-500 text-sm">{error}</p>}

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-md transition cursor-pointer"
          disabled={loading}
        >
          {loading ? "Changing..." : "Change Password"}
        </button>
      </form>
    </div>
  );
};

export default ResetPassword;
