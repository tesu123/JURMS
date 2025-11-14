// import { useState, useEffect } from "react";
// import axios from "axios";
// import toast from "react-hot-toast";
// import Card from "../components/Card";

// const ApiUrl = import.meta.env.VITE_BACKEND_URL; // Example: http://localhost:5000/api/v1

// const Dashboard = () => {
//   const [stats, setStats] = useState({
//     departments: 0,
//     courses: 0,
//     faculties: 0,
//     rooms: 0,
//     routines: 0,
//     students: "1200+", // placeholder for now
//   });
//   const [loading, setLoading] = useState(true);

//   // ✅ Fetch dashboard data
//   const fetchDashboardStats = async () => {
//     try {
//       setLoading(true);

//       // Fetch data from multiple collections simultaneously
//       const [deptRes, courseRes, facultyRes, roomRes, routineRes] =
//         await Promise.all([
//           axios.get(`${ApiUrl}/departments/get-departments`, {
//             withCredentials: true,
//           }),
//           axios.get(`${ApiUrl}/courses/get-courses`, {
//             withCredentials: true,
//           }),
//           axios.get(`${ApiUrl}/faculties/get-faculties`, {
//             withCredentials: true,
//           }),
//           axios.get(`${ApiUrl}/rooms/get-rooms`, {
//             withCredentials: true,
//           }),
//           axios.get(`${ApiUrl}/routines/get-routines`, {
//             withCredentials: true,
//           }),
//         ]);

//       // Update state with counts
//       setStats({
//         departments: deptRes.data.data?.length || 0,
//         courses: courseRes.data.data?.length || 0,
//         faculties: facultyRes.data.data?.length || 0,
//         rooms: roomRes.data.data?.length || 0,
//         routines: routineRes.data.data?.length || 0,
//         students: "1200+", // placeholder
//       });
//     } catch (err) {
//       console.error("Error fetching dashboard data:", err);
//       toast.error("Failed to load dashboard data");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchDashboardStats();
//   }, []);

//   return (
//     <div className="p-6 text-gray-800 dark:text-gray-100">
//       <h1 className="text-2xl font-bold mb-6">Dashboard Overview</h1>

//       {loading ? (
//         <div className="text-center text-gray-600 dark:text-gray-400">
//           Loading dashboard data...
//         </div>
//       ) : (
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//           <Card title="Departments" value={stats.departments} />
//           <Card title="Courses" value={stats.courses} />
//           <Card title="Faculty Members" value={stats.faculties} />
//           <Card title="Students" value={stats.students} />
//           <Card title="Active Classes" value={stats.routines} />
//           <Card title="Rooms Available" value={stats.rooms} />
//         </div>
//       )}
//     </div>
//   );
// };

// export default Dashboard;

import { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Card from "../components/Card";
import { Trash2 } from "lucide-react";
import { useSelector } from "react-redux";

const ApiUrl = import.meta.env.VITE_BACKEND_URL;

const Dashboard = () => {
  const user = useSelector((state) => state.auth.user); // needed to detect admin

  const [stats, setStats] = useState({
    departments: 0,
    courses: 0,
    faculties: 0,
    rooms: 0,
    routines: 0,
    students: 0,
  });

  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  /* --------------------------------------------------------
      FETCH ALL DASHBOARD STATS + STUDENTS LIST (ADMIN ONLY)
  --------------------------------------------------------- */
  const fetchDashboardStats = async () => {
    try {
      setLoading(true);

      const baseRequests = [
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
      ];

      // Only admin can fetch all users
      if (user?.role === "admin") {
        baseRequests.push(
          axios.get(`${ApiUrl}/users/get-users`, { withCredentials: true })
        );
      }

      const results = await Promise.all(baseRequests);

      const [
        deptRes,
        courseRes,
        facultyRes,
        roomRes,
        routineRes,
        usersRes, // admin only
      ] = results;

      const studentList = usersRes?.data?.data || [];

      setStats({
        departments: deptRes.data.data.length,
        courses: courseRes.data.data.length,
        faculties: facultyRes.data.data.length,
        rooms: roomRes.data.data.length,
        routines: routineRes.data.data.length,
        students: studentList.length,
      });

      if (user?.role === "admin") {
        setStudents(studentList);
      }
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

  /* --------------------------------------------------------
                      DELETE A USER (ADMIN ONLY)
  --------------------------------------------------------- */
  const deleteUser = async (userId) => {
    if (!confirm("Are you sure you want to delete this user?")) return;

    try {
      await axios.delete(`${ApiUrl}/users/${userId}`, {
        withCredentials: true,
      });

      toast.success("User deleted successfully");

      // Remove user from UI list
      setStudents((prev) => prev.filter((u) => u._id !== userId));

      // Decrease student count
      setStats((prev) => ({ ...prev, students: prev.students - 1 }));
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete user");
    }
  };

  return (
    <div className="p-6 text-gray-800 dark:text-gray-100">
      <h1 className="text-2xl font-bold mb-6">Dashboard Overview</h1>

      {loading ? (
        <div className="text-center text-gray-600 dark:text-gray-400">
          Loading dashboard data...
        </div>
      ) : (
        <>
          {/* ---------- STAT CARDS ---------- */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            <Card title="Departments" value={stats.departments} />
            <Card title="Courses" value={stats.courses} />
            <Card title="Faculty Members" value={stats.faculties} />
            <Card title="Rooms Available" value={stats.rooms} />
            <Card title="Active Classes" value={stats.routines} />

            {user?.role === "admin" && (
              <Card title="Students" value={stats.students} />
            )}
          </div>

          {/* ---------- STUDENT LIST (ADMIN ONLY) ---------- */}
          {user?.role === "admin" && (
            <div className="dark:bg-gray-900 p-6 rounded-xl shadow-lg">
              <h2 className="text-xl font-semibold mb-4">
                Registered Students
              </h2>

              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-gray-700">
                    <th className="py-2">Name</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th className="text-right">Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {students.map((u) => (
                    <tr key={u._id} className="border-b border-gray-700">
                      <td className="py-2">{u.name}</td>
                      <td>{u.email}</td>
                      <td className="capitalize">{u.role}</td>
                      <td className="text-right">
                        <button
                          onClick={() => deleteUser(u._id)}
                          className="text-red-400 hover:text-red-600"
                        >
                          <Trash2 size={18} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {students.length === 0 && (
                <p className="text-gray-400 text-center py-4">
                  No users found.
                </p>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Dashboard;
