import { useState, useRef, useEffect } from "react";
import { useDispatch } from "react-redux";
import { login, logout } from "../features/auth/authSlice";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ApiUrl = import.meta.env.VITE_BACKEND_URL;

const OtpLength = 6;

const OTPInput = ({
  email,
  context,
  verifyOtpApiEndpoint,
  resendOtpApiEndpoint,
  setShowResetPassword = null,
  toast,
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const refArr = useRef([]);
  const [OTP, setOTP] = useState(new Array(OtpLength).fill(""));
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const [secondsLeft, setSecondsLeft] = useState(15);
  const [showResendOTPText, setShowResendOTPText] = useState(false);

  const handleOnChange = (value, index) => {
    if (isNaN(value)) return;

    const newArr = [...OTP];
    newArr[index] = value.trim().slice(-1);
    setOTP(newArr);
    value.trim() && refArr.current[index + 1]?.focus();
  };

  const handleOnKeyDown = (e, index) => {
    if (!e.target.value && e.key === "Backspace") {
      refArr.current[index - 1]?.focus();
    }
  };

  useEffect(() => {
    refArr.current[0]?.focus();
  }, []);

  useEffect(() => {
    // Countdown timer logic
    if (secondsLeft === 0) {
      setShowResendOTPText(true);
      return;
    }

    const timer = setInterval(() => {
      setSecondsLeft((prev) => prev - 1);
    }, 1000);

    // Cleanup
    return () => clearInterval(timer);
  }, [secondsLeft, setSecondsLeft]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (OTP.includes("")) {
      setError("Please enter all digits of the OTP.");
      return;
    }

    setLoading(true);
    setError("");

    const fullOTP = OTP.join("");

    axios
      .post(
        `${ApiUrl}/users/${verifyOtpApiEndpoint}`.replace(/([^:]\/)\/+/g, "$1"),
        {
          email: email,
          otp: fullOTP,
        },
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        if (context === "signup") {
          toast.success("OTP verified");
          toast.success("Account created successfully");
          setTimeout(() => {
            dispatch(logout());
            dispatch(login(res.data.data.user));
            navigate("/dashboard");
          }, 2000);
        }
        if (context === "forgot-password") {
          toast.success("OTP verified successfully");
          setShowResetPassword(true);
        }
      })
      .catch((err) => {
        console.log(err);
        // setError(err.response.data.message);
        setError(err.response?.data?.message || "Something went wrong");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleResendOTP = (async) => {
    setError("");
    setSecondsLeft(15);
    setShowResendOTPText(false);

    axios
      .post(
        `${ApiUrl}/users/${resendOtpApiEndpoint}`,
        {
          email: email,
        },
        {
          withCredentials: true,
        }
      )
      .then(() => {
        toast.success("OTP resend to your email");
      });
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-md w-80 max-w-md">
      {/* Title */}
      <h2 className="text-xl font-bold text-center mb-4 text-black dark:text-white">
        Validate Your <span className="text-purple-600">OTP</span>
      </h2>

      <p className="text-center text-gray-600 dark:text-gray-300">
        Please enter the OTP sent to
      </p>
      <p className="text-center text-sm text-gray-800 dark:text-gray-200">
        {email}
      </p>

      {/* OTP Input Form */}
      <form onSubmit={handleSubmit} className="mt-4 space-y-4">
        <div className="w-full flex items-center justify-center gap-2">
          {OTP.map((item, index) => (
            <input
              key={index}
              type="number"
              ref={(input) => (refArr.current[index] = input)}
              value={OTP[index]}
              onChange={(e) => handleOnChange(e.target.value, index)}
              onKeyDown={(e) => handleOnKeyDown(e, index)}
              className="h-10 w-10 text-center text-lg rounded-md border border-gray-300 dark:border-gray-600 
                       bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                       focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
          ))}
        </div>

        {/* Error Message */}
        {error && <p className="text-red-500 text-sm text-center">{error}</p>}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full py-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-md transition cursor-pointer"
        >
          {loading ? "Verifying..." : "Verify"}
        </button>
      </form>

      {/* Resend OTP Section */}
      <p className="mt-4 text-center text-gray-700 dark:text-gray-300">
        Not received your code?{" "}
        {showResendOTPText ? (
          <span
            onClick={handleResendOTP}
            className="font-bold text-purple-500 hover:text-purple-600 cursor-pointer"
          >
            Resend Code
          </span>
        ) : (
          <span className="font-semibold">
            00:{secondsLeft > 9 ? secondsLeft : `0${secondsLeft}`}
          </span>
        )}
      </p>
    </div>
  );
};

export default OTPInput;
