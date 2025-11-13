// src/components/Footer.jsx
import { Linkedin, Instagram, Globe } from "lucide-react";

function Footer() {
  return (
    <footer className="bg-white dark:bg-gray-900 shadow-inner">
      <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row justify-between items-center text-center md:text-left">
        {/* Copyright */}
        <p className="text-sm text-gray-600 dark:text-gray-400">
          © {new Date().getFullYear()} jurms. All rights reserved.
        </p>

        {/* Social Links */}
        {/* <div className="flex gap-5 mt-3 md:mt-0">
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
        </div> */}
      </div>
    </footer>
  );
}

export default Footer;
