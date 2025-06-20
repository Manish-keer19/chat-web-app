import { motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaInstagram, FaGooglePlay, FaAndroid } from "react-icons/fa";
import { BiMessageSquareDetail } from "react-icons/bi";
import { RiTodoLine } from "react-icons/ri";
import { FaCalculator } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import Navbar from "./Navbar";

const About = () => {
    const features = [
    {
      icon: <BiMessageSquareDetail className="w-5 h-5" />,
      title: "Real-time Chat",
      description: "WebSocket-powered chat that works across all your devices with instant message delivery",
    },
    {
      icon: <RiTodoLine className="w-5 h-5" />,
      title: "Smart Todo System",
      description: "Organize tasks with priority levels, due dates, and cross-device sync",
    },
    {
      icon: <FaCalculator className="w-5 h-5" />,
      title: "Calculator+",
      description: "Advanced calculator with history tracking and session persistence",
    },
    {
      icon: <CgProfile className="w-5 h-5" />,
      title: "Unified Profile",
      description: "Single sign-on experience across web and mobile platforms",
    },
  ];

  const socialLinks = [
    {
      icon: <FaGithub className="w-5 h-5" />,
      url: "https://github.com/Manish-keer19",
      label: "GitHub",
    },
    {
      icon: <FaLinkedin className="w-5 h-5" />,
      url: "https://www.linkedin.com/in/manish-keer-93a212247/",
      label: "LinkedIn",
    },
    {
      icon: <FaInstagram className="w-5 h-5" />,
      url: "https://www.instagram.com/manish_keer19/",
      label: "Instagram",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-950">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 leading-tight">
            <span className="bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
              Cross-Platform Chat Experience
            </span>
            <br />
            <span className="text-gray-300 font-medium text-xl sm:text-2xl">
              Web • Android • Desktop
            </span>
          </h1>
          <p className="text-gray-400 max-w-3xl mx-auto text-base sm:text-lg">
            A full-stack solution showcasing modern development practices with seamless 
            synchronization across all your devices.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-5 border border-gray-800 hover:border-purple-500/30 transition-all duration-300 group"
            >
              <div className="bg-gradient-to-br from-purple-600 to-pink-600 w-10 h-10 rounded-lg flex items-center justify-center mb-4 group-hover:rotate-6 transition-transform">
                {feature.icon}
              </div>
              <h3 className="text-lg font-semibold mb-2 text-gray-100">{feature.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Creator Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 border border-gray-800 mb-12"
        >
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <motion.div 
              whileHover={{ scale: 1.03 }}
              className="relative flex-shrink-0"
            >
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full blur opacity-20"></div>
              <img
                src="https://avatars.githubusercontent.com/u/147429908?s=400&u=b1b05db8a7e03ca4de06f8996e5d0ac2254a9bc9&v=4"
                alt="Manish Keer"
                className="w-24 h-24 sm:w-28 sm:h-28 rounded-full object-cover border-2 border-purple-500/50 relative"
              />
            </motion.div>
            <div className="text-center sm:text-left">
              <h2 className="text-xl sm:text-2xl font-bold mb-2 text-gray-100">
                Developed by Manish Keer
              </h2>
              <p className="text-gray-400 mb-4 text-sm sm:text-base">
                Passionate full-stack developer creating seamless digital experiences 
                across platforms with modern technologies.
              </p>
              <div className="flex justify-center sm:justify-start gap-3">
                {socialLinks.map((link, index) => (
                  <motion.a
                    key={index}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ y: -3 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-gray-800 hover:bg-gray-700 p-2.5 rounded-lg transition-colors"
                    aria-label={link.label}
                  >
                    {link.icon}
                  </motion.a>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Android App Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-gradient-to-br from-purple-900/30 to-gray-900/50 backdrop-blur-sm rounded-xl p-6 border border-gray-800 mb-12 relative overflow-hidden"
        >
          <div className="absolute -top-32 -right-32 w-64 h-64 bg-purple-600 rounded-full filter blur-[100px] opacity-10"></div>
          <div className="relative flex flex-col md:flex-row items-center gap-8">
            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="flex-shrink-0"
            >
              <div className="bg-gray-800 p-5 rounded-xl border border-gray-700 shadow-lg">
                <FaAndroid className="w-20 h-20 text-green-400" />
              </div>
            </motion.div>
            <div className="flex-1">
              <h2 className="text-xl sm:text-2xl font-bold mb-3 text-gray-100">
                Native Android Application
              </h2>
              <p className="text-gray-400 mb-6 text-sm sm:text-base">
                Optimized for mobile with additional features like push notifications, 
                offline mode, and battery-efficient background sync.
              </p>
              <div className="flex flex-wrap gap-3">
                <motion.a
                  href="https://github.com/Manish-keer19/chatAndroidApp"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex items-center px-4 py-2.5 bg-gray-800 hover:bg-gray-700 rounded-lg text-sm font-medium transition-colors border border-gray-700 flex-1 min-w-[200px]"
                >
                  <FaGithub className="mr-2 text-lg" />
                  <span>View Source Code</span>
                </motion.a>
                <motion.a
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex items-center px-4 py-2.5 bg-gradient-to-r from-green-500 to-green-600 hover:to-green-700 rounded-lg text-sm font-medium transition-all flex-1 min-w-[200px]"
                >
                  <FaGooglePlay className="mr-2 text-lg" />
                  <span>Coming to Play Store</span>
                </motion.a>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Technologies Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center"
        >
          <h2 className="text-xl font-bold mb-8 text-gray-100">
            Built With Modern Technologies
          </h2>
          <div className="flex flex-wrap justify-center gap-2.5">
            {[
              "React", "TypeScript", "Tailwind CSS", "WebSocket", 
              "Node.js", "Spring Boot", "MongoDB", "JWT Auth",
              "Electron", "Android SDK", "Kotlin", "Redis"
            ].map((tech, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="px-3 py-1.5 rounded-full text-xs sm:text-sm bg-gray-800 text-gray-300 hover:bg-gray-700 transition-colors"
              >
                {tech}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default About;
