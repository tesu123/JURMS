import { Link, useLocation, useNavigate } from "react-router-dom";
import Avatar from "react-avatar";
import {
  FaUser,
  FaReceipt,
  FaChartBar,
  FaCog,
  FaInfoCircle,
  FaTimes,
} from "react-icons/fa";
import { LogOut } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../features/auth/authSlice.js";
import axios from "axios";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";

const ApiUrl = import.meta.env.VITE_BACKEND_URL;

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const menuItems = [
    { name: "Dashboard", path: "/dashboard", icon: <FaUser /> },
    { name: "Routine", path: "/routine", icon: <FaReceipt /> },
    { name: "Create Routine", path: "/create-routine", icon: <FaChartBar /> },
    {
      name: "Manage Departments",
      path: "/manage-departments",
      icon: <FaCog />,
    },
    { name: "Manage Rooms", path: "/manage-rooms", icon: <FaCog /> },
    { name: "Manage Courses", path: "/manage-courses", icon: <FaInfoCircle /> },
    {
      name: "Manage Faculties",
      path: "/manage-faculties",
      icon: <FaInfoCircle />,
    },
  ];

  const user = useSelector((state) => state.auth.user);
  const isLoggedIn = useSelector((state) => state.auth.status);

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/");
    }
  }, [isLoggedIn, navigate]);

  const confirmLogout = async () => {
    setIsLoggingOut(true);
    try {
      await axios.post(`${ApiUrl}/users/logout`, {}, { withCredentials: true });
      dispatch(logout());
      navigate("/");
      toast.success("Logged out successfully");
    } catch (err) {
      toast.error("Error logging out");
    } finally {
      setIsLoggingOut(false);
      setShowConfirm(false);
    }
  };

  return (
    <>
      {/* Overlay (mobile only) */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-transparent bg-opacity-40 z-20 md:hidden"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-72 bg-gray-200 dark:bg-gray-800 flex flex-col justify-between shadow-xl transform transition-transform duration-300 z-30
        ${isOpen ? "translate-x-0" : "-translate-x-full"} 
        md:translate-x-0 md:static md:flex`}
      >
        {/* Top Section */}
        <div>
          <div className="flex items-center justify-between px-6 py-5 border-b border-gray-300 dark:border-gray-700">
            <h1 className="text-3xl font-extrabold bg-linear-to-r from-purple-600 via-pink-500 to-orange-400 text-transparent bg-clip-text tracking-wide">
              JURMS
            </h1>

            {/* Close button (mobile only) */}
            <button
              onClick={toggleSidebar}
              className="md:hidden text-2xl text-gray-700 dark:text-gray-200 hover:text-purple-500 transition cursor-pointer"
            >
              <FaTimes />
            </button>
          </div>

          {/* Menu */}
          <nav className="mt-4 space-y-1">
            {menuItems.map((item, index) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={index}
                  to={item.path}
                  onClick={toggleSidebar}
                  className={`flex items-center gap-3 px-6 py-3 font-medium transition rounded-r-full
                    ${
                      isActive
                        ? "bg-purple-100 dark:bg-gray-700 text-purple-600 dark:text-purple-400 border-r-4 border-purple-600"
                        : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                    }`}
                >
                  {item.icon} {item.name}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Bottom Section */}
        <div className="p-4 border-t border-gray-300 dark:border-gray-700">
          <div className="flex items-center justify-between px-3 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:shadow-md transition">
            <div className="flex items-center gap-2">
              <Avatar name={user?.name} size={36} round={true} />
              <div className="flex flex-col">
                <h3 className="text-sm font-bold text-gray-500 dark:text-gray-200">
                  {user?.name}
                </h3>
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  {user?.email}
                </span>
              </div>
            </div>
            <button
              onClick={() => setShowConfirm(true)}
              disabled={isLoggingOut}
              className="text-red-500 hover:text-red-600 transition cursor-pointer"
            >
              <LogOut size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* Logout Confirmation Modal */}
      {showConfirm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-2xl w-80">
            <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3">
              Confirm Logout
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6 text-sm">
              Are you sure you want to log out?
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowConfirm(false)}
                className="px-4 py-2 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={confirmLogout}
                disabled={isLoggingOut}
                className="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition cursor-pointer"
              >
                {isLoggingOut ? "Logging out..." : "Logout"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Sidebar;
