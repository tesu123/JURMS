import { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Users, PlusCircle, Trash2, AlertTriangle } from "lucide-react";

const ApiUrl = import.meta.env.VITE_BACKEND_URL; // e.g., http://localhost:5000/api/v1

const ManageFaculties = () => {
  const [faculties, setFaculties] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    department: "",
    designation: "",
    contact: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // ✅ Fetch faculties from backend
  const fetchFaculties = async () => {
    try {
      const res = await axios.get(`${ApiUrl}/faculties/get-faculties`, {
        withCredentials: true,
      });
      setFaculties(res.data.data || res.data);
    } catch (err) {
      console.error("Error fetching faculties:", err);
      toast.error("Failed to load faculties.");
    }
  };

  // ✅ Fetch departments for dropdown
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
    fetchFaculties();
    fetchDepartments();
  }, []);

  // ✅ Add new faculty
  const handleAddFaculty = async () => {
    setError("");

    if (
      !formData.name ||
      !formData.email ||
      !formData.department ||
      !formData.designation
    ) {
      setError("Please fill all required fields before adding.");
      return;
    }

    try {
      setLoading(true);
      const res = await axios.post(
        `${ApiUrl}/faculties/add-faculty`,
        formData,
        { withCredentials: true }
      );

      toast.success("Faculty added successfully");
      setFaculties((prev) => [...prev, res.data.data || res.data]);
      setFormData({
        name: "",
        email: "",
        department: "",
        designation: "",
        contact: "",
      });
    } catch (err) {
      console.error("Error adding faculty:", err);
      if (err.response?.status === 400) {
        toast.error(err.response.data.message || "Faculty already exists!");
      } else {
        toast.error("Error adding faculty.");
      }
    } finally {
      setLoading(false);
    }
  };

  // 🧹 Delete Faculty
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this faculty?"))
      return;

    try {
      await axios.delete(`${ApiUrl}/faculties/delete-faculty/${id}`, {
        withCredentials: true,
      });
      toast.success("Faculty deleted successfully");
      setFaculties((prev) => prev.filter((f) => f._id !== id));
    } catch (err) {
      console.error("Error deleting faculty:", err);
      toast.error("Failed to delete faculty");
    }
  };

  return (
    <div className="p-6 text-gray-800 dark:text-gray-100">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <Users className="text-indigo-600 dark:text-indigo-400" />
          Manage Faculties
        </h1>
      </div>

      {/* Add Faculty Form */}
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 shadow-sm mb-6">
        <h2 className="text-lg font-semibold mb-4">Add New Faculty</h2>

        {error && (
          <div className="flex items-center gap-2 mb-3 text-yellow-600 dark:text-yellow-400">
            <AlertTriangle size={18} />
            <span>{error}</span>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium mb-1">Full Name</label>
            <input
              type="text"
              placeholder="e.g., Prof. A. Das"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="w-full px-3 py-2 rounded-md bg-transparent border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-indigo-500 outline-none"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              placeholder="e.g., adas@jurms.edu"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className="w-full px-3 py-2 rounded-md bg-transparent border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-indigo-500 outline-none"
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
              className="w-full px-3 py-2 rounded-md bg-transparent border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-indigo-500 outline-none"
            >
              <option value="">Select Department</option>
              {departments.map((dept) => (
                <option key={dept._id} value={dept._id}>
                  {dept.code} — {dept.name}
                </option>
              ))}
            </select>
          </div>

          {/* Designation */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Designation
            </label>
            <input
              type="text"
              placeholder="e.g., Assistant Professor"
              value={formData.designation}
              onChange={(e) =>
                setFormData({ ...formData, designation: e.target.value })
              }
              className="w-full px-3 py-2 rounded-md bg-transparent border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-indigo-500 outline-none"
            />
          </div>

          {/* Contact */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Contact No.
            </label>
            <input
              type="text"
              placeholder="e.g., 9876543210"
              value={formData.contact}
              onChange={(e) =>
                setFormData({ ...formData, contact: e.target.value })
              }
              className="w-full px-3 py-2 rounded-md bg-transparent border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-indigo-500 outline-none"
            />
          </div>
        </div>

        {/* Add Button */}
        <div className="flex justify-end mt-4">
          <button
            onClick={handleAddFaculty}
            disabled={loading}
            className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-md font-semibold transition disabled:opacity-50"
          >
            <PlusCircle size={18} /> {loading ? "Adding..." : "Add Faculty"}
          </button>
        </div>
      </div>

      {/* Faculty List Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300 dark:border-gray-700 rounded-lg overflow-hidden">
          <thead className="bg-indigo-600 text-white">
            <tr>
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-left">Email</th>
              <th className="px-4 py-2 text-left">Department</th>
              <th className="px-4 py-2 text-left">Designation</th>
              <th className="px-4 py-2 text-left">Contact</th>
              <th className="px-4 py-2 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {faculties.length > 0 ? (
              faculties.map((faculty) => (
                <tr
                  key={faculty._id}
                  className="odd:bg-white even:bg-gray-50 dark:odd:bg-gray-800 dark:even:bg-gray-700 hover:bg-indigo-50 dark:hover:bg-gray-600 transition"
                >
                  <td className="px-4 py-2 font-semibold">{faculty.name}</td>
                  <td className="px-4 py-2">{faculty.email}</td>
                  <td className="px-4 py-2">
                    {faculty.department?.code || "N/A"}
                  </td>
                  <td className="px-4 py-2">{faculty.designation}</td>
                  <td className="px-4 py-2">{faculty.contact}</td>
                  <td className="px-4 py-2">
                    <button
                      onClick={() => handleDelete(faculty._id)}
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
                  colSpan="6"
                  className="text-center py-4 text-gray-500 dark:text-gray-400"
                >
                  No faculty members added yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageFaculties;
