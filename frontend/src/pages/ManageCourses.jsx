import { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { BookOpen, PlusCircle, Trash2, AlertTriangle } from "lucide-react";

const ApiUrl = import.meta.env.VITE_BACKEND_URL; // Example: http://localhost:5000/api/v1

const ManageCourses = () => {
  const [courses, setCourses] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    department: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // ✅ Fetch Courses
  const fetchCourses = async () => {
    try {
      const res = await axios.get(`${ApiUrl}/courses/get-courses`, {
        withCredentials: true,
      });
      setCourses(res.data.data || res.data);
    } catch (err) {
      console.error("Error fetching courses:", err);
      toast.error("Failed to load courses.");
    }
  };

  // ✅ Fetch Departments for dropdown
  const fetchDepartments = async () => {
    try {
      const res = await axios.get(`${ApiUrl}/departments/get-departments`, {
        withCredentials: true,
      });
      setDepartments(res.data.data || res.data);
    } catch (err) {
      console.error("Error fetching departments:", err);
      toast.error("Failed to load departments.");
    }
  };

  useEffect(() => {
    fetchCourses();
    fetchDepartments();
  }, []);

  // ✅ Add Course
  const handleAddCourse = async () => {
    setError("");

    if (!formData.name || !formData.department) {
      setError("Please fill both fields before adding.");
      return;
    }

    try {
      setLoading(true);
      const res = await axios.post(
        `${ApiUrl}/courses/create-course`,
        formData,
        {
          withCredentials: true,
        }
      );

      toast.success("Course added successfully");
      setCourses((prev) => [...prev, res.data.data || res.data]);
      setFormData({ name: "", department: "" });
    } catch (err) {
      console.error("Error adding course:", err);
      if (err.response?.status === 400) {
        toast.error(err.response.data.message || "Course already exists!");
      } else {
        toast.error("Error adding course.");
      }
    } finally {
      setLoading(false);
    }
  };

  // 🧹 Delete Course
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this course?")) return;

    try {
      await axios.delete(`${ApiUrl}/courses/delete-course/${id}`, {
        withCredentials: true,
      });
      toast.success("Course deleted");
      setCourses((prev) => prev.filter((c) => c._id !== id));
    } catch (err) {
      console.error("Error deleting course:", err);
      toast.error("Failed to delete course");
    }
  };

  return (
    <div className="p-6 text-gray-800 dark:text-gray-100">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <BookOpen className="text-indigo-600 dark:text-indigo-400" />
          Manage Courses
        </h1>
      </div>

      {/* Add Course Form */}
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 shadow-sm mb-6">
        <h2 className="text-lg font-semibold mb-4">Add New Course</h2>

        {error && (
          <div className="flex items-center gap-2 mb-3 text-yellow-600 dark:text-yellow-400">
            <AlertTriangle size={18} />
            <span>{error}</span>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Course Name */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-1">
              Course Name
            </label>
            <input
              type="text"
              placeholder="e.g., B.Tech CSE, MCA, M.Tech IT"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="w-full px-3 py-2 rounded-md bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 text-gray-800 dark:text-gray-200 focus:ring-2 focus:ring-indigo-500 outline-none"

            />
          </div>

          {/* Department Dropdown */}
          <div>
            <label className="block text-sm font-medium mb-1">Department</label>
            <select
              value={formData.department}
              onChange={(e) =>
                setFormData({ ...formData, department: e.target.value })
              }
              className="w-full px-3 py-2 rounded-md bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 text-gray-800 dark:text-gray-200 focus:ring-2 focus:ring-indigo-500 outline-none"
            >
              <option value="">Select Department</option>
              {departments.map((dept) => (
                <option key={dept._id} value={dept._id}>
                  {dept.code} — {dept.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Add Button */}
        <div className="flex justify-end mt-4">
          <button
            onClick={handleAddCourse}
            disabled={loading}
            className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-md font-semibold transition disabled:opacity-50"
          >
            <PlusCircle size={18} /> {loading ? "Adding..." : "Add Course"}
          </button>
        </div>
      </div>

      {/* Course List Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300 dark:border-gray-700 rounded-lg overflow-hidden">
          <thead className="bg-indigo-600 text-white">
            <tr>
              <th className="px-4 py-2 text-left">#</th>
              <th className="px-4 py-2 text-left">Course Name</th>
              <th className="px-4 py-2 text-left">Department</th>
              <th className="px-4 py-2 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {courses.length > 0 ? (
              courses.map((course, index) => (
                <tr
                  key={course._id}
                  className="odd:bg-white even:bg-gray-50 dark:odd:bg-gray-800 dark:even:bg-gray-700 hover:bg-indigo-50 dark:hover:bg-gray-600 transition"
                >
                  <td className="px-4 py-2 font-medium">{index + 1}</td>
                  <td className="px-4 py-2">{course.name}</td>
                  <td className="px-4 py-2">
                    {course.department?.code || "N/A"}
                  </td>
                  <td className="px-4 py-2">
                    <button
                      onClick={() => handleDelete(course._id)}
                      className="text-red-500 hover:text-red-700 transition"
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="4"
                  className="text-center py-4 text-gray-500 dark:text-gray-400"
                >
                  No courses added yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageCourses;
