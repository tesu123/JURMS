import { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Card from "../components/Card";

const ApiUrl = import.meta.env.VITE_BACKEND_URL; // Example: http://localhost:5000/api/v1

const Dashboard = () => {
  const [stats, setStats] = useState({
    departments: 0,
    courses: 0,
    faculties: 0,
    rooms: 0,
    routines: 0,
    students: "1200+", // placeholder for now
  });
  const [loading, setLoading] = useState(true);

  // ✅ Fetch dashboard data
  const fetchDashboardStats = async () => {
    try {
      setLoading(true);

      // Fetch data from multiple collections simultaneously
      const [deptRes, courseRes, facultyRes, roomRes, routineRes] =
        await Promise.all([
          axios.get(`${ApiUrl}/departments/get-departments`, {
            withCredentials: true,
          }),
          axios.get(`${ApiUrl}/courses/get-courses`, {
            withCredentials: true,
          }),
          axios.get(`${ApiUrl}/faculties/get-faculties`, {
            withCredentials: true,
          }),
          axios.get(`${ApiUrl}/rooms/get-rooms`, {
            withCredentials: true,
          }),
          axios.get(`${ApiUrl}/routines/get-routines`, {
            withCredentials: true,
          }),
        ]);

      // Update state with counts
      setStats({
        departments: deptRes.data.data?.length || 0,
        courses: courseRes.data.data?.length || 0,
        faculties: facultyRes.data.data?.length || 0,
        rooms: roomRes.data.data?.length || 0,
        routines: routineRes.data.data?.length || 0,
        students: "1200+", // placeholder
      });
    } catch (err) {
      console.error("Error fetching dashboard data:", err);
      toast.error("Failed to load dashboard data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  return (
    <div className="p-6 text-gray-800 dark:text-gray-100">
      <h1 className="text-2xl font-bold mb-6">Dashboard Overview</h1>

      {loading ? (
        <div className="text-center text-gray-600 dark:text-gray-400">
          Loading dashboard data...
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card title="Departments" value={stats.departments} />
          <Card title="Courses" value={stats.courses} />
          <Card title="Faculty Members" value={stats.faculties} />
          <Card title="Students" value={stats.students} />
          <Card title="Active Classes" value={stats.routines} />
          <Card title="Rooms Available" value={stats.rooms} />
        </div>
      )}
    </div>
  );
};

export default Dashboard;
