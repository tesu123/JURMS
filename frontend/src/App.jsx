import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import Logo from "./assets/mn.png";

import { login, logout } from "./features/auth/authSlice";
import { PublicRoute, ProtectedRoute } from "./components";

import {
  Routine,
  Dashboard,
  CreateRoutine,
  ManageRooms,
  LandingPage,
  LoginPage,
  SignupPage,
  ManageDepartments,
  ManageFaculties,
  ManageCourses,
  LandingLayout,
} from "./pages";

const ApiUrl = import.meta.env.VITE_BACKEND_URL;

/* ---------- AuthGate: wait for current-user before rendering routes ---------- */
function AuthGate() {
  const dispatch = useDispatch();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get(`${ApiUrl}/users/current-user`, {
          withCredentials: true,
        });
        dispatch(login(res.data.data));
      } catch {
        dispatch(logout());
      } finally {
        setChecking(false);
      }
    })();
  }, [dispatch]);

  if (checking) {
    return (
      <div className="flex flex-col items-center justify-center h-[100vh] w-full space-y-6 bg-white dark:bg-black">
        <img src={Logo} alt="Loading Logo" className="w-20 h-20" />
        <div className="w-12 h-12 border-4 border-purple-400 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return <Outlet />;
}

/* ---------- AppLayout: sidebar + navbar + page outlet ---------- */
function AppLayout({ darkMode, setDarkMode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const toggleSidebar = () => setSidebarOpen((s) => !s);

  return (
    <div className="flex h-screen dark:bg-gray-900">
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      <div className="flex-1 flex flex-col overflow-auto">
        <Navbar
          toggleSidebar={toggleSidebar}
          darkMode={darkMode}
          setDarkMode={setDarkMode}
        />
        <div className="flex-1 p-6 bg-white dark:bg-gray-900 text-gray-900 dark:text-white overflow-auto scrollbar-none">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

function App() {
  const [darkMode, setDarkMode] = useState(
    () => window.matchMedia("(prefers-color-scheme: dark)").matches
  );

  // apply/remove dark class
  useEffect(() => {
    const el = document.documentElement;
    darkMode ? el.classList.add("dark") : el.classList.remove("dark");
  }, [darkMode]);

  // watch system preference changes
  useEffect(() => {
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = (e) => setDarkMode(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return (
    <>
      {/* single, global toaster */}
      <Toaster position="top-right" />

      <Routes>
        {/* Wait for auth to resolve before any route renders */}
        <Route element={<AuthGate />}>
          {/* Public (only when logged out) */}
          <Route element={<PublicRoute />}>
            <Route path="/" element={<LandingLayout />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
          </Route>

          {/* Protected app */}
          <Route element={<ProtectedRoute />}>
            <Route
              element={
                <AppLayout darkMode={darkMode} setDarkMode={setDarkMode} />
              }
            >
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/routine" element={<Routine />} />
              <Route path="/create-routine" element={<CreateRoutine />} />
              <Route path="/manage-rooms" element={<ManageRooms />} />
              <Route
                path="/manage-departments"
                element={<ManageDepartments />}
              />
              <Route path="/manage-courses" element={<ManageCourses />} />
              <Route path="/manage-faculties" element={<ManageFaculties />} />
            </Route>
          </Route>

          {/* Catch-all */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
