import { motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";
import { BiMessageSquareDetail } from "react-icons/bi";
import { RiTodoLine } from "react-icons/ri";
import { FaCalculator } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import Navbar from "./Navbar";

const About = () => {
  const features = [
    {
      icon: <BiMessageSquareDetail className="w-6 h-6" />,
      title: "Real-time Chat",
      description:
        "Connect with users instantly through our real-time messaging system powered by WebSocket",
    },
    {
      icon: <RiTodoLine className="w-6 h-6" />,
      title: "Todo Management",
      description: "Stay organized with our intuitive todo list feature",
    },
    {
      icon: <FaCalculator className="w-6 h-6" />,
      title: "Calculator",
      description:
        "Perform quick calculations with our beautiful calculator interface",
    },
    {
      icon: <CgProfile className="w-6 h-6" />,
      title: "Profile Management",
      description:
        "Customize your profile and manage your personal information",
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
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-gray-900 to-black text-white p-4 sm:p-6 md:p-8 ">
        <div className="container mx-auto max-w-6xl">
          {/* Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12 sm:mb-16"
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Chat Desktop App
            </h1>
            <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto">
              A modern desktop application built with React and TypeScript,
              featuring real-time chat, todo management, and more.
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
                className="bg-opacity-20 backdrop-blur-xl bg-gray-900 rounded-2xl p-6 border border-opacity-30 border-purple-500 hover:border-opacity-50 transition-all duration-300"
              >
                <div className="bg-purple-500 bg-opacity-20 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
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
              <motion.img
                whileHover={{ scale: 1.05 }}
                src="https://avatars.githubusercontent.com/u/147429908?s=400&u=b1b05db8a7e03ca4de06f8996e5d0ac2254a9bc9&v=4"
                alt="Manish Keer"
                className="w-32 h-32 rounded-full object-cover border-4 border-purple-500"
              />
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold mb-2">
                  Created by Manish Keer
                </h2>
                <p className="text-gray-400 mb-4">
                  Full-stack developer passionate about creating beautiful and
                  functional applications.
                </p>
                <div className="flex gap-4">
                  {socialLinks.map((link, index) => (
                    <motion.a
                      key={index}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      className="bg-gray-800 p-3 rounded-lg hover:bg-gray-700 transition-colors"
                      aria-label={link.label}
                    >
                      {link.icon}
                    </motion.a>
                  ))}
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
            <h2 className="text-2xl font-bold mb-4">
              Built with Modern Technologies
            </h2>
            <div className="flex flex-wrap justify-center gap-4">
              {[
                "React",
                "TypeScript",
                "Tailwind CSS",
                "WebSocket",
                "Node.js",
                "Spring Boot",
                "MongoDB",
                "Spring Security",
                "Jwt",
                "Electron",
                
              ].map((tech, index) => (
                <motion.span
                  key={index}
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="px-4 py-2 bg-purple-500 bg-opacity-20 rounded-full text-sm"
                >
                  {tech}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div >
  );
};

export default About;
