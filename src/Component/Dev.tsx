// import { motion } from "framer-motion";
// import { FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";
// import { BiMessageSquareDetail } from "react-icons/bi";
// import { RiTodoLine } from "react-icons/ri";
// import { FaCalculator } from "react-icons/fa";
// import { CgProfile } from "react-icons/cg";
// import Navbar from "./Navbar";

// const Dev = () => {
//   const features = [
//     {
//       icon: <BiMessageSquareDetail className="w-6 h-6" />,
//       title: "Real-time Chat",
//       description:
//         "Connect with users instantly through our real-time messaging system powered by WebSocket",
//     },
//     {
//       icon: <RiTodoLine className="w-6 h-6" />,
//       title: "Todo Management",
//       description: "Stay organized with our intuitive todo list feature",
//     },
//     {
//       icon: <FaCalculator className="w-6 h-6" />,
//       title: "Calculator",
//       description:
//         "Perform quick calculations with our beautiful calculator interface",
//     },
//     {
//       icon: <CgProfile className="w-6 h-6" />,
//       title: "Profile Management",
//       description:
//         "Customize your profile and manage your personal information",
//     },
//   ];

//   const socialLinks = [
//     {
//       icon: <FaGithub className="w-6 h-6" />,
//       url: "https://github.com/Manish-keer19",
//       label: "GitHub",
//     },
//     {
//       icon: <FaLinkedin className="w-6 h-6" />,
//       url: "https://www.linkedin.com/in/manish-keer-93a212247/",
//       label: "LinkedIn",
//     },
//     {
//       icon: <FaInstagram className="w-6 h-6" />,
//       url: "https://www.instagram.com/manish_keer19/",
//       label: "Instagram",
//     },
//   ];

//   return (
//     <div>
//       <Navbar />
//       <div className="min-h-screen bg-gradient-to-br from-purple-900 via-gray-900 to-black text-white p-4 sm:p-6 md:p-8 ">
//         <div className="container mx-auto max-w-6xl">
//           {/* Hero Section */}
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6 }}
//             className="text-center mb-12 sm:mb-16"
//           >
//             <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
//               Chat Web App
//             </h1>
//             <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto">
//               A modern Web application built with React and TypeScript,
//               featuring real-time chat, todo management, and more.
//             </p>
//           </motion.div>

//           {/* Features Grid */}
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
//             {features.map((feature, index) => (
//               <motion.div
//                 key={index}
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.6, delay: index * 0.1 }}
//                 className="bg-opacity-20 backdrop-blur-xl bg-gray-900 rounded-2xl p-6 border border-opacity-30 border-purple-500 hover:border-opacity-50 transition-all duration-300"
//               >
//                 <div className="bg-purple-500 bg-opacity-20 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
//                   {feature.icon}
//                 </div>
//                 <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
//                 <p className="text-gray-400">{feature.description}</p>
//               </motion.div>
//             ))}
//           </div>

//           {/* Creator Section */}
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6, delay: 0.4 }}
//             className="bg-opacity-20 backdrop-blur-xl bg-gray-900 rounded-2xl p-6 sm:p-8 border border-opacity-30 border-purple-500 mb-8"
//           >
//             <div className="flex flex-col sm:flex-row items-center gap-6">
//               <motion.img
//                 whileHover={{ scale: 1.05 }}
//                 src="https://avatars.githubusercontent.com/u/147429908?s=400&u=b1b05db8a7e03ca4de06f8996e5d0ac2254a9bc9&v=4"
//                 alt="Manish Keer"
//                 className="w-32 h-32 rounded-full object-cover border-4 border-purple-500"
//               />
//               <div>
//                 <h2 className="text-2xl sm:text-3xl font-bold mb-2">
//                   Created by Manish Keer
//                 </h2>
//                 <p className="text-gray-400 mb-4">
//                   Full-stack developer passionate about creating beautiful and
//                   functional applications.
//                 </p>
//                 <div className="flex gap-4">
//                   {socialLinks.map((link, index) => (
//                     <motion.a
//                       key={index}
//                       href={link.url}
//                       target="_blank"
//                       rel="noopener noreferrer"
//                       whileHover={{ scale: 1.1 }}
//                       whileTap={{ scale: 0.95 }}
//                       className="bg-gray-800 p-3 rounded-lg hover:bg-gray-700 transition-colors"
//                       aria-label={link.label}
//                     >
//                       {link.icon}
//                     </motion.a>
//                   ))}
//                 </div>
//               </div>
//             </div>
//           </motion.div>

//           {/* Android App Section */}
// <motion.div
//   initial={{ opacity: 0, y: 20 }}
//   animate={{ opacity: 1, y: 0 }}
//   transition={{ duration: 0.6, delay: 0.5 }}
//   className="bg-opacity-20 backdrop-blur-xl bg-gray-900 rounded-2xl p-6 sm:p-8 border border-opacity-30 border-purple-500 mb-8"
// >
//   <div className="flex flex-col md:flex-row items-center gap-6">
//     <motion.div 
//       whileHover={{ scale: 1.03 }}
//       className="flex-shrink-0"
//     >
//       <img 
//         src="https://cdn-icons-png.flaticon.com/512/226/226770.png" 
//         alt="Android Logo" 
//         className="w-32 h-32 object-contain"
//       />
//     </motion.div>
//     <div>
//       <h2 className="text-2xl sm:text-3xl font-bold mb-2">
//         Android Version Available
//       </h2>
//       <p className="text-gray-400 mb-4">
//         Experience the same great features on your Android device with our 
//         dedicated mobile application.
//       </p>
//       <motion.a
//         href="https://github.com/Manish-keer19/chatAndroidApp"
//         target="_blank"
//         rel="noopener noreferrer"
//         whileHover={{ scale: 1.02 }}
//         whileTap={{ scale: 0.98 }}
//         className="inline-flex items-center px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded-lg font-medium transition-colors"
//       >
//         <FaGithub className="mr-2" />
//         View on GitHub
//       </motion.a>
//     </div>
//   </div>
// </motion.div>


//           {/* Technologies Used */}
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6, delay: 0.6 }}
//             className="text-center"
//           >
//             <h2 className="text-2xl font-bold mb-4">
//               Built with Modern Technologies
//             </h2>
//             <div className="flex flex-wrap justify-center gap-4">
//               {[
//                 "React",
//                 "TypeScript",
//                 "Tailwind CSS",
//                 "WebSocket",
//                 "Node.js",
//                 "Spring Boot",
//                 "MongoDB",
//                 "Spring Security",
//                 "Jwt",
//                 "Electron",
//               ].map((tech, index) => (
//                 <motion.span
//                   key={index}
//                   initial={{ opacity: 0, scale: 0.5 }}
//                   animate={{ opacity: 1, scale: 1 }}
//                   transition={{ duration: 0.3, delay: index * 0.1 }}
//                   className="px-4 py-2 bg-purple-500 bg-opacity-20 rounded-full text-sm"
//                 >
//                   {tech}
//                 </motion.span>
//               ))}
//             </div>
//           </motion.div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Dev;





import { motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaInstagram, FaGooglePlay, FaAndroid } from "react-icons/fa";
import { BiMessageSquareDetail } from "react-icons/bi";
import { RiTodoLine } from "react-icons/ri";
import { FaCalculator } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import Navbar from "./Navbar";

const Dev = () => {
  const features = [
    {
      icon: <BiMessageSquareDetail className="w-6 h-6" />,
      title: "Real-time Chat",
      description: "Experience seamless communication with our WebSocket-powered chat that works across all your devices",
    },
    {
      icon: <RiTodoLine className="w-6 h-6" />,
      title: "Smart Todo System",
      description: "Organize your life with our intelligent task management that syncs everywhere",
    },
    {
      icon: <FaCalculator className="w-6 h-6" />,
      title: "Calculator+",
      description: "More than just calculations - a productivity tool that remembers your last session",
    },
    {
      icon: <CgProfile className="w-6 h-6" />,
      title: "Unified Profile",
      description: "One profile to rule them all - works across web and mobile platforms",
    },
  ];

  const socialLinks = [
    {
      icon: <FaGithub className="w-6 h-6" />,
      url: "https://github.com/Manish-keer19",
      label: "GitHub",
    },
    {
      icon: <FaLinkedin className="w-6 h-6" />,
      url: "https://www.linkedin.com/in/manish-keer-93a212247/",
      label: "LinkedIn",
    },
    {
      icon: <FaInstagram className="w-6 h-6" />,
      url: "https://www.instagram.com/manish_keer19/",
      label: "Instagram",
    },
  ];

  return (
    <div>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-gray-900 to-black text-white p-4 sm:p-6 md:p-8">
        <div className="container mx-auto max-w-6xl">
          {/* Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12 sm:mb-16"
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
             Real-Time Chat App (Web, Android, Desktop)
            </h1>
            <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto">
              As a full-stack developer, I've built this cross-platform solution to showcase 
              modern web and mobile capabilities. Seamless experience across all your devices.
            </p>
          </motion.div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-opacity-20 backdrop-blur-xl bg-gray-900 rounded-2xl p-6 border border-opacity-30 border-purple-500 hover:border-opacity-50 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/20"
              >
                <div className="bg-gradient-to-br from-purple-500 to-pink-500 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </motion.div>
            ))}
          </div>

          {/* Creator Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-opacity-20 backdrop-blur-xl bg-gray-900 rounded-2xl p-6 sm:p-8 border border-opacity-30 border-purple-500 mb-8"
          >
            <div className="flex flex-col sm:flex-row items-center gap-6">
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="relative"
              >
                <img
                  src="https://avatars.githubusercontent.com/u/147429908?s=400&u=b1b05db8a7e03ca4de06f8996e5d0ac2254a9bc9&v=4"
                  alt="Manish Keer"
                  className="w-32 h-32 rounded-full object-cover border-4 border-purple-500"
                />
                <div className="absolute -bottom-2 -right-2 bg-purple-600 rounded-full p-2">
                  <div className="w-8 h-8 flex items-center justify-center">👨‍💻</div>
                </div>
              </motion.div>
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold mb-2">
                  Crafted with Passion by Manish Keer
                </h2>
                <p className="text-gray-400 mb-4">
                  I build digital experiences that bridge platforms. This project represents 
                  my commitment to full-stack excellence - from web to native mobile.
                </p>
                <div className="flex gap-4">
                  {socialLinks.map((link, index) => (
                    <motion.a
                      key={index}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.1, y: -3 }}
                      whileTap={{ scale: 0.95 }}
                      className="bg-gray-800 p-3 rounded-lg hover:bg-gradient-to-br from-purple-600 to-pink-600 transition-all duration-300"
                      aria-label={link.label}
                    >
                      {link.icon}
                    </motion.a>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Android App Section - Improved */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="bg-gradient-to-br from-purple-900/50 to-gray-900/50 backdrop-blur-xl rounded-2xl p-6 sm:p-8 border border-opacity-30 border-purple-500 mb-8 overflow-hidden relative"
          >
            <div className="absolute -top-20 -right-20 w-40 h-40 bg-purple-500 rounded-full filter blur-3xl opacity-20"></div>
            <div className="flex flex-col md:flex-row items-center gap-8 relative">
              <motion.div 
                whileHover={{ scale: 1.03 }}
                className="flex-shrink-0 relative"
              >
                <div className="absolute -inset-4 bg-purple-500 rounded-2xl blur-lg opacity-20"></div>
                <div className="relative bg-gray-800 p-6 rounded-2xl border border-gray-700">
                  <FaAndroid className="w-24 h-24 text-green-400" />
                </div>
              </motion.div>
              <div className="flex-1">
                <h2 className="text-2xl sm:text-3xl font-bold mb-3">
                  Native Android Experience
                </h2>
                <p className="text-gray-300 mb-6">
                  I've engineered a dedicated Android version that delivers optimal 
                  performance and native feel. The app includes all web features plus 
                  mobile-exclusive enhancements like push notifications and offline support.
                </p>
                <div className="flex flex-wrap gap-4">
                  <motion.a
                    href="https://github.com/Manish-keer19/chatAndroidApp"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex items-center px-6 py-3 bg-gray-800 hover:bg-gray-700 rounded-lg font-medium transition-all border border-gray-700"
                  >
                    <FaGithub className="mr-3 text-xl" />
                    <div>
                      <div className="text-xs text-gray-400">View Source</div>
                      <div>GitHub Repository</div>
                    </div>
                  </motion.a>
                  <motion.a
                    href="#"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex items-center px-6 py-3 bg-gradient-to-br from-green-500 to-green-600 hover:to-green-700 rounded-lg font-medium transition-all"
                  >
                    <FaGooglePlay className="mr-3 text-xl" />
                    <div>
                      <div className="text-xs text-white/80">Coming Soon</div>
                      <div>Google Play Store</div>
                    </div>
                  </motion.a>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Technologies Used */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-center"
          >
            <h2 className="text-2xl font-bold mb-6">
              Engineered With Modern Technologies
            </h2>
            <div className="flex flex-wrap justify-center gap-3">
              {[
                { name: "React", color: "from-blue-500 to-cyan-500" },
                { name: "TypeScript", color: "from-blue-600 to-blue-400" },
                { name: "Tailwind CSS", color: "from-teal-400 to-cyan-400" },
                { name: "WebSocket", color: "from-purple-500 to-pink-500" },
                { name: "Node.js", color: "from-green-500 to-green-400" },
                { name: "Spring Boot", color: "from-green-600 to-green-300" },
                { name: "MongoDB", color: "from-green-400 to-emerald-400" },
                { name: "Spring Security", color: "from-red-500 to-amber-500" },
                { name: "JWT", color: "from-purple-400 to-indigo-500" },
                { name: "Electron", color: "from-blue-400 to-indigo-600" },
                { name: "Android SDK", color: "from-green-400 to-emerald-500" },
                { name: "Kotlin", color: "from-purple-600 to-pink-500" },
              ].map((tech, index) => (
                <motion.span
                  key={index}
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className={`px-4 py-2 rounded-full text-sm bg-gradient-to-r ${tech.color} text-white shadow-md`}
                >
                  {tech.name}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Dev;