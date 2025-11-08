// src/pages/Routine.jsx
import { useEffect, useState } from "react";
import axios from "axios";
import { Download, CalendarDays, FileSpreadsheet } from "lucide-react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import * as XLSX from "xlsx";
import toast from "react-hot-toast";

const ApiUrl = import.meta.env.VITE_BACKEND_URL;

const Routine = () => {
  const [department, setDepartment] = useState("");
  const [course, setCourse] = useState("");
  const [semester, setSemester] = useState("");
  const [day, setDay] = useState("All");

  const [departments, setDepartments] = useState([]);
  const [courses, setCourses] = useState([]);
  const [routine, setRoutine] = useState([]);
  const [loading, setLoading] = useState(false);

  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
  const timeSlots = [
    "10:00-11:00",
    "11:00-12:00",
    "12:00-01:00",
    "01:00-02:00",
    "02:00-02:30", // recess
    "02:30-03:30",
    "03:30-04:30",
    "04:30-05:30",
  ];

  // ✅ Fetch data
  useEffect(() => {
    fetchDepartments();
    fetchCourses();
    fetchRoutine();
  }, []);

  const fetchDepartments = async () => {
    try {
      const res = await axios.get(`${ApiUrl}/departments/get-departments`, {
        withCredentials: true,
      });
      setDepartments(res.data.data || []);
    } catch (err) {
      toast.error("Failed to load departments");
    }
  };

  const fetchCourses = async () => {
    try {
      const res = await axios.get(`${ApiUrl}/courses/get-courses`, {
        withCredentials: true,
      });
      setCourses(res.data.data || []);
    } catch (err) {
      toast.error("Failed to load courses");
    }
  };

  const fetchRoutine = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${ApiUrl}/routines/get-routines`, {
        withCredentials: true,
      });
      setRoutine(res.data.data || []);
    } catch (err) {
      toast.error("Failed to load routine data");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Filtering
  const filteredRoutine = routine.filter((item) => {
    const matchDept =
      !department ||
      item.department?._id === department ||
      item.department?.code === department;
    const matchCourse =
      !course || item.course?._id === course || item.course?.name === course;
    const matchSem = !semester || item.semester?.toString() === semester;
    const matchDay = day === "All" || item.day === day;

    return matchDept && matchCourse && matchSem && matchDay;
  });

  // ------------------ Export to Excel ------------------
  const handleExcel = () => {
    if (filteredRoutine.length === 0) {
      toast.error("No routine data to export");
      return;
    }

    const worksheet = XLSX.utils.json_to_sheet(
      filteredRoutine.map((item) => ({
        Day: item.day,
        Time: item.time,
        Course: item.course?.name || "-",
        Department: item.department?.code || "-",
        Semester: item.semester || "-",
        Subject: item.subject || "-",
        Faculty: item.faculty?.name || "-",
        Room: item.room?.name || "-",
      }))
    );
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Routine");
    XLSX.writeFile(workbook, "routine.xlsx");
  };

  // ------------------ Export to PDF (Table Layout) ------------------
  const handlePDF = () => {
    const doc = new jsPDF("l", "pt", "a4"); // landscape mode
    doc.setFontSize(14);
    doc.text("JURMS - Weekly Class Routine", 40, 30);

    // Build columns
    const columns = ["Day", ...timeSlots.filter((t) => t !== "02:00-02:30")];

    const body = days.map((day) => {
      const row = [day];

      timeSlots.forEach((slot) => {
        if (slot === "02:00-02:30") return; // skip recess column

        const match = filteredRoutine.find(
          (r) => r.day === day && r.time.startsWith(slot.split("-")[0])
        );

        if (match) {
          row.push(
            `${match.subject}\n${match.faculty?.name || ""}\n[${
              match.room?.name || ""
            }]`
          );
        } else {
          row.push("");
        }
      });

      return row;
    });

    // Add table to PDF
    autoTable(doc, {
      head: [columns],
      body,
      startY: 50,
      styles: {
        cellWidth: "wrap",
        halign: "center",
        valign: "middle",
        fontSize: 9,
      },
      theme: "grid",
      headStyles: { fillColor: [63, 81, 181], textColor: 255 },
      columnStyles: {
        0: { cellWidth: 80 },
      },
      didDrawPage: (data) => {
        // Add "RECESS" in the middle
        const { table } = data;
        const recessX = table.columns[4].x + 30; // approximate middle
        doc.setFontSize(12);
        doc.text("R E C E S S", recessX, table.startY + 160, {
          angle: 90,
        });
      },
    });

    doc.save("routine.pdf");
  };

  return (
    <div className="p-6 text-gray-800 dark:text-gray-100">
      {/* Title */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Weekly Class Routine</h1>
        <div className="flex gap-3">
          <button
            onClick={handlePDF}
            className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md text-sm font-medium transition"
          >
            <Download size={16} /> PDF
          </button>
          <button
            onClick={handleExcel}
            className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md text-sm font-medium transition"
          >
            <FileSpreadsheet size={16} /> Excel
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 bg-gray-100 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 p-4 rounded-lg shadow-sm mb-6">
        <div>
          <label className="block text-sm mb-1 font-medium">Department</label>
          <select
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            className="w-full px-3 py-2 rounded-md bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-200"
          >
            <option value="">Select Department</option>
            {departments.map((d) => (
              <option key={d._id} value={d._id}>
                {d.code} — {d.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm mb-1 font-medium">Course</label>
          <select
            value={course}
            onChange={(e) => setCourse(e.target.value)}
            className="w-full px-3 py-2 rounded-md bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-200"
          >
            <option value="">Select Course</option>
            {courses.map((c) => (
              <option key={c._id} value={c._id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm mb-1 font-medium">Semester</label>
          <select
            value={semester}
            onChange={(e) => setSemester(e.target.value)}
            className="w-full px-3 py-2 rounded-md bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-200"
          >
            <option value="">Select Semester</option>
            {[1, 2, 3, 4, 5, 6].map((sem) => (
              <option key={sem} value={sem}>
                {sem}th
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm mb-1 font-medium">Day</label>
          <select
            value={day}
            onChange={(e) => setDay(e.target.value)}
            className="w-full px-3 py-2 rounded-md bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-200"
          >
            <option value="All">All</option>
            {days.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Routine Table in Grid Format */}
      <div className="overflow-x-auto">
        {loading ? (
          <p className="text-center py-4 text-gray-500">Loading routine...</p>
        ) : (
          <table className="min-w-full border border-gray-400 text-center text-sm">
            <thead className="bg-indigo-600 text-white">
              <tr>
                <th className="border px-2 py-2">Day / Time</th>
                {timeSlots.map((slot, idx) => (
                  <th key={idx} className="border px-2 py-2">
                    {slot}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {days.map((day) => (
                <tr
                  key={day}
                  className="odd:bg-gray-50 even:bg-gray-100 dark:odd:bg-gray-800 dark:even:bg-gray-900"
                >
                  <td className="border font-semibold px-2 py-2">{day}</td>

                  {timeSlots.map((slot, idx) => {
                    if (slot === "02:00-02:30") {
                      return (
                        <td
                          key={idx}
                          rowSpan={days.length}
                          className="border bg-yellow-100 dark:bg-yellow-800 text-xs font-bold"
                          style={{
                            writingMode: "vertical-rl",
                            textOrientation: "upright",
                            fontWeight: "700",
                            letterSpacing: "4px",
                          }}
                        >
                          R E C E S S
                        </td>
                      );
                    }

                    const match = filteredRoutine.find(
                      (r) =>
                        r.day === day && r.time.startsWith(slot.split("-")[0])
                    );

                    return (
                      <td key={idx} className="border px-2 py-2 align-middle">
                        {match ? (
                          <div>
                            <div className="font-semibold">{match.subject}</div>
                            <div className="text-xs">{match.faculty?.name}</div>
                            <div className="text-xs text-gray-500">
                              {match.room?.name}
                            </div>
                          </div>
                        ) : (
                          <span className="text-gray-400">—</span>
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Legend */}
      <div className="mt-4 text-sm text-gray-500 flex items-center gap-2">
        <CalendarDays size={16} />
        <span>
          Note: The routine is displayed and exported in the official timetable
          format.
        </span>
      </div>
    </div>
  );
};

export default Routine;
