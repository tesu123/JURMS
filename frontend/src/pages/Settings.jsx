import { useState } from "react";
import { useSelector } from "react-redux";
import { Pencil, X } from "lucide-react";
import toast from "react-hot-toast";
import axios from "axios";
import { Eye, EyeOff } from "lucide-react";

const ApiUrl = import.meta.env.VITE_BACKEND_URL;

const Settings = () => {
  const [name, setName] = useState({ name: " " });
  const [passwords, setPasswords] = useState({
    current: "",
    newPass: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setNewShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [isEditingPassword, setIsEditingPassword] = useState(false);

  const user = useSelector((state) => state.auth.user);

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await axios.post(
        `${ApiUrl}/users/update-details`,
        {
          name: name || user?.name, // fallback to old name
          email: user?.email,
        },
        { withCredentials: true }
      );

      toast.success("Profile updated successfully");
      setIsEditingProfile(false);
    } catch (err) {
      console.log(err);
      if (err.response?.status === 500) {
        setError(err.response.statusText);
      } else if (err.response?.status === 400) {
        setError("User with this email already exists");
      } else {
        setError("Something went wrong");
      }
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordChange = (e) => {
    setPasswords({ ...passwords, [e.target.name]: e.target.value });
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!passwords.current || !passwords.newPass) {
      toast.error("Both fields are required");
      return;
    }

    try {
      const res = await axios.post(
        `${ApiUrl}/users/update-password`,
        {
          password: passwords.current,
          newpassword: passwords.newPass,
          email: user?.email,
        },
        { withCredentials: true }
      );

      toast.success(res.data.message || "Password updated successfully");

      setPasswords({ current: "", newPass: "" });
      setIsEditingPassword(false);
    } catch (err) {
      console.error("Password update error:", err);
      toast.error(err.response?.data?.message || "Failed to update password");
    } finally {
      setLoading(false);
    }
  };

  const toggleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const toggleShowNewPassword = () => {
    setNewShowPassword((prev) => !prev);
  };

  return (
    <div className="p-1">
      {/* <Toaster position="top-right" /> */}
      <h2 className="text-3xl font-bold mb-6">Settings</h2>

      <div className="bg-gray-100 dark:bg-gray-800 p-8 rounded-lg max-w-2xl mx-auto space-y-8">
        {/* Profile Settings */}
        <div className="relative">
          <h3 className="text-xl font-semibold mb-4 text-purple-600 dark:text-purple-300 border-b border-gray-300 dark:border-gray-700 pb-2">
            Profile
          </h3>

          {isEditingProfile ? (
            <button
              type="button"
              onClick={() => {
                setIsEditingProfile(false);
                setName({ name: "" });
              }}
              className="absolute top-0 right-0 text-red-500 hover:text-red-700 cursor-pointer"
            >
              <X size={20} />
            </button>
          ) : (
            <button
              type="button"
              onClick={() => setIsEditingProfile(true)}
              className="absolute top-0 right-0 text-purple-500 hover:text-purple-700 cursor-pointer"
            >
              <Pencil size={20} />
            </button>
          )}

          <form onSubmit={handleProfileSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="name"
                className="block text-gray-700 dark:text-gray-400 mb-2"
              >
                Name
              </label>
              <input
                type="text"
                name="name"
                onChange={(e) => setName(e.target.value)}
                placeholder={user?.name || "Enter your name"}
                disabled={!isEditingProfile}
                className={`w-full bg-gray-200 dark:bg-gray-700 p-2 rounded-lg border 
                  ${
                    isEditingProfile
                      ? "focus:ring-2 focus:ring-purple-500"
                      : "opacity-70 cursor-not-allowed"
                  }`}
              />
            </div>

            <div className="relative group">
              <label
                htmlFor="email"
                className="block text-gray-700 dark:text-gray-400 mb-2"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                value={user?.email}
                disabled
                className="w-full bg-gray-200 dark:bg-gray-700 p-2 rounded-lg border border-gray-300 dark:border-gray-600 opacity-70 cursor-not-allowed"
              />
              {/* Red circle only on hover */}
              <div className="absolute right-3 top-1/2 -translate-y-1/2 hidden group-hover:flex">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              </div>
            </div>

            {isEditingProfile && (
              <div className="pt-2">
                <button
                  type="submit"
                  className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded-lg cursor-pointer"
                  disabled={loading}
                >
                  {loading ? "Saving..." : "Save Profile"}
                </button>
              </div>
            )}
          </form>
        </div>

        {/* Security Settings */}
        <div className="relative">
          <h3 className="text-xl font-semibold mb-4 text-purple-600 dark:text-purple-300 border-b border-gray-300 dark:border-gray-700 pb-2">
            Security
          </h3>

          {isEditingPassword ? (
            <button
              type="button"
              onClick={() => {
                setIsEditingPassword(false);
                setPasswords({
                  current: "",
                  newPass: "",
                });
                setShowPassword(false);
                setNewShowPassword(false);
              }}
              className="absolute top-0 right-0 text-red-500 hover:text-red-700 cursor-pointer"
            >
              <X size={20} />
            </button>
          ) : (
            <button
              type="button"
              onClick={() => setIsEditingPassword(true)}
              className="absolute top-0 right-0 text-purple-500 hover:text-purple-700 cursor-pointer"
            >
              <Pencil size={20} />
            </button>
          )}

          <form onSubmit={handlePasswordSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="current"
                className="block text-gray-700 dark:text-gray-400 mb-2"
              >
                Current Password
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
                  name="current"
                  value={passwords.current}
                  onChange={handlePasswordChange}
                  placeholder="Current Password"
                  disabled={!isEditingPassword}
                  className={`w-full bg-gray-200 dark:bg-gray-700 p-2 rounded-lg border 
                  ${
                    isEditingPassword
                      ? "focus:ring-2 focus:ring-purple-500"
                      : "opacity-70 cursor-not-allowed"
                  }`}
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="newPass"
                className="block text-gray-700 dark:text-gray-400 mb-2"
              >
                New Password
              </label>
              <div className="relative">
                {showNewPassword ? (
                  <EyeOff
                    className="w-5 absolute top-3 right-3 text-black dark:text-white cursor-pointer"
                    onClick={toggleShowNewPassword}
                  />
                ) : (
                  <Eye
                    className="w-5 absolute top-3 right-3 text-black dark:text-white cursor-pointer"
                    onClick={toggleShowNewPassword}
                  />
                )}

                <input
                  type={showNewPassword ? "text" : "password"}
                  name="newPass"
                  value={passwords.newPass}
                  onChange={handlePasswordChange}
                  placeholder="New Password"
                  disabled={!isEditingPassword}
                  className={`w-full bg-gray-200 dark:bg-gray-700 p-2 rounded-lg border 
                  ${
                    isEditingPassword
                      ? "focus:ring-2 focus:ring-purple-500"
                      : "opacity-70 cursor-not-allowed"
                  }`}
                />
              </div>
            </div>

            {isEditingPassword && (
              <div className="pt-2">
                <button
                  type="submit"
                  className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded-lg cursor-pointer"
                  disabled={loading}
                >
                  {loading ? "Changing..." : "Change password"}
                </button>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Settings;
