// UserList.tsx
import React, { useEffect, useState } from "react";
import { IoSearchOutline } from "react-icons/io5";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import { userService } from "../../Service/userService";
import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar";

interface User {
  id: string;
  userName: string;
  profilePic: string;
  status: "Online" | "Offline";
  lastSeen?: string;
}

interface UserState {
  token: string;
  userdata: {
    id: string;
    userName: string;
    profilePic: string;
  };
}

const UserList: React.FC = () => {
  const token = useSelector((state: { User: UserState }) => state.User.token);
  const navigate = useNavigate();
  const [users, setUsers] = useState<User[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  const fetchAllUsersData = async () => {
    try {
      if (!token) {
        toast.error("Token not found");
        return;
      }
      
      // Check if users are already in localStorage
      const cachedUsers = localStorage.getItem("users");
      if (cachedUsers) {
        setUsers(JSON.parse(cachedUsers));
        setLoading(false);
        return;
      }

      setLoading(true);
      const res = await userService.getUsersData(token);
      if (res.success) {
        localStorage.setItem("users", JSON.stringify(res.data));
        setUsers(res.data);
      }
    } catch (error) {
      toast.error("Could not fetch user data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllUsersData();
  }, [token]);

  const handleSelectUser = (userId: string) => {
    navigate(`/messages/${userId}`,);
  };

  const filteredUsers = users.filter(user =>
    user.userName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="w-full h-full bg-white dark:bg-gray-800 flex flex-col">
      <Navbar/>
      {/* Header */}

      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <h1 className="text-xl font-semibold text-gray-800 dark:text-white">
          Messages
        </h1>
        
        {/* Search Bar */}
        <div className="mt-4 relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <IoSearchOutline className="text-gray-400" />
          </div>
          <input
            type="text"
            className="w-full pl-10 pr-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-800 dark:text-white"
            placeholder="Search messages..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* User List */}
      <div className="flex-1 overflow-y-auto">
        {loading ? (
          <div className="flex justify-center items-center h-full">
            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-purple-500"></div>
          </div>
        ) : filteredUsers.length > 0 ? (
          filteredUsers.map((user) => (
            <div
              key={user.id}
              className="flex items-center p-4 border-b border-gray-100 dark:border-gray-700 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              onClick={() => handleSelectUser(user.id)}
            >
              <div className="relative">
                <img
                  className="w-12 h-12 rounded-full object-cover"
                  src={user.profilePic}
                  alt={user.userName}
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://via.placeholder.com/150';
                  }}
                />
                <span
                  className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white dark:border-gray-800 ${
                    user.status === "Online" ? "bg-green-500" : "bg-gray-400"
                  }`}
                ></span>
              </div>
              <div className="ml-3 flex-1">
                <div className="flex justify-between items-center">
                  <h3 className="text-sm font-semibold text-gray-800 dark:text-white">
                    {user.userName}
                  </h3>
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {user.lastSeen || "Just now"}
                  </span>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                  {user.status === "Online" ? "Online" : "Offline"}
                </p>
              </div>
            </div>
          ))
        ) : (
          <div className="p-4 text-center text-gray-500 dark:text-gray-400">
            {searchQuery ? "No users found" : "No users available"}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserList;