// src/pages/CreateRoutine.jsx
import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import {
  CalendarPlus,
  Trash2,
  CheckCircle2,
  AlertTriangle,
} from "lucide-react";

const ApiUrl = import.meta.env.VITE_BACKEND_URL; // e.g., https://jurms-backend.vercel.app/api/v1

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
const timeSlots = [
  "9:00 AM - 10:00 AM",
  "10:00 AM - 11:00 AM",
  "11:00 AM - 12:00 PM",
  "12:00 PM - 1:00 PM",
  "2:00 PM - 3:00 PM",
  "3:00 PM - 4:00 PM",
  "4:00 PM - 5:00 PM",
];

const CreateRoutine = () => {
  const [routine, setRoutine] = useState([]);
  const [formData, setFormData] = useState({
    course: "",
    department: "",
    semester: "",
    subject: "",
    faculty: "",
    room: "",
    time: "",
    day: "",
  });
  const [conflict, setConflict] = useState("");
  const [loading, setLoading] = useState(false);

  // Dynamic Data
  const [courses, setCourses] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [faculties, setFaculties] = useState([]);
  const [rooms, setRooms] = useState([]);

  // ✅ Fetch all lists on mount
  useEffect(() => {
    fetchAllData();
    fetchRoutines();
  }, []);

  const fetchAllData = async () => {
    try {
      const [courseRes, deptRes, facRes, roomRes] = await Promise.all([
        axios.get(`${ApiUrl}/courses/get-courses`, { withCredentials: true }),
        axios.get(`${ApiUrl}/departments/get-departments`, {
          withCredentials: true,
        }),
        axios.get(`${ApiUrl}/faculties/get-faculties`, {
          withCredentials: true,
        }),
        axios.get(`${ApiUrl}/rooms/get-rooms`, { withCredentials: true }),
      ]);
      setCourses(courseRes.data.data || []);
      setDepartments(deptRes.data.data || []);
      setFaculties(facRes.data.data || []);
      setRooms(roomRes.data.data || []);
    } catch (err) {
      console.error("Error fetching master data:", err);
      toast.error("Failed to load data from server");
    }
  };

  const fetchRoutines = async () => {
    try {
      const res = await axios.get(`${ApiUrl}/routines/get-routines`, {
        withCredentials: true,
      });
      setRoutine(res.data.data || []);
    } catch (err) {
      console.error("Error fetching routines:", err);
      toast.error("Failed to load routines");
    }
  };

  // ✅ Handle Add Routine
  const handleAddClass = async () => {
    setConflict("");

    if (
      !formData.course ||
      !formData.department ||
      !formData.semester ||
      !formData.subject ||
      !formData.faculty ||
      !formData.room ||
      !formData.time ||
      !formData.day
    ) {
      setConflict("⚠️ Please fill in all fields before adding to routine.");
      return;
    }

    try {
      setLoading(true);
      const res = await axios.post(`${ApiUrl}/routines/add-routine`, formData, {
        withCredentials: true,
      });

      if (res.data.success) {
        toast.success("Routine added successfully");
        setRoutine((prev) => [...prev, res.data.data]);
        setFormData({
          course: "",
          department: "",
          semester: "",
          subject: "",
          faculty: "",
          room: "",
          time: "",
          day: "",
        });
      }
    } catch (err) {
      console.error("Error adding routine:", err);
      const msg =
        err.response?.data?.message ||
        "⚠️ Failed to add routine. Please try again.";
      setConflict(msg);
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  // 🧹 Delete a routine
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this routine?"))
      return;

    try {
      await axios.delete(`${ApiUrl}/routines/delete-routine/${id}`, {
        withCredentials: true,
      });
      toast.success("Routine deleted successfully");
      setRoutine((prev) => prev.filter((r) => r._id !== id));
    } catch (err) {
      console.error("Error deleting routine:", err);
      toast.error("Failed to delete routine");
    }
  };

  return (
    <div className="p-6 text-gray-800 dark:text-gray-100">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <CalendarPlus className="text-indigo-600 dark:text-indigo-400" />
          Create Routine
        </h1>
      </div>

      {/* Routine Builder Form */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 bg-gray-100 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 p-4 rounded-lg shadow-sm mb-6">
        {/* Course */}
        <div>
          <label className="block text-sm font-medium mb-1">Course</label>
          <select
            value={formData.course}
            onChange={(e) =>
              setFormData({ ...formData, course: e.target.value })
            }
            className="w-full px-3 py-2 rounded-md bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 text-gray-800 dark:text-gray-200 focus:ring-2 focus:ring-indigo-500 outline-none"
          >
            <option value="">Select Course</option>
            {courses.map((c) => (
              <option key={c._id} value={c._id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>

        {/* Department */}
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
            {departments.map((d) => (
              <option key={d._id} value={d._id}>
                {d.code} — {d.name}
              </option>
            ))}
          </select>
        </div>

        {/* Semester */}
        <div>
          <label className="block text-sm font-medium mb-1">Semester</label>
          <select
            value={formData.semester}
            onChange={(e) =>
              setFormData({ ...formData, semester: e.target.value })
            }
            className="w-full px-3 py-2 rounded-md bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 text-gray-800 dark:text-gray-200 focus:ring-2 focus:ring-indigo-500 outline-none"
          >
            <option value="">Select Semester</option>
            {[1, 2, 3, 4, 5, 6].map((sem) => (
              <option key={sem} value={sem}>
                {sem}th
              </option>
            ))}
          </select>
        </div>

        {/* Subject */}
        <div>
          <label className="block text-sm font-medium mb-1">Subject</label>
          <input
            type="text"
            placeholder="Enter subject"
            value={formData.subject}
            onChange={(e) =>
              setFormData({ ...formData, subject: e.target.value })
            }
            className="w-full px-3 py-2 rounded-md bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 text-gray-800 dark:text-gray-200 focus:ring-2 focus:ring-indigo-500 outline-none"
          />
        </div>

        {/* Faculty */}
        <div>
          <label className="block text-sm font-medium mb-1">Faculty</label>
          <select
            value={formData.faculty}
            onChange={(e) =>
              setFormData({ ...formData, faculty: e.target.value })
            }
            className="w-full px-3 py-2 rounded-md bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 text-gray-800 dark:text-gray-200 focus:ring-2 focus:ring-indigo-500 outline-none"
          >
            <option value="">Select Faculty</option>
            {faculties.map((f) => (
              <option key={f._id} value={f._id}>
                {f.name}
              </option>
            ))}
          </select>
        </div>

        {/* Room */}
        <div>
          <label className="block text-sm font-medium mb-1">Room/Lab</label>
          <select
            value={formData.room}
            onChange={(e) => setFormData({ ...formData, room: e.target.value })}
            className="w-full px-3 py-2 rounded-md bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 text-gray-800 dark:text-gray-200 focus:ring-2 focus:ring-indigo-500 outline-none"
          >
            <option value="">Select Room</option>
            {rooms.map((r) => (
              <option key={r._id} value={r._id}>
                {r.name}
              </option>
            ))}
          </select>
        </div>

        {/* Day */}
        <div>
          <label className="block text-sm font-medium mb-1">Day</label>
          <select
            value={formData.day}
            onChange={(e) => setFormData({ ...formData, day: e.target.value })}
            className="w-full px-3 py-2 rounded-md bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 text-gray-800 dark:text-gray-200 focus:ring-2 focus:ring-indigo-500 outline-none"
          >
            <option value="">Select Day</option>
            {days.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>
        </div>

        {/* Time Slot */}
        <div>
          <label className="block text-sm font-medium mb-1">Time Slot</label>
          <select
            value={formData.time}
            onChange={(e) => setFormData({ ...formData, time: e.target.value })}
            className="w-full px-3 py-2 rounded-md bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 text-gray-800 dark:text-gray-200 focus:ring-2 focus:ring-indigo-500 outline-none"
          >
            <option value="">Select Time Slot</option>
            {timeSlots.map((slot) => (
              <option key={slot} value={slot}>
                {slot}
              </option>
            ))}
          </select>
        </div>

        {/* Add Button */}
        <div className="flex items-end">
          <button
            onClick={handleAddClass}
            disabled={loading}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-md font-semibold transition disabled:opacity-50"
          >
            {loading ? "Adding..." : "Add to Routine"}
          </button>
        </div>
      </div>

      {/* Conflict Message */}
      {conflict && (
        <div className="flex items-center gap-2 text-yellow-600 dark:text-yellow-400 mb-4">
          <AlertTriangle size={18} /> <p>{conflict}</p>
        </div>
      )}

      {/* Weekly Routine Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300 dark:border-gray-700 rounded-lg overflow-hidden">
          <thead className="bg-indigo-600 text-white">
            <tr>
              <th className="px-4 py-2 text-left">Course</th>
              <th className="px-4 py-2 text-left">Department</th>
              <th className="px-4 py-2 text-left">Semester</th>
              <th className="px-4 py-2 text-left">Day</th>
              <th className="px-4 py-2 text-left">Time</th>
              <th className="px-4 py-2 text-left">Subject</th>
              <th className="px-4 py-2 text-left">Faculty</th>
              <th className="px-4 py-2 text-left">Room</th>
              <th className="px-4 py-2 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {routine.length > 0 ? (
              routine.map((item) => (
                <tr
                  key={item._id}
                  className="odd:bg-gray-50 even:bg-gray-100 dark:odd:bg-gray-800 dark:even:bg-gray-900 hover:bg-indigo-50 dark:hover:bg-gray-700 transition"
                >
                  <td className="px-4 py-2">{item.course?.name || "N/A"}</td>
                  <td className="px-4 py-2">
                    {item.department?.code || "N/A"}
                  </td>
                  <td className="px-4 py-2">{item.semester}</td>
                  <td className="px-4 py-2">{item.day}</td>
                  <td className="px-4 py-2">{item.time}</td>
                  <td className="px-4 py-2">{item.subject}</td>
                  <td className="px-4 py-2">{item.faculty?.name || "N/A"}</td>
                  <td className="px-4 py-2">{item.room?.name || "N/A"}</td>
                  <td className="px-4 py-2">
                    <button
                      onClick={() => handleDelete(item._id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="9"
                  className="text-center py-4 text-gray-600 dark:text-gray-400"
                >
                  No classes added yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Save Routine Button */}
      {routine.length > 0 && (
        <div className="flex justify-end mt-6">
          <button
            onClick={() => toast.success("Routine saved successfully!")}
            className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-md font-semibold transition"
          >
            <CheckCircle2 size={18} /> Save Routine
          </button>
        </div>
      )}
    </div>
  );
};

export default CreateRoutine;
