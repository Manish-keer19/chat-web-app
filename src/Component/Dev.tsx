import { motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaInstagram, FaGooglePlay, FaAndroid, FaWindows, FaLinux, FaDownload, FaApple, FaAppStore } from "react-icons/fa";
import { BiMessageSquareDetail } from "react-icons/bi";
import { RiTodoLine } from "react-icons/ri";
import { FaCalculator } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { FiExternalLink, FiLogIn, FiUserPlus } from "react-icons/fi";
import Navbar from "./Navbar";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { Helmet } from "react-helmet";

const Dev = () => {
  const user = useSelector((state: any) => state.User.userdata);
  const navigation = useNavigate();

  useEffect(() => {
    if (user) {
      navigation("/messages");
      return;
    }
    else{
      toast.error("user is not found")
    }
  }, [user, navigation]);

  const features = [
    {
      icon: <BiMessageSquareDetail className="w-4 h-4" />,
      title: "Real-time Chat",
      description: "WebSocket-powered instant messaging with end-to-end encryption",
    },
    {
      icon: <RiTodoLine className="w-4 h-4" />,
      title: "Smart Todo",
      description: "Organize tasks with priorities, due dates & cross-device sync",
    },
    {
      icon: <FaCalculator className="w-4 h-4" />,
      title: "Calculator+",
      description: "Advanced calculator with history tracking and session persistence",
    },
    {
      icon: <CgProfile className="w-4 h-4" />,
      title: "Unified Profile",
      description: "Single sign-on across all platform versions",
    },
  ];

//   const apps = [
//     {
//       icon: <FaAndroid className="w-5 h-5" />,
//       title: "Android App",
//       links: [
//   {
//     label: "Source Code",
//     url: "https://github.com/Manish-keer19/chatAndroidApp",
//     icon: <FaGithub className="w-4 h-4" />
//   },
//   {
//     label: "Download APK",
//     url: "https://www.mediafire.com/file/uxspenk3n8y46wn/manishChatApp.apk/file",
//     icon: <FaDownload className="w-4 h-4" />
//   },
//   {
//     label: "Play Store",
//     url: "#",
//     icon: <FaGooglePlay className="w-4 h-4" />,
//     comingSoon: true
//   }
// ]
//     },
//     {
//       icon: <FaWindows className="w-5 h-5" />,
//       title: "Windows App",
//       links: [
//         {
//           label: "Download (.exe)",
//           url: "https://www.mediafire.com/file/nwocbj0icjrjrn4/manishchatapp_Setup_1.0.0.exe/file",
//           icon: <FiExternalLink className="w-4 h-4" />
//         },
//         {
//           label: "Source Code",
//           url: "https://github.com/Manish-keer19/chat-web-app",
//           icon: <FaGithub className="w-4 h-4" />
//         }
//       ]
//     },
//     {
//       icon: <FaLinux className="w-5 h-5" />,
//       title: "Linux App",
//       links: [
//         {
//           label: "Download (.AppImage)",
//           url: "https://www.mediafire.com/file/4d8d26j94s1ht75/manishchatapp-1.0.0.AppImage/file",
//           icon: <FiExternalLink className="w-4 h-4" />
//         },
//         {
//           label: "Source Code",
//           url: "https://github.com/Manish-keer19/chat-web-app",
//           icon: <FaGithub className="w-4 h-4" />
//         }
//       ]
//     }
//   ];



const apps = [
  {
    icon: <FaAndroid className="w-5 h-5" />,
    title: "Android App",
    links: [
      {
        label: "Source Code",
        url: "https://github.com/Manish-keer19/chatAndroidApp",
        icon: <FaGithub className="w-4 h-4" />
      },
      {
        label: "Download APK",
        url: "https://www.mediafire.com/file/uxspenk3n8y46wn/manishChatApp.apk/file",
        icon: <FaDownload className="w-4 h-4" />
      },
      {
        label: "Play Store",
        url: "#",
        icon: <FaGooglePlay className="w-4 h-4" />,
        comingSoon: true
      }
    ]
  },
  {
    icon: <FaApple className="w-5 h-5" />,
    title: "iOS App",
    links: [
      {
        label: "App Store",
        url: "#",
        icon: <FaAppStore className="w-4 h-4" />,
        comingSoon: true
      }
    ]
  },
  {
    icon: <FaWindows className="w-5 h-5" />,
    title: "Windows App",
    links: [
      {
        label: "Download (.exe)",
        url: "https://www.mediafire.com/file/nwocbj0icjrjrn4/manishchatapp_Setup_1.0.0.exe/file",
        icon: <FiExternalLink className="w-4 h-4" />
      },
      {
        label: "Source Code",
        url: "https://github.com/Manish-keer19/chat-web-app",
        icon: <FaGithub className="w-4 h-4" />
      }
    ]
  },
 
  {
    icon: <FaLinux className="w-5 h-5" />,
    title: "Linux App",
    links: [
      {
        label: "Download (.AppImage)",
        url: "https://www.mediafire.com/file/4d8d26j94s1ht75/manishchatapp-1.0.0.AppImage/file",
        icon: <FiExternalLink className="w-4 h-4" />
      },
      {
        label: "Source Code",
        url: "https://github.com/Manish-keer19/chat-web-app",
        icon: <FaGithub className="w-4 h-4" />
      }
    ]
  },
   {
    icon: <FaApple className="w-5 h-5" />,
    title: "macOS App",
    links: [
      {
        label: "Download (.dmg)",
        url: "#",
        icon: <FiExternalLink className="w-4 h-4" />,
        comingSoon: true
      },
      {
        label: "Source Code",
        url: "https://github.com/Manish-keer19/chat-web-app",
        icon: <FaGithub className="w-4 h-4" />
      }
    ]
  }

];
  const socialLinks = [
    {
      icon: <FaGithub className="w-4 h-4" />,
      url: "https://github.com/Manish-keer19",
      label: "GitHub",
    },
    {
      icon: <FaLinkedin className="w-4 h-4" />,
      url: "https://www.linkedin.com/in/manish-keer-93a212247/",
      label: "LinkedIn",
    },
    {
      icon: <FaInstagram className="w-4 h-4" />,
      url: "https://www.instagram.com/manish_keer19/",
      label: "Instagram",
    },
    {
      icon: <FiExternalLink className="w-4 h-4" />,
      url: "https://manish-portfolio19.vercel.app/",
      label: "Portfolio",
    },
  ];

  const technologies = [
    { name: "React", color: "bg-blue-500/10 text-blue-400" },
    { name: "TypeScript", color: "bg-blue-600/10 text-blue-300" },
    { name: "Tailwind CSS", color: "bg-cyan-500/10 text-cyan-400" },
    { name: "WebSocket", color: "bg-purple-500/10 text-purple-400" },
    { name: "Node.js", color: "bg-green-500/10 text-green-400" },
    { name: "Spring Boot", color: "bg-green-600/10 text-green-300" },
    { name: "MongoDB", color: "bg-emerald-500/10 text-emerald-400" },
    { name: "JWT Auth", color: "bg-amber-500/10 text-amber-400" },
    { name: "Electron", color: "bg-indigo-500/10 text-indigo-400" },
    { name: "Android SDK", color: "bg-emerald-600/10 text-emerald-300" },
    { name: "Kotlin", color: "bg-purple-600/10 text-purple-300" },
    { name: "Redis", color: "bg-red-500/10 text-red-400" },
  ];

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100">
     <Helmet>
        <title>Manish Chat App</title>
        <meta name="description" content="Chat instantly with Manish's real-time web chat app." />
        <meta name="keywords" content="Manish, Chat App, Real-time, React, Messaging" />
        <meta name="author" content="Manish Keer" />
      </Helmet>
      <Navbar />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 sm:mb-16"
        >
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 leading-tight">
            <span className="bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
              Cross-Platform Chat App
            </span>
          </h1>
          <p className="text-gray-400 max-w-3xl mx-auto text-sm sm:text-base mb-6">
            A full-stack application with native clients for Android, Windows, and Linux,
            featuring real-time communication and productivity tools.
          </p>
          
          {/* Login/Signup Buttons */}
          {!user && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="flex justify-center gap-4 mt-6"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigation("/login")}
                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg font-medium text-sm"
              >
                <FiLogIn className="w-4 h-4" />
                Login
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigation("/signup")}
                className="flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg font-medium text-sm border border-gray-700"
              >
                <FiUserPlus className="w-4 h-4" />
                Sign Up
              </motion.button>
            </motion.div>
          )}
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              whileHover={{ y: -3 }}
              className="bg-gray-900/50 rounded-lg p-4 border border-gray-800 hover:border-purple-500/30 transition-all"
            >
              <div className="bg-gradient-to-br from-purple-600 to-pink-600 w-8 h-8 rounded-md flex items-center justify-center mb-3">
                {feature.icon}
              </div>
              <h3 className="text-base font-medium mb-1.5 text-gray-100">{feature.title}</h3>
              <p className="text-gray-400 text-xs leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Developer Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="bg-gray-900/50 rounded-xl p-5 sm:p-6 border border-gray-800 mb-10"
        >
          <div className="flex flex-col sm:flex-row items-center gap-5">
            <motion.div
              whileHover={{ scale: 1.03 }}
              className="relative flex-shrink-0"
            >
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full blur opacity-20"></div>
              <img
                src="https://avatars.githubusercontent.com/u/147429908?s=400&u=b1b05db8a7e03ca4de06f8996e5d0ac2254a9bc9&v=4"
                alt="Manish Keer"
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover border-2 border-purple-500/50 relative"
              />
            </motion.div>
            <div className="text-center sm:text-left">
              <h2 className="text-lg sm:text-xl font-bold mb-1 text-gray-100">
                  Developed by Manish Keer
              </h2>
              <p className="text-gray-400 mb-3 text-xs sm:text-sm">
                Full-stack developer Building modern web, mobile & desktop apps using React, React Native, Electron, and Spring Boot.
              </p>
              
              <div className="flex flex-wrap justify-center sm:justify-start gap-2">
                {socialLinks.map((link, index) => (
                  <motion.a
                    key={index}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-gray-800 hover:bg-gray-700 p-2 rounded-lg transition-colors flex items-center gap-1.5 text-xs"
                    aria-label={link.label}
                  >
                    {link.icon}
                    <span>{link.label}</span>
                  </motion.a>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Platform Apps Section */}
        {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
          {apps.map((app, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.15 }}
              className="bg-gray-900/50 rounded-xl p-5 border border-gray-800"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-gradient-to-br from-purple-600 to-pink-600 w-8 h-8 rounded-md flex items-center justify-center">
                  {app.icon}
                </div>
                <h3 className="text-base font-medium text-gray-100">{app.title}</h3>
              </div>
              <div className="space-y-2">
                {app.links.map((link, linkIndex) => (
                  <motion.a
                    key={linkIndex}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ x: 3 }}
                    className={`flex items-center gap-2 text-xs sm:text-sm px-3 py-2 rounded-lg ${link.comingSoon ? 'bg-gray-800/50 text-gray-500' : 'bg-gray-800 hover:bg-gray-700'}`}
                  >
                    {link.icon}
                    <span>{link.label}</span>
                    {link.comingSoon && <span className="text-xs text-pink-500 ml-auto">Coming Soon</span>}
                  </motion.a>
                ))}
              </div>
            </motion.div>
          ))}
        </div> */}

        {/* Platform Apps Section */}
<div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
  {apps.map((app, index) => (
    <motion.div
      key={index}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.15 }}
      className={`bg-gray-900/50 rounded-xl p-5 border ${app.title.includes('Coming Soon') ? 'border-pink-900/50' : 'border-gray-800'}`}
    >
      <div className="flex items-center gap-3 mb-4">
        <div className={`w-8 h-8 rounded-md flex items-center justify-center ${app.title.includes('Coming Soon') ? 'bg-gradient-to-br from-pink-600 to-purple-600 opacity-80' : 'bg-gradient-to-br from-purple-600 to-pink-600'}`}>
          {app.icon}
        </div>
        <h3 className="text-base font-medium text-gray-100">
          {app.title}
          {app.title.includes('Coming Soon') && (
            <span className="ml-2 text-xs bg-pink-900/30 text-pink-400 px-2 py-0.5 rounded-full">Coming Soon</span>
          )}
        </h3>
      </div>
      <div className="space-y-2">
        {app.links.map((link, linkIndex) => (
          <motion.a
            key={linkIndex}
            href={link.url}
            target="_blank" 
            rel="noopener noreferrer"
            whileHover={{ x: link.comingSoon ? 0 : 3 }}
            className={`flex items-center gap-2 text-xs sm:text-sm px-3 py-2 rounded-lg ${
              link.comingSoon 
                ? 'bg-gray-800/30 text-gray-500 cursor-not-allowed' 
                : 'bg-gray-800 hover:bg-gray-700 cursor-pointer'
            }`}
            onClick={link.comingSoon ? (e) => e.preventDefault() : undefined}
          >
            {link.icon}
            <span>{link.label}</span>
            {link.comingSoon && (
              <span className="text-xs text-pink-400 ml-auto">Coming Soon</span>
            )}
          </motion.a>
        ))}
      </div>
    </motion.div>
  ))}
</div>

        {/* Technologies Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center"
        >
          <h2 className="text-lg font-bold mb-6 text-gray-100">
            Built With Modern Technologies
          </h2>
          <div className="flex flex-wrap justify-center gap-2">
            {technologies.map((tech, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className={`px-2.5 py-1 rounded-full text-xs ${tech.color}`}
              >
                {tech.name}
              </motion.span>
            ))}
          </div>
        </motion.div>

        {/* Web App Link */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-12 text-center"
        >
          <motion.a
            href="https://github.com/Manish-keer19/chat-web-app"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg text-sm font-medium transition-colors border border-gray-700"
          >
            <FaGithub className="w-4 h-4" />
            <span>Web Application Source Code</span>
            <FiExternalLink className="w-3 h-3" />
          </motion.a>
        </motion.div>
      </div>
    </div>
  );
};

export default Dev;