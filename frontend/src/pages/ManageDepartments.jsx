import { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Building, PlusCircle, Trash2, AlertTriangle } from "lucide-react";

const ApiUrl = import.meta.env.VITE_BACKEND_URL; // Example: http://localhost:5000/api/v1

const ManageDepartments = () => {
  const [departments, setDepartments] = useState([]);
  const [formData, setFormData] = useState({
    code: "",
    name: "",
    description: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // ✅ Fetch all departments from backend
  const fetchDepartments = async () => {
    try {
      const res = await axios.get(`${ApiUrl}/departments/get-departments`, {
        withCredentials: true,
      });
      setDepartments(res.data.data || res.data); // handle both ApiResponse & raw array
    } catch (err) {
      console.error("Error fetching departments:", err);
      toast.error("Failed to load departments.");
    }
  };

  useEffect(() => {
    fetchDepartments();
  }, []);

  // ✅ Add Department
  const handleAddDepartment = async () => {
    setError("");

    if (!formData.code || !formData.name) {
      setError("Please fill all required fields (Code and Name).");
      return;
    }

    try {
      setLoading(true);
      const res = await axios.post(
        `${ApiUrl}/departments/add-department`,
        formData,
        { withCredentials: true }
      );

      toast.success("Department added successfully");
      setDepartments((prev) => [...prev, res.data.data || res.data]);
      setFormData({ code: "", name: "", description: "" });
    } catch (err) {
      console.error(err);
      if (err.response?.status === 400) {
        toast.error(err.response.data.message || "Duplicate department code!");
      } else {
        toast.error("Error adding department.");
      }
    } finally {
      setLoading(false);
    }
  };

  // 🧹 Delete Department
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this department?"))
      return;

    try {
      await axios.delete(`${ApiUrl}/departments/delete-department/${id}`, {
        withCredentials: true,
      });
      toast.success("Department deleted");
      setDepartments((prev) => prev.filter((d) => d._id !== id));
    } catch (err) {
      console.error("Delete error:", err);
      toast.error("Error deleting department");
    }
  };

  return (
    <div className="p-6 text-gray-800 dark:text-gray-100">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <Building className="text-indigo-600 dark:text-indigo-400" />
          Manage Departments
        </h1>
      </div>

      {/* Add Department Form */}
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 shadow-sm mb-6">
        <h2 className="text-lg font-semibold mb-4">Add New Department</h2>

        {error && (
          <div className="flex items-center gap-2 mb-3 text-yellow-600 dark:text-yellow-400">
            <AlertTriangle size={18} />
            <span>{error}</span>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Department Code */}
          <div>
            <label className="block text-sm font-medium mb-1">Dept. Code</label>
            <input
              type="text"
              placeholder="e.g., CSE, ECE, ME"
              value={formData.code}
              onChange={(e) =>
                setFormData({ ...formData, code: e.target.value.toUpperCase() })
              }
              className="w-full px-3 py-2 rounded-md bg-transparent border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-indigo-500 outline-none"
            />
          </div>

          {/* Department Name */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Department Name
            </label>
            <input
              type="text"
              placeholder="Full Department Name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="w-full px-3 py-2 rounded-md bg-transparent border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-indigo-500 outline-none"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Description
            </label>
            <input
              type="text"
              placeholder="Short Description (optional)"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              className="w-full px-3 py-2 rounded-md bg-transparent border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-indigo-500 outline-none"
            />
          </div>
        </div>

        {/* Add Button */}
        <div className="flex justify-end mt-4">
          <button
            onClick={handleAddDepartment}
            disabled={loading}
            className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-md font-semibold transition disabled:opacity-50"
          >
            <PlusCircle size={18} /> {loading ? "Adding..." : "Add Department"}
          </button>
        </div>
      </div>

      {/* Department List Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300 dark:border-gray-700 rounded-lg overflow-hidden">
          <thead className="bg-indigo-600 text-white">
            <tr>
              <th className="px-4 py-2 text-left">Code</th>
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-left">Description</th>
              <th className="px-4 py-2 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {departments.length > 0 ? (
              departments.map((dept) => (
                <tr
                  key={dept._id}
                  className="odd:bg-white even:bg-gray-50 dark:odd:bg-gray-800 dark:even:bg-gray-700 hover:bg-indigo-50 dark:hover:bg-gray-600 transition"
                >
                  <td className="px-4 py-2 font-semibold">{dept.code}</td>
                  <td className="px-4 py-2">{dept.name}</td>
                  <td className="px-4 py-2 text-sm text-gray-600 dark:text-gray-400">
                    {dept.description || "No description"}
                  </td>
                  <td className="px-4 py-2">
                    <button
                      onClick={() => handleDelete(dept._id)}
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
                  No departments added yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageDepartments;
