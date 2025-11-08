// src/pages/CreateRoutine.jsx
import { useState } from "react";
import {
  CalendarPlus,
  Trash2,
  CheckCircle2,
  AlertTriangle,
} from "lucide-react";

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

  // Mock Data — replace with backend data later
  const courses = ["B.Tech", "MCA", "BCA", "M.Tech"];
  const subjects = ["Data Structures", "DBMS", "OS", "Computer Networks"];
  const faculties = ["Prof. A. Das", "Dr. R. Sen", "Prof. S. Ghosh"];
  const rooms = ["CSE-201", "CSE-202", "Lab-1", "Lab-2"];

  // ✅ Handle Adding Routine Slot
  const handleAddClass = () => {
    setConflict("");

    // Validation — all fields must be filled
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

    // Check for conflicts
    const hasConflict = routine.some(
      (item) =>
        item.day === formData.day &&
        item.time === formData.time &&
        (item.faculty === formData.faculty || item.room === formData.room)
    );

    if (hasConflict) {
      setConflict(
        "⚠️ Conflict detected! Same faculty or room already assigned in this slot."
      );
      return;
    }

    // Add new routine entry
    setRoutine((prev) => [...prev, { ...formData }]);
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
  };

  // 🧹 Remove specific class
  const handleRemove = (index) => {
    setRoutine((prev) => prev.filter((_, i) => i !== index));
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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-4 rounded-lg shadow-sm mb-6">
        
        {/* ✅ Course */}
        <div>
          <label className="block text-sm font-medium mb-1">Course</label>
          <select
            value={formData.course}
            onChange={(e) =>
              setFormData({ ...formData, course: e.target.value })
            }
            className="w-full bg-transparent border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 focus:ring-2 focus:ring-indigo-500 outline-none"
          >
            <option value="">Select Course</option>
            {courses.map((c) => (
              <option key={c} value={c}>
                {c}
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
            className="w-full bg-transparent border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 focus:ring-2 focus:ring-indigo-500 outline-none"
          >
            <option value="">Select Department</option>
            <option value="CSE">CSE</option>
            <option value="ECE">ECE</option>
            <option value="ME">ME</option>
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
            className="w-full bg-transparent border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 focus:ring-2 focus:ring-indigo-500 outline-none"
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
          <select
            value={formData.subject}
            onChange={(e) =>
              setFormData({ ...formData, subject: e.target.value })
            }
            className="w-full bg-transparent border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 focus:ring-2 focus:ring-indigo-500 outline-none"
          >
            <option value="">Select Subject</option>
            {subjects.map((sub) => (
              <option key={sub} value={sub}>
                {sub}
              </option>
            ))}
          </select>
        </div>

        {/* Faculty */}
        <div>
          <label className="block text-sm font-medium mb-1">Faculty</label>
          <select
            value={formData.faculty}
            onChange={(e) =>
              setFormData({ ...formData, faculty: e.target.value })
            }
            className="w-full bg-transparent border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 focus:ring-2 focus:ring-indigo-500 outline-none"
          >
            <option value="">Select Faculty</option>
            {faculties.map((f) => (
              <option key={f} value={f}>
                {f}
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
            className="w-full bg-transparent border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 focus:ring-2 focus:ring-indigo-500 outline-none"
          >
            <option value="">Select Room</option>
            {rooms.map((r) => (
              <option key={r} value={r}>
                {r}
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
            className="w-full bg-transparent border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 focus:ring-2 focus:ring-indigo-500 outline-none"
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
            className="w-full bg-transparent border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 focus:ring-2 focus:ring-indigo-500 outline-none"
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
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-md font-semibold transition"
          >
            Add to Routine
          </button>
        </div>
      </div>

      {/* Conflict Message */}
      {conflict && (
        <div className="flex items-center gap-2 text-yellow-600 dark:text-yellow-400 mb-4">
          <AlertTriangle size={18} /> <p>{conflict}</p>
        </div>
      )}

      {/* Weekly Routine Grid */}
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
              routine.map((item, index) => (
                <tr
                  key={index}
                  className="odd:bg-white even:bg-gray-50 dark:odd:bg-gray-800 dark:even:bg-gray-700 hover:bg-indigo-50 dark:hover:bg-gray-600 transition"
                >
                  <td className="px-4 py-2">{item.course}</td>
                  <td className="px-4 py-2">{item.department}</td>
                  <td className="px-4 py-2">{item.semester}</td>
                  <td className="px-4 py-2 font-medium">{item.day}</td>
                  <td className="px-4 py-2">{item.time}</td>
                  <td className="px-4 py-2">{item.subject}</td>
                  <td className="px-4 py-2">{item.faculty}</td>
                  <td className="px-4 py-2">{item.room}</td>
                  <td className="px-4 py-2">
                    <button
                      onClick={() => handleRemove(index)}
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
                  className="text-center py-4 text-gray-500 dark:text-gray-400"
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
          <button className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-md font-semibold transition">
            <CheckCircle2 size={18} /> Save Routine
          </button>
        </div>
      )}
    </div>
  );
};

export default CreateRoutine;
