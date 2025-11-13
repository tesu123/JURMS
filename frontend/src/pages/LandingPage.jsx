// import { Link } from "react-router-dom";

// function LandingPage() {
//   return (
//     <div className="min-h-screen flex flex-col bg-gradient-to-br from-indigo-50 via-white to-purple-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-all duration-500">
//       {/* Navbar */}
//       <header className="w-full backdrop-blur-md bg-white/60 dark:bg-gray-900/40 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50 shadow-sm">
//         <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
//           <h1 className="text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 tracking-tight">
//             JURMS
//           </h1>

//           <nav className="flex gap-4">
//             <Link
//               to="/login"
//               className="px-5 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg text-sm font-medium text-gray-800 dark:text-gray-100 hover:bg-indigo-600 hover:text-white transition duration-300"
//             >
//               Log In
//             </Link>
//             <Link
//               to="/signup"
//               className="px-5 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg text-sm font-semibold shadow-md hover:scale-105 hover:shadow-lg transition duration-300"
//             >
//               Sign Up
//             </Link>
//           </nav>
//         </div>
//       </header>

//       {/* Hero Section */}
//       <main className="flex-1 flex flex-col justify-center items-center text-center px-6 md:px-12 py-20">
//         <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-10 items-center">
//           {/* Left Text Section */}
//           <div className="text-left space-y-6">
//             <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white leading-tight">
//               Manage, Plan & Track <br />
//               <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
//                 Your University Routine
//               </span>
//             </h2>

//             <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
//               JURMS simplifies academic scheduling for students and faculty.
//               Build smarter routines, avoid clashes, and stay organized — all in
//               one dashboard built for universities.
//             </p>

//             <div className="flex flex-wrap gap-4 mt-6">
//               <Link
//                 to="/signup"
//                 className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg font-semibold hover:shadow-xl hover:scale-105 transition duration-300"
//               >
//                 Get Started Free
//               </Link>
//               <Link
//                 to="/learn-more"
//                 className="px-6 py-3 border border-indigo-600 text-indigo-700 dark:text-indigo-300 rounded-lg font-semibold hover:bg-indigo-50 dark:hover:bg-indigo-800 transition duration-300"
//               >
//                 Learn More
//               </Link>
//             </div>
//           </div>

//           {/* Right Image Section */}
//           <div className="flex justify-center">
//             <div className="relative">
//               <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-600 blur-3xl opacity-30 rounded-full animate-pulse"></div>
//               <img
//                 src="https://cdn-icons-png.flaticon.com/512/9938/9938958.png"
//                 alt="Routine Management Illustration"
//                 className="relative w-80 md:w-96 drop-shadow-2xl transform hover:scale-105 transition duration-500"
//               />
//             </div>
//           </div>
//         </div>

//         {/* Highlight Section */}
//         <div className="mt-24 grid grid-cols-1 sm:grid-cols-3 gap-6 text-center max-w-5xl">
//           <div className="p-6 rounded-xl bg-white/60 dark:bg-gray-800/60 backdrop-blur-md shadow-md hover:shadow-lg transition">
//             <h3 className="text-xl font-semibold text-indigo-600 dark:text-indigo-400 mb-2">
//               Automated Timetables
//             </h3>
//             <p className="text-gray-600 dark:text-gray-300 text-sm">
//               Generate conflict-free routines with AI-driven scheduling logic.
//             </p>
//           </div>
//           <div className="p-6 rounded-xl bg-white/60 dark:bg-gray-800/60 backdrop-blur-md shadow-md hover:shadow-lg transition">
//             <h3 className="text-xl font-semibold text-indigo-600 dark:text-indigo-400 mb-2">
//               Department Integration
//             </h3>
//             <p className="text-gray-600 dark:text-gray-300 text-sm">
//               Manage schedules across departments effortlessly in one place.
//             </p>
//           </div>
//           <div className="p-6 rounded-xl bg-white/60 dark:bg-gray-800/60 backdrop-blur-md shadow-md hover:shadow-lg transition">
//             <h3 className="text-xl font-semibold text-indigo-600 dark:text-indigo-400 mb-2">
//               Student & Faculty Access
//             </h3>
//             <p className="text-gray-600 dark:text-gray-300 text-sm">
//               Personalized dashboards for students, teachers, and admins.
//             </p>
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// }

// export default LandingPage;
import { Link } from "react-router-dom";

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-white to-indigo-50 dark:from-gray-900 dark:to-gray-950 transition-all duration-500">
      {/* ---------------- NAVBAR ---------------- */}
      <header className="w-full backdrop-blur-md bg-white/70 dark:bg-gray-900/40 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
          {/* Logo */}
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight bg-gradient-to-r from-indigo-600 to-purple-600 text-transparent bg-clip-text">
            JURMS
          </h1>

          {/* Navigation */}
          <nav className="flex gap-4">
            <Link
              to="/login"
              className="px-5 py-2.5 rounded-lg text-sm font-medium text-gray-800 dark:text-gray-100 border border-gray-300 dark:border-gray-600 hover:bg-indigo-600 hover:text-white transition duration-300"
            >
              Log In
            </Link>
            <Link
              to="/signup"
              className="px-5 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg text-sm font-semibold shadow-md hover:shadow-xl hover:scale-105 transition duration-300"
            >
              Sign Up
            </Link>
          </nav>
        </div>
      </header>

      {/* ---------------- HERO SECTION ---------------- */}
      <main className="flex-1 flex flex-col justify-center items-center text-center px-6 py-20">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          {/* TEXT */}
          <div className="text-left space-y-7">
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white leading-tight tracking-tight">
              A Modern Routine Management System
              <br />
              Built for{" "}
              <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Universities
              </span>
            </h2>

            <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
              JURMS helps students, faculty, and administrators manage academic
              schedules effortlessly. Avoid conflicts, streamline planning, and
              access routines from a unified dashboard.
            </p>

            <div className="flex flex-wrap gap-4 mt-8">
              <Link
                to="/signup"
                className="px-7 py-3 rounded-lg font-semibold text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:shadow-xl hover:scale-105 transition duration-300"
              >
                Get Started Free
              </Link>

              <Link
                to="/learn-more"
                className="px-7 py-3 rounded-lg font-semibold border border-indigo-600 text-indigo-700 dark:text-indigo-300 hover:bg-indigo-50 dark:hover:bg-indigo-800 transition duration-300"
              >
                Learn More
              </Link>
            </div>
          </div>

          {/* IMAGE */}
          <div className="flex justify-center relative">
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-600 blur-[120px] opacity-30"></div>
            <img
              src="https://cdn-icons-png.flaticon.com/512/9938/9938958.png"
              alt="Routine Management"
              className="relative w-80 md:w-96 drop-shadow-2xl animate-fadeIn hover:scale-105 transition duration-500"
            />
          </div>
        </div>

        {/* ---------------- FEATURES SECTION ---------------- */}
        <section className="mt-28 grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-6xl">
          <FeatureCard
            title="Automated Timetables"
            description="Generate clash-free routines with smart validation & optimization."
          />
          <FeatureCard
            title="Department Synchronization"
            description="Manage schedules across multiple departments from one dashboard."
          />
          <FeatureCard
            title="Student & Faculty Access"
            description="Separate dashboards for Students, Teachers, and Administrators."
          />
        </section>
      </main>
    </div>
  );
}

/* ---------------- FEATURE CARD COMPONENT ---------------- */

function FeatureCard({ title, description }) {
  return (
    <div
      className="p-7 rounded-2xl bg-white/80 dark:bg-gray-800/60 
                    backdrop-blur-md shadow-md hover:shadow-xl 
                    hover:-translate-y-1 transition-all"
    >
      <h3 className="text-xl font-semibold text-indigo-600 dark:text-indigo-400 mb-2">
        {title}
      </h3>
      <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
        {description}
      </p>
    </div>
  );
}
