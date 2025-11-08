// // src/pages/ManageRooms.jsx
// import { useState } from "react";
// import { PlusCircle, Trash2, Building2, AlertTriangle } from "lucide-react";

// const ManageRooms = () => {
//   const [rooms, setRooms] = useState([
//     { name: "CSE-201", capacity: 60, type: "Classroom", department: "CSE" },
//     { name: "Lab-1", capacity: 40, type: "Lab", department: "IT" },
//   ]);

//   const [formData, setFormData] = useState({
//     name: "",
//     capacity: "",
//     type: "",
//     department: "",
//   });
//   const [error, setError] = useState("");

//   const departments = ["CSE", "IT", "ECE", "ME", "CIVIL", "EEE"];

//   // ✅ Handle Add Room
//   const handleAddRoom = () => {
//     setError("");

//     if (!formData.name || !formData.capacity || !formData.type || !formData.department) {
//       setError("⚠️ Please fill all fields before adding.");
//       return;
//     }

//     // Prevent duplicate room names (case-insensitive)
//     const roomExists = rooms.some(
//       (r) => r.name.toLowerCase() === formData.name.toLowerCase()
//     );
//     if (roomExists) {
//       setError("⚠️ Room already exists!");
//       return;
//     }

//     const newRoom = {
//       name: formData.name,
//       capacity: parseInt(formData.capacity),
//       type: formData.type,
//       department: formData.department,
//     };

//     setRooms((prev) => [...prev, newRoom]);
//     setFormData({ name: "", capacity: "", type: "", department: "" });
//   };

//   // 🧹 Delete a room
//   const handleDelete = (index) => {
//     setRooms((prev) => prev.filter((_, i) => i !== index));
//   };

//   return (
//     <div className="p-6 text-gray-800 dark:text-gray-100">
//       {/* Header */}
//       <div className="flex items-center justify-between mb-6">
//         <h1 className="text-2xl font-bold flex items-center gap-2">
//           <Building2 className="text-indigo-600 dark:text-indigo-400" />
//           Manage Rooms & Resources
//         </h1>
//       </div>

//       {/* Add Room Form */}
//       <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 shadow-sm mb-6">
//         <h2 className="text-lg font-semibold mb-4">Add New Room</h2>

//         {error && (
//           <div className="flex items-center gap-2 mb-3 text-yellow-600 dark:text-yellow-400">
//             <AlertTriangle size={18} />
//             <span>{error}</span>
//           </div>
//         )}

//         <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
//           {/* Room Name */}
//           <div>
//             <label className="block text-sm font-medium mb-1">Room Name</label>
//             <input
//               type="text"
//               placeholder="e.g., CSE-202 or Lab-1"
//               value={formData.name}
//               onChange={(e) =>
//                 setFormData({ ...formData, name: e.target.value })
//               }
//               className="w-full px-3 py-2 rounded-md bg-transparent border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-indigo-500 outline-none"
//             />
//           </div>

//           {/* Capacity */}
//           <div>
//             <label className="block text-sm font-medium mb-1">Capacity</label>
//             <input
//               type="number"
//               placeholder="e.g., 60"
//               value={formData.capacity}
//               onChange={(e) =>
//                 setFormData({ ...formData, capacity: e.target.value })
//               }
//               className="w-full px-3 py-2 rounded-md bg-transparent border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-indigo-500 outline-none"
//             />
//           </div>

//           {/* Room Type */}
//           <div>
//             <label className="block text-sm font-medium mb-1">Type</label>
//             <select
//               value={formData.type}
//               onChange={(e) =>
//                 setFormData({ ...formData, type: e.target.value })
//               }
//               className="w-full px-3 py-2 rounded-md bg-transparent border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-indigo-500 outline-none"
//             >
//               <option value="">Select Type</option>
//               <option value="Classroom">Classroom</option>
//               <option value="Lab">Lab</option>
//               <option value="Seminar Hall">Seminar Hall</option>
//             </select>
//           </div>

//           {/* Department */}
//           <div>
//             <label className="block text-sm font-medium mb-1">Department</label>
//             <select
//               value={formData.department}
//               onChange={(e) =>
//                 setFormData({ ...formData, department: e.target.value })
//               }
//               className="w-full px-3 py-2 rounded-md bg-transparent border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-indigo-500 outline-none"
//             >
//               <option value="">Select Department</option>
//               {departments.map((dept) => (
//                 <option key={dept} value={dept}>
//                   {dept}
//                 </option>
//               ))}
//             </select>
//           </div>
//         </div>

//         {/* Add Button */}
//         <div className="flex justify-end mt-4">
//           <button
//             onClick={handleAddRoom}
//             className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-md font-semibold transition"
//           >
//             <PlusCircle size={18} /> Add Room
//           </button>
//         </div>
//       </div>

//       {/* Room List Table */}
//       <div className="overflow-x-auto">
//         <table className="min-w-full border border-gray-300 dark:border-gray-700 rounded-lg overflow-hidden">
//           <thead className="bg-indigo-600 text-white">
//             <tr>
//               <th className="px-4 py-2 text-left">Room Name</th>
//               <th className="px-4 py-2 text-left">Capacity</th>
//               <th className="px-4 py-2 text-left">Type</th>
//               <th className="px-4 py-2 text-left">Department</th>
//               <th className="px-4 py-2 text-left">Action</th>
//             </tr>
//           </thead>
//           <tbody>
//             {rooms.length > 0 ? (
//               rooms.map((room, index) => (
//                 <tr
//                   key={index}
//                   className="odd:bg-white even:bg-gray-50 dark:odd:bg-gray-800 dark:even:bg-gray-700 hover:bg-indigo-50 dark:hover:bg-gray-600 transition"
//                 >
//                   <td className="px-4 py-2 font-medium">{room.name}</td>
//                   <td className="px-4 py-2">{room.capacity}</td>
//                   <td className="px-4 py-2">{room.type}</td>
//                   <td className="px-4 py-2">{room.department}</td>
//                   <td className="px-4 py-2">
//                     <button
//                       onClick={() => handleDelete(index)}
//                       className="text-red-500 hover:text-red-700 transition"
//                     >
//                       <Trash2 size={18} />
//                     </button>
//                   </td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td
//                   colSpan="5"
//                   className="text-center py-4 text-gray-500 dark:text-gray-400"
//                 >
//                   No rooms added yet.
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default ManageRooms;

import { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { PlusCircle, Trash2, Building2, AlertTriangle } from "lucide-react";

const ApiUrl = import.meta.env.VITE_BACKEND_URL; // Example: http://localhost:5000/api/v1

const ManageRooms = () => {
  const [rooms, setRooms] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    capacity: "",
    type: "",
    department: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // ✅ Fetch Rooms
  const fetchRooms = async () => {
    try {
      const res = await axios.get(`${ApiUrl}/rooms/get-rooms`, {
        withCredentials: true,
      });
      setRooms(res.data.data || res.data);
    } catch (err) {
      console.error("Error fetching rooms:", err);
      toast.error("Failed to load rooms.");
    }
  };

  // ✅ Fetch Departments (for dropdown)
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
    fetchRooms();
    fetchDepartments();
  }, []);

  // ✅ Add Room
  const handleAddRoom = async () => {
    setError("");

    if (
      !formData.name ||
      !formData.capacity ||
      !formData.type ||
      !formData.department
    ) {
      setError("⚠️ Please fill all fields before adding.");
      return;
    }

    try {
      setLoading(true);
      const res = await axios.post(`${ApiUrl}/rooms/add-room`, formData, {
        withCredentials: true,
      });

      toast.success("Room added successfully");
      setRooms((prev) => [...prev, res.data.data || res.data]);
      setFormData({ name: "", capacity: "", type: "", department: "" });
    } catch (err) {
      console.error("Error adding room:", err);
      if (err.response?.status === 400) {
        toast.error(err.response.data.message || "Room already exists!");
      } else {
        toast.error("Error adding room.");
      }
    } finally {
      setLoading(false);
    }
  };

  // 🧹 Delete Room
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this room?")) return;

    try {
      await axios.delete(`${ApiUrl}/rooms/delete-room/${id}`, {
        withCredentials: true,
      });
      toast.success("Room deleted");
      setRooms((prev) => prev.filter((r) => r._id !== id));
    } catch (err) {
      console.error("Error deleting room:", err);
      toast.error("Failed to delete room");
    }
  };

  return (
    <div className="p-6 text-gray-800 dark:text-gray-100">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <Building2 className="text-indigo-600 dark:text-indigo-400" />
          Manage Rooms & Resources
        </h1>
      </div>

      {/* Add Room Form */}
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 shadow-sm mb-6">
        <h2 className="text-lg font-semibold mb-4">Add New Room</h2>

        {error && (
          <div className="flex items-center gap-2 mb-3 text-yellow-600 dark:text-yellow-400">
            <AlertTriangle size={18} />
            <span>{error}</span>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Room Name */}
          <div>
            <label className="block text-sm font-medium mb-1">Room Name</label>
            <input
              type="text"
              placeholder="e.g., CSE-202 or Lab-1"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="w-full px-3 py-2 rounded-md bg-transparent border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-indigo-500 outline-none"
            />
          </div>

          {/* Capacity */}
          <div>
            <label className="block text-sm font-medium mb-1">Capacity</label>
            <input
              type="number"
              placeholder="e.g., 60"
              value={formData.capacity}
              onChange={(e) =>
                setFormData({ ...formData, capacity: e.target.value })
              }
              className="w-full px-3 py-2 rounded-md bg-transparent border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-indigo-500 outline-none"
            />
          </div>

          {/* Type */}
          <div>
            <label className="block text-sm font-medium mb-1">Type</label>
            <select
              value={formData.type}
              onChange={(e) =>
                setFormData({ ...formData, type: e.target.value })
              }
              className="w-full px-3 py-2 rounded-md bg-transparent border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-indigo-500 outline-none"
            >
              <option value="">Select Type</option>
              <option value="Classroom">Classroom</option>
              <option value="Lab">Lab</option>
              <option value="Seminar Hall">Seminar Hall</option>
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
        </div>

        {/* Add Button */}
        <div className="flex justify-end mt-4">
          <button
            onClick={handleAddRoom}
            disabled={loading}
            className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-md font-semibold transition disabled:opacity-50"
          >
            <PlusCircle size={18} />
            {loading ? "Adding..." : "Add Room"}
          </button>
        </div>
      </div>

      {/* Room List Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300 dark:border-gray-700 rounded-lg overflow-hidden">
          <thead className="bg-indigo-600 text-white">
            <tr>
              <th className="px-4 py-2 text-left">Room Name</th>
              <th className="px-4 py-2 text-left">Capacity</th>
              <th className="px-4 py-2 text-left">Type</th>
              <th className="px-4 py-2 text-left">Department</th>
              <th className="px-4 py-2 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {rooms.length > 0 ? (
              rooms.map((room) => (
                <tr
                  key={room._id}
                  className="odd:bg-white even:bg-gray-50 dark:odd:bg-gray-800 dark:even:bg-gray-700 hover:bg-indigo-50 dark:hover:bg-gray-600 transition"
                >
                  <td className="px-4 py-2 font-medium">{room.name}</td>
                  <td className="px-4 py-2">{room.capacity}</td>
                  <td className="px-4 py-2">{room.type}</td>
                  <td className="px-4 py-2">
                    {room.department?.code || "N/A"}
                  </td>
                  <td className="px-4 py-2">
                    <button
                      onClick={() => handleDelete(room._id)}
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
                  colSpan="5"
                  className="text-center py-4 text-gray-500 dark:text-gray-400"
                >
                  No rooms added yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageRooms;
