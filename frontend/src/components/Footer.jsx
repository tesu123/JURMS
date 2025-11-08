// src/components/Footer.jsx
import { Linkedin, Instagram, Globe } from "lucide-react";

function Footer() {
  return (
    <footer className="bg-white dark:bg-gray-900 shadow-inner">
      <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row justify-between items-center text-center md:text-left">
        {/* Copyright */}
        <p className="text-sm text-gray-600 dark:text-gray-400">
          © {new Date().getFullYear()} Monetrix. All rights reserved.
        </p>

        {/* Social Links */}
        <div className="flex gap-5 mt-3 md:mt-0">
          <a
            href="https://abhijitrabidas.live"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 dark:text-gray-300 hover:text-purple-600 transition"
          >
            <Globe className="w-5 h-5" />
          </a>
          <a
            href="https://www.linkedin.com/in/abhijit-rabidas/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 dark:text-gray-300 hover:text-purple-600 transition"
          >
            <Linkedin className="w-5 h-5" />
          </a>
          <a
            href="https://www.instagram.com/aj_das_01/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 dark:text-gray-300 hover:text-purple-600 transition"
          >
            <Instagram className="w-5 h-5" />
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

// src/components/Footer.jsx

// function Footer() {
//   return (
//     <footer className="bg-gradient-to-r from-indigo-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 border-t border-gray-200 dark:border-gray-700">
//       <div className="max-w-7xl mx-auto px-6 py-10 flex flex-col md:flex-row justify-between items-center text-center md:text-left gap-4">
//         {/* Left Section */}
//         <div>
//           <h2 className="text-2xl font-bold text-indigo-700 dark:text-indigo-400 tracking-tight">
//             JURMS
//           </h2>
//           <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
//             Jadavpur University Routine Management System <br />
//             Simplifying academic scheduling for students and faculty.
//           </p>
//         </div>

//         {/* Right Section */}
//         <div className="text-sm text-gray-600 dark:text-gray-400 mt-4 md:mt-0">
//           © {new Date().getFullYear()}{" "}
//           <span className="font-semibold text-indigo-600 dark:text-indigo-400">
//             JURMS
//           </span>{" "}
//           · All Rights Reserved
//         </div>
//       </div>

//       {/* Accent Line */}
//       <div className="h-1 bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-500" />
//     </footer>
//   );
// }

// export default Footer;
