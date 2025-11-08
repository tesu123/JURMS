// src/pages/Routine.jsx
import { useState } from "react";
import { Download, CalendarDays, FileSpreadsheet } from "lucide-react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import * as XLSX from "xlsx";

const Routine = () => {
  const [department, setDepartment] = useState("");
  const [course, setCourse] = useState("");
  const [semester, setSemester] = useState("");
  const [day, setDay] = useState("All");

  // Mock Data — Replace this with your backend API data
  const timetable = [
    {
      day: "Monday",
      time: "10:00 AM - 11:00 AM",
      subject: "Data Structures",
      faculty: "Prof. A. Das",
      room: "CSE-204",
    },
    {
      day: "Monday",
      time: "11:00 AM - 12:00 PM",
      subject: "Computer Networks",
      faculty: "Prof. R. Sen",
      room: "CSE-205",
    },
    {
      day: "Tuesday",
      time: "9:00 AM - 10:00 AM",
      subject: "DBMS",
      faculty: "Dr. S. Gupta",
      room: "CSE-101",
    },
  ];

  const filteredRoutine =
    day === "All" ? timetable : timetable.filter((item) => item.day === day);

  // ------------------ Export to PDF ------------------
  const handlePDF = () => {
    const doc = new jsPDF();
    doc.text("JURMS - Personal Timetable", 14, 15);
    autoTable(doc, {
      startY: 25,
      head: [["Day", "Time", "Subject", "Faculty", "Room"]],
      body: filteredRoutine.map((item) => [
        item.day,
        item.time,
        item.subject,
        item.faculty,
        item.room,
      ]),
    });
    doc.save("routine.pdf");
  };

  // ------------------ Export to Excel ------------------
  const handleExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(filteredRoutine);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Routine");
    XLSX.writeFile(workbook, "routine.xlsx");
  };

  return (
    <div className="p-6 text-gray-800 dark:text-gray-100">
      {/* Title */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Student Routine</h1>
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

      {/* Filter Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-4 rounded-lg shadow-sm mb-6">
        {/* Department */}
        <div>
          <label className="block text-sm mb-1 font-medium text-gray-700 dark:text-gray-300">
            Department
          </label>
          <select
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            className="w-full bg-transparent border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 focus:ring-2 focus:ring-indigo-500 outline-none"
          >
            <option value="">Select Department</option>
            <option value="CSE">Computer Science</option>
            <option value="ECE">Electronics</option>
            <option value="ME">Mechanical</option>
          </select>
        </div>

        {/* Course */}
        <div>
          <label className="block text-sm mb-1 font-medium text-gray-700 dark:text-gray-300">
            Course
          </label>
          <select
            value={course}
            onChange={(e) => setCourse(e.target.value)}
            className="w-full bg-transparent border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 focus:ring-2 focus:ring-indigo-500 outline-none"
          >
            <option value="">Select Course</option>
            <option value="BTech">B.Tech</option>
            <option value="MCA">MCA</option>
            <option value="MTech">M.Tech</option>
          </select>
        </div>

        {/* Semester */}
        <div>
          <label className="block text-sm mb-1 font-medium text-gray-700 dark:text-gray-300">
            Semester
          </label>
          <select
            value={semester}
            onChange={(e) => setSemester(e.target.value)}
            className="w-full bg-transparent border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 focus:ring-2 focus:ring-indigo-500 outline-none"
          >
            <option value="">Select Semester</option>
            <option value="1">1st</option>
            <option value="2">2nd</option>
            <option value="3">3rd</option>
            <option value="4">4th</option>
            <option value="5">5th</option>
            <option value="6">6th</option>
          </select>
        </div>

        {/* Day Filter */}
        <div>
          <label className="block text-sm mb-1 font-medium text-gray-700 dark:text-gray-300">
            Filter by Day
          </label>
          <select
            value={day}
            onChange={(e) => setDay(e.target.value)}
            className="w-full bg-transparent border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 focus:ring-2 focus:ring-indigo-500 outline-none"
          >
            <option value="All">All</option>
            <option value="Monday">Monday</option>
            <option value="Tuesday">Tuesday</option>
            <option value="Wednesday">Wednesday</option>
            <option value="Thursday">Thursday</option>
            <option value="Friday">Friday</option>
          </select>
        </div>
      </div>

      {/* Routine Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
          <thead className="bg-indigo-600 text-white">
            <tr>
              <th className="px-4 py-2 text-left">Day</th>
              <th className="px-4 py-2 text-left">Time</th>
              <th className="px-4 py-2 text-left">Subject</th>
              <th className="px-4 py-2 text-left">Faculty</th>
              <th className="px-4 py-2 text-left">Room</th>
            </tr>
          </thead>
          <tbody>
            {filteredRoutine.length > 0 ? (
              filteredRoutine.map((item, index) => (
                <tr
                  key={index}
                  className="odd:bg-white even:bg-gray-50 dark:odd:bg-gray-800 dark:even:bg-gray-700 hover:bg-indigo-50 dark:hover:bg-gray-600 transition"
                >
                  <td className="px-4 py-2 font-medium">{item.day}</td>
                  <td className="px-4 py-2">{item.time}</td>
                  <td className="px-4 py-2">{item.subject}</td>
                  <td className="px-4 py-2">{item.faculty}</td>
                  <td className="px-4 py-2">{item.room}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="5"
                  className="text-center py-4 text-gray-500 dark:text-gray-400"
                >
                  No routine data available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Legend or Note */}
      <div className="mt-4 text-sm text-gray-500 dark:text-gray-400 flex items-center gap-2">
        <CalendarDays size={16} />
        <span>
          Note: Routine displayed is based on your selected department and
          semester.
        </span>
      </div>
    </div>
  );
};

export default Routine;
