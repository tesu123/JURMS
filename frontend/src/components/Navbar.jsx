import { FaBars } from "react-icons/fa";

const Navbar = ({ toggleSidebar }) => {
  return (
    <div className="md:hidden flex items-center justify-between px-4 py-3 bg-gray-200 dark:bg-gray-900 shadow">
      {/* Hamburger Button */}
      <button
        onClick={toggleSidebar}
        className="text-2xl text-purple-600 dark:text-purple-400"
      >
        <FaBars />
      </button>

      {/* Title */}
      <h1 className="text-3xl font-extrabold bg-gradient-to-r from-purple-600 to-pink-500 text-transparent bg-clip-text animate-pulse tracking-wide">
        Monetrix
      </h1>
    </div>
  );
};

export default Navbar;
