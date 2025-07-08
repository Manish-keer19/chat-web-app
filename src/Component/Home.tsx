import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "./Navbar";
import { authService } from "../Service/Authservice";
import { setToken, setUser } from "../features/User/UserSlice";
import toast from "react-hot-toast";

type userType = {
  id: string;
  userName: string;
  profilePic: string;
  status: "Online" | "Offline";
  role: string[];
};

const HomePage: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userDetails = useSelector((state: any) => state.User.userdata);

  const [userData, setuserData] = useState<userType>();

  // console.log("userData in home", userData);

  const getOauth2UserData = async () => {
    try {
      const res = await authService.getOauth2UserData();
      if (res && res.success) {
        console.log("user data from oauth2", res);
        setuserData(res.data.user);
        console.log("token from oauth2", res.data.token);
        dispatch(setToken(res.data.token));
        dispatch(setUser(res.data.user));
      } else {
        navigate("/login");
      }
    } catch (error) {
      navigate("/login");
     toast.error("could not get the oauth2 user data");
      console.error("could not get the oauth2 user data", error);
    }
  };

  useEffect(() => {
    if (!userDetails) {
      getOauth2UserData();
    } else {
      console.log("there is not need to ");
      setuserData(userDetails);
    }
  }, []);

  const menuItems = [
    {
      title: "Calculator",
      path: "/calc",
      icon: "🧮",
      description: "Simple Calculator",
    },
   
    {
      title: "Advanced Chat",
      path: "/messages",
      icon: "📱",
      description: "Feature-rich Chat",
    },
    {
      title: "Todo List",
      path: "/todos",
      icon: "✅",
      description: "Manage Tasks",
    },
    {
      title: "Profile",
      path: "/profile",
      icon: "👤",
      description: "Update Profile Details",
    },
    {
      title: "About",
      path: "/about",
      icon: "👨‍💻",
      description: "About the dev",
    },
     ...(userData?.role?.includes("ADMIN")
    ? [
        {
          title: "Admin Panel",
          path: "/admin",
          icon: "🛠️",
          description: "Manage users and system",
        },
      ]
    : []),
  ];

  return (
    <div className="bg-[#1B2838] ">
      <Navbar />

      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-gray-900 to-black text-white">
        <div className="container mx-auto px-4 py-4 sm:py-6 md:py-8 ">
          {/* Profile Section */}
          <div className="mb-6 sm:mb-8">
            <div className="bg-opacity-20 backdrop-blur-xl bg-gray-900 rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 shadow-[0_0_40px_rgba(139,92,246,0.2)] border border-opacity-30 border-purple-500 transform hover:scale-102 transition-all duration-300">
              <div className="flex flex-col sm:flex-row items-center sm:space-x-6">
                <div className="relative mb-4 sm:mb-0">
                  <img
                    src={userData?.profilePic}
                    alt="Profile"
                    className="w-20 h-20 sm:w-24 sm:h-24 rounded-full shadow-lg object-cover border-2 border-purple-500"
                  />
                  <div className="absolute -bottom-2 -right-2 bg-green-500 w-5 h-5 sm:w-6 sm:h-6 rounded-full border-2 border-white flex items-center justify-center">
                    <span className="text-xs">✓</span>
                  </div>
                </div>

                <div className="flex-1 text-center sm:text-left">
                  <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                    Welcome, {userData?.userName}
                  </h1>
                  <div className="flex flex-wrap justify-center sm:justify-start items-center mt-2 gap-2">
                    <span className="text-gray-400 font-medium text-sm sm:text-base">
                      Role:
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {userData?.role.map((role: string, index: number) => (
                        <span
                          key={index}
                          className="px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm bg-purple-500 bg-opacity-20 text-purple-300 border border-purple-500 border-opacity-30"
                        >
                          {role}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Menu Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {menuItems.map((item, index) => (
              <motion.button
                key={index}
                onClick={() => navigate(item.path)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="group bg-opacity-20 backdrop-blur-xl bg-gray-900 rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-lg hover:shadow-[0_0_30px_rgba(139,92,246,0.2)] border border-opacity-30 border-purple-500 transition-all duration-300"
              >
                <div className="flex items-center space-x-3 sm:space-x-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-purple-500 bg-opacity-20 flex items-center justify-center text-xl sm:text-2xl group-hover:scale-110 transition-transform duration-300">
                    {item.icon}
                  </div>
                  <div className="text-left">
                    <h3 className="text-lg sm:text-xl font-semibold text-purple-300 group-hover:text-purple-200 transition-colors duration-300">
                      {item.title}
                    </h3>
                    <p className="text-gray-400 text-xs sm:text-sm mt-0.5 sm:mt-1 group-hover:text-gray-300 transition-colors duration-300">
                      {item.description}
                    </p>
                  </div>
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
