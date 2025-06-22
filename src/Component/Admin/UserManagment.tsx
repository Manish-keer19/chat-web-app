




// // src/components/Admin/UserManagement.tsx
// import { useEffect, useState } from "react";
// import { motion } from "framer-motion";
// import { adminService } from "../../Service/Adminservice";
// import { useSelector } from "react-redux";
// import { FaSearch, FaTrash, FaEye, FaUserCircle, FaUsers, FaUserSlash, FaChartBar } from "react-icons/fa";
// import { toast } from "react-hot-toast";
// // import { useNavigate } from "react-router-dom";
// import { UsersState } from "../../features/User/UserSlice";

// const UserManagement = () => {
//   const token = useSelector((state: { User: UsersState }) => state.User.token);
//   const userData = useSelector((state: { User: UsersState }) => state.User.userdata);
//   const [users, setUsers] = useState<any[]>([]);

//   const [loading, setLoading] = useState(true);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [stats, setStats] = useState({
//     totalUsers: 0,
//     activeUsers: 0,
//     adminCount: 0,
//     deletedUsers: 0
//   });
// //   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchData = async () => {
//       if (!userData.id) {
//         toast.error("User ID is not defined");
//         return;
//       }
//       try {
//         setLoading(true);

//         // Fetch all users
//         const usersData = await adminService.getAllUsers(token, userData.id);
//         setUsers(usersData);
//         const userdetails = await adminService.getUserDetails(token, userData.id, userData.id);

//         setStats({
//             totalUsers: usersData.length,
//             adminCount: usersData.filter((user: any) => user.Role?.includes("ADMIN")).length,
//             activeUsers: usersData.filter((user: any) => user.isActive).length,
//             deletedUsers: usersData.filter((user: any) => user.isDeleted).length
//         })


//       } catch (error) {
//         console.error(error);
//         toast.error("Failed to fetch data");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, [token, userData.id]);

//   const handleDeleteUser = async (userId: string) => {
//     if (window.confirm("Are you sure you want to delete this user?")) {
//       try {
//         await adminService.deleteUser(token, userId, userData.id);
//         setUsers(users.filter(user => user.id !== userId));
//         setStats(prev => ({
//           ...prev,
//           totalUsers: prev.totalUsers - 1,
//           deletedUsers: prev.deletedUsers + 1
//         }));
//         toast.success("User deleted successfully");
//       } catch (error) {
//         toast.error("Failed to delete user");
//       }
//     }
//   };

//   const handleViewUserDetails = async (userId: string) => {
//     try {
//       const userDetails = await adminService.getUserDetails(token, userId, userData.id);
//     console.log("User details:", userDetails);
//     } catch (error) {
//       toast.error("Failed to fetch user details");
//     }
//   };

//   const filteredUsers = users.filter(user =>
//     user.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     (user.email && user.email.toLowerCase().includes(searchTerm.toLowerCase()))
//   );

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center h-64 bg-gray-950">
//         <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-950 p-4 sm:p-6 md:p-8">
//       <div className="max-w-7xl mx-auto space-y-6">
//         <motion.h1 
//           initial={{ opacity: 0, y: -20 }}
//           animate={{ opacity: 1, y: 0 }}
//           className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent"
//         >
//           User Management
//         </motion.h1>

//         {/* Statistics Cards */}
//         <motion.div
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
//         >
//           <div className="bg-gray-900/50 p-4 rounded-lg border border-gray-800">
//             <div className="flex items-center space-x-4">
//               <div className="p-3 rounded-full bg-blue-500/20 text-blue-400">
//                 <FaUsers className="text-xl" />
//               </div>
//               <div>
//                 <p className="text-gray-400 text-sm">Total Users</p>
//                 <p className="text-white text-2xl font-bold">{stats.totalUsers}</p>
//               </div>
//             </div>
//           </div>


//         </motion.div>

//         {/* Search Bar */}
//         <motion.div
//           initial={{ opacity: 0, x: -20 }}
//           animate={{ opacity: 1, x: 0 }}
//           className="relative"
//         >
//           <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//             <FaSearch className="text-gray-400" />
//           </div>
//           <input
//             type="text"
//             placeholder="Search users..."
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             className="w-full pl-10 pr-4 py-2.5 bg-gray-900/50 backdrop-blur-sm rounded-xl border border-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-400"
//           />
//         </motion.div>

//         {/* Users Table */}
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           className="bg-gray-900/50 backdrop-blur-sm rounded-xl border border-gray-800 overflow-hidden shadow-lg"
//         >
//           <div className="overflow-x-auto">
//             <table className="min-w-full divide-y divide-gray-800">
//               <thead className="bg-gray-800/50">
//                 <tr>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">User</th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Email</th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Joined</th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Status</th>
//                   <th className="px-6 py-3 text-right text-xs font-medium text-gray-300 uppercase tracking-wider">Actions</th>
//                 </tr>
//               </thead>
//               <tbody className="divide-y divide-gray-800">
//                 {filteredUsers.length > 0 ? (
//                   filteredUsers.map((user) => (
//                     <tr key={user.id} className="hover:bg-gray-800/30 transition-colors">
//                       <td className="px-6 py-4 whitespace-nowrap">
//                         <div className="flex items-center">
//                           <div className="flex-shrink-0 h-10 w-10 cursor-pointer" onClick={() => handleViewUserDetails(user.id)}>
//                             {user.profilePic ? (
//                               <img 
//                                 className="h-10 w-10 rounded-full object-cover" 
//                                 src={user.profilePic} 
//                                 alt={user.userName}
//                                 onClick={() => handleViewUserDetails(user.id)}
//                               />
//                             ) : (
//                               <FaUserCircle 
//                                 className="h-10 w-10 text-gray-400 cursor-pointer" 
//                                 onClick={() => handleViewUserDetails(user.id)}
//                               />
//                             )}
//                           </div>
//                           <div className="ml-4">
//                             <div className="text-sm font-medium text-white">{user.userName}</div>
//                             <div className="text-sm text-gray-400">
//                               {user.role?.includes("ADMIN") ? "Admin" : "User"}
//                             </div>
//                           </div>
//                         </div>
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap">
//                         <div className="text-sm text-white">{user.email || "N/A"}</div>
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap">
//                         <div className="text-sm text-gray-400">
//                           {new Date(user.createdAt || Date.now()).toLocaleDateString()}
//                         </div>
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap">
//                         <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
//                           user.isActive ? 'bg-blue-500/20 text-blue-300' : 'bg-gray-500/20 text-gray-300'
//                         }`}>
//                           {user.isActive ? 'Active' : 'Inactive'}
//                         </span>
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
//                         <div className="flex justify-end space-x-2">
//                           <button
//                             onClick={() => handleViewUserDetails(user.id)}
//                             className="text-blue-400 hover:text-blue-300 transition-colors p-2 rounded-lg hover:bg-blue-500/20"
//                             title="View Details"
//                           >
//                             <FaEye />
//                           </button>
//                           {!user.role?.includes("ADMIN") && (
//                             <button
//                               onClick={() => handleDeleteUser(user.id)}
//                               className="text-red-400 hover:text-red-300 transition-colors p-2 rounded-lg hover:bg-red-500/20"
//                               title="Delete User"
//                             >
//                               <FaTrash />
//                             </button>
//                           )}
//                         </div>
//                       </td>
//                     </tr>
//                   ))
//                 ) : (
//                   <tr>
//                     <td colSpan={5} className="px-6 py-4 text-center text-gray-400">
//                       No users found
//                     </td>
//                   </tr>
//                 )}
//               </tbody>
//             </table>
//           </div>
//         </motion.div>
//       </div>
//     </div>
//   );
// };

// export default UserManagement;









// src/components/Admin/UserManagement.tsx
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { adminService } from "../../Service/Adminservice";
import { useSelector } from "react-redux";
import {
    FaSearch, FaTrash, FaEye, FaUserCircle, FaUsers,
    FaUserSlash, FaTimes, FaBan,
    FaCheck, FaUserShield, FaChevronLeft, FaChevronRight
} from "react-icons/fa";
import { toast } from "react-hot-toast";
import { UsersState } from "../../features/User/UserSlice";
import { useNavigate } from "react-router-dom";

const UserManagement = () => {
    const navigate = useNavigate();
    const token = useSelector((state: { User: UsersState }) => state.User.token);
    const userData = useSelector((state: { User: UsersState }) => state.User.userdata);
    const [users, setUsers] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedUser, setSelectedUser] = useState<any>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const usersPerPage = 8;

    const [stats, setStats] = useState({
        totalUsers: 0,
        activeUsers: 0,
        adminCount: 0,
        deletedUsers: 0,
        bannedUsers: 0
    });




    useEffect(() => {
      if (userData?.role && !userData.role.includes("ADMIN")) {
            toast.error("मदरचोद तू एडमिन बनेगा 🤣");
            navigate("/");
        }
    }, [userData, navigate]);



    useEffect(() => {
        const fetchData = async () => {
            if (!userData.id) {
                toast.error("User ID is not defined");
                return;
            }
            try {
                setLoading(true);

                const usersData = await adminService.getAllUsers(token, userData.id);
                setUsers(usersData);

                setStats({
                    totalUsers: usersData.length,
                    adminCount: usersData.filter((user: any) => user.role?.includes("ADMIN")).length,
                    activeUsers: usersData.filter((user: any) => user.isActive && !user.isBanned).length,
                    deletedUsers: usersData.filter((user: any) => user.isDeleted).length,
                    bannedUsers: usersData.filter((user: any) => user.isBanned).length
                });

            } catch (error) {
                console.error(error);
                toast.error("Failed to fetch data");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [token, userData.id]);




    const showDeleteConfirm = (onConfirm: () => void) => {
        toast.custom((t) => (
            <div className="bg-gray-900 text-white p-4 rounded-xl shadow-xl border border-gray-700 max-w-sm">
                <p className="mb-3">Are you sure you want to delete this user?</p>
                <div className="flex justify-end space-x-2">
                    <button
                        onClick={() => toast.dismiss(t.id)}
                        className="px-4 py-1 rounded bg-gray-700 hover:bg-gray-600"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={() => {
                            toast.dismiss(t.id);
                            onConfirm(); // trigger actual delete
                        }}
                        className="px-4 py-1 rounded bg-red-600 hover:bg-red-500 text-white"
                    >
                        Delete
                    </button>
                </div>
            </div>
        ));
    };


    //   const handleDeleteUser = async (userId: string) => {
    //     if (window.confirm("Are you sure you want to delete this user?")) {
    //       try {
    //         await adminService.deleteUser(token, userId, userData.id);
    //         setUsers(users.filter(user => user.id !== userId));
    //         setStats(prev => ({
    //           ...prev,
    //           totalUsers: prev.totalUsers - 1,
    //           deletedUsers: prev.deletedUsers + 1,
    //           activeUsers: prev.activeUsers - (users.find(u => u.id === userId)?.isActive ? 1 : 0)
    //         }));
    //         toast.success("User deleted successfully");
    //         if (selectedUser?.id === userId) {
    //           setIsModalOpen(false);
    //         }
    //       } catch (error) {
    //         toast.error("Failed to delete user");
    //       }
    //     }
    //   };




    const handleDeleteUser = (userId: string) => {
        showDeleteConfirm(async () => {
            try {
                await adminService.deleteUser(token, userId, userData.id);
                setUsers(users.filter(user => user._id !== userId));
                toast.success("User deleted successfully");
            } catch (error) {
                toast.error("Failed to delete user");
            }
        });
    };

    const handleViewUserDetails = async (userId: string) => {
        try {
            const userDetails = await adminService.getUserDetails(token, userId, userData.id);
            setSelectedUser(userDetails);
            setIsModalOpen(true);
        } catch (error) {
            toast.error("Failed to fetch user details");
        }
    };

    //   const handleBanUser = async (userId: string) => {
    //     try {
    //       await adminService.banUser(token, userId, userData.id);
    //       setUsers(users.map(user => 
    //         user.id === userId ? { ...user, isBanned: true, isActive: false } : user
    //       ));
    //       setStats(prev => ({
    //         ...prev,
    //         bannedUsers: prev.bannedUsers + 1,
    //         activeUsers: prev.activeUsers - 1
    //       }));
    //       toast.success("User banned successfully");
    //       if (selectedUser?.id === userId) {
    //         setSelectedUser({ ...selectedUser, isBanned: true, isActive: false });
    //       }
    //     } catch (error) {
    //       toast.error("Failed to ban user");
    //     }
    //   };

    //   const handleUnbanUser = async (userId: string) => {
    //     try {
    //       await adminService.unbanUser(token, userId, userData.id);
    //       setUsers(users.map(user => 
    //         user.id === userId ? { ...user, isBanned: false, isActive: true } : user
    //       ));
    //       setStats(prev => ({
    //         ...prev,
    //         bannedUsers: prev.bannedUsers - 1,
    //         activeUsers: prev.activeUsers + 1
    //       }));
    //       toast.success("User unbanned successfully");
    //       if (selectedUser?.id === userId) {
    //         setSelectedUser({ ...selectedUser, isBanned: false, isActive: true });
    //       }
    //     } catch (error) {
    //       toast.error("Failed to unban user");
    //     }
    //   };

    const filteredUsers = users.filter(user =>
        user.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (user.email && user.email.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    // Pagination logic
    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);
    const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen bg-gray-950">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-950 p-4 sm:p-6 md:p-8">
            <div className="max-w-7xl mx-auto space-y-6">
                <motion.h1
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent"
                >
                    User Management
                </motion.h1>

                {/* Statistics Cards */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4"
                >
                    <div className="bg-gray-900/50 p-4 rounded-lg border border-gray-800 hover:border-blue-500 transition-colors">
                        <div className="flex items-center space-x-4">
                            <div className="p-3 rounded-full bg-blue-500/20 text-blue-400">
                                <FaUsers className="text-xl" />
                            </div>
                            <div>
                                <p className="text-gray-400 text-sm">Total Users</p>
                                <p className="text-white text-2xl font-bold">{stats.totalUsers}</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-gray-900/50 p-4 rounded-lg border border-gray-800 hover:border-green-500 transition-colors">
                        <div className="flex items-center space-x-4">
                            <div className="p-3 rounded-full bg-green-500/20 text-green-400">
                                <FaCheck className="text-xl" />
                            </div>
                            <div>
                                <p className="text-gray-400 text-sm">Active Users</p>
                                <p className="text-white text-2xl font-bold">{stats.activeUsers}</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-gray-900/50 p-4 rounded-lg border border-gray-800 hover:border-purple-500 transition-colors">
                        <div className="flex items-center space-x-4">
                            <div className="p-3 rounded-full bg-purple-500/20 text-purple-400">
                                <FaUserShield className="text-xl" />
                            </div>
                            <div>
                                <p className="text-gray-400 text-sm">Admins</p>
                                <p className="text-white text-2xl font-bold">{stats.adminCount}</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-gray-900/50 p-4 rounded-lg border border-gray-800 hover:border-red-500 transition-colors">
                        <div className="flex items-center space-x-4">
                            <div className="p-3 rounded-full bg-red-500/20 text-red-400">
                                <FaBan className="text-xl" />
                            </div>
                            <div>
                                <p className="text-gray-400 text-sm">Banned Users</p>
                                <p className="text-white text-2xl font-bold">{stats.bannedUsers}</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-gray-900/50 p-4 rounded-lg border border-gray-800 hover:border-gray-500 transition-colors">
                        <div className="flex items-center space-x-4">
                            <div className="p-3 rounded-full bg-gray-500/20 text-gray-400">
                                <FaUserSlash className="text-xl" />
                            </div>
                            <div>
                                <p className="text-gray-400 text-sm">Deleted Users</p>
                                <p className="text-white text-2xl font-bold">{stats.deletedUsers}</p>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Search Bar */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="relative"
                >
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FaSearch className="text-gray-400" />
                    </div>
                    <input
                        type="text"
                        placeholder="Search by username or email..."
                        value={searchTerm}
                        onChange={(e) => {
                            setSearchTerm(e.target.value);
                            setCurrentPage(1);
                        }}
                        className="w-full pl-10 pr-4 py-2.5 bg-gray-900/50 backdrop-blur-sm rounded-xl border border-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-400 transition-all"
                    />
                </motion.div>

                {/* Users Table */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-gray-900/50 backdrop-blur-sm rounded-xl border border-gray-800 overflow-hidden shadow-lg"
                >
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-800">
                            <thead className="bg-gray-800/50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">User</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Email</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Joined</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Status</th>
                                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-300 uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-800">
                                {currentUsers.length > 0 ? (
                                    currentUsers.map((user) => (
                                        <tr key={user.id} className="hover:bg-gray-800/30 transition-colors">
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center">
                                                    <div className="flex-shrink-0 h-10 w-10 cursor-pointer" onClick={() => handleViewUserDetails(user.id)}>
                                                        {user.profilePic ? (
                                                            <img
                                                                className="h-10 w-10 rounded-full object-cover"
                                                                src={user.profilePic}
                                                                alt={user.userName}
                                                            />
                                                        ) : (
                                                            <FaUserCircle className="h-10 w-10 text-gray-400" />
                                                        )}
                                                    </div>
                                                    <div className="ml-4">
                                                        <div className="text-sm font-medium text-white">{user.userName}</div>
                                                        <div className="text-sm text-gray-400">
                                                            {user.role?.includes("ADMIN") ? "Admin" : "User"}
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-white">{user.email || "N/A"}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-400">
                                                    {new Date(user.createdAt || Date.now()).toLocaleDateString()}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${user.isBanned ? 'bg-red-500/20 text-red-300' :
                                                        user.isActive ? 'bg-green-500/20 text-green-300' : 'bg-gray-500/20 text-gray-300'
                                                    }`}>
                                                    {user.isBanned ? 'Banned' : user.isActive ? 'Active' : 'Inactive'}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                <div className="flex justify-end space-x-2">
                                                    <button
                                                        onClick={() => handleViewUserDetails(user.id)}
                                                        className="text-blue-400 hover:text-blue-300 transition-colors p-2 rounded-lg hover:bg-blue-500/20"
                                                        title="View Details"
                                                    >
                                                        <FaEye />
                                                    </button>
                                                    {!user.role?.includes("ADMIN") && (
                                                        <>
                                                            {user.isBanned ? (
                                                                <button
                                                                    //   onClick={() => handleUnbanUser(user.id)}
                                                                    className="text-green-400 hover:text-green-300 transition-colors p-2 rounded-lg hover:bg-green-500/20"
                                                                    title="Unban User"
                                                                >
                                                                    <FaCheck />
                                                                </button>
                                                            ) : (
                                                                <button
                                                                    //   onClick={() => handleBanUser(user.id)}
                                                                    className="text-yellow-400 hover:text-yellow-300 transition-colors p-2 rounded-lg hover:bg-yellow-500/20"
                                                                    title="Ban User"
                                                                >
                                                                    <FaBan />
                                                                </button>
                                                            )}
                                                            <button
                                                                onClick={() => handleDeleteUser(user.id)}
                                                                className="text-red-400 hover:text-red-300 transition-colors p-2 rounded-lg hover:bg-red-500/20"
                                                                title="Delete User"
                                                            >
                                                                <FaTrash />
                                                            </button>
                                                        </>
                                                    )}
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={5} className="px-6 py-4 text-center text-gray-400">
                                            No users found
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    {filteredUsers.length > usersPerPage && (
                        <div className="flex items-center justify-between px-6 py-4 border-t border-gray-800">
                            <div className="text-sm text-gray-400">
                                Showing <span className="font-medium">{indexOfFirstUser + 1}</span> to{' '}
                                <span className="font-medium">
                                    {Math.min(indexOfLastUser, filteredUsers.length)}
                                </span>{' '}
                                of <span className="font-medium">{filteredUsers.length}</span> users
                            </div>
                            <div className="flex space-x-2">
                                <button
                                    onClick={() => paginate(Math.max(1, currentPage - 1))}
                                    disabled={currentPage === 1}
                                    className={`px-3 py-1 rounded-md ${currentPage === 1 ? 'bg-gray-800 text-gray-600 cursor-not-allowed' : 'bg-gray-800 text-white hover:bg-gray-700'}`}
                                >
                                    <FaChevronLeft />
                                </button>
                                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                                    let pageNum;
                                    if (totalPages <= 5) {
                                        pageNum = i + 1;
                                    } else if (currentPage <= 3) {
                                        pageNum = i + 1;
                                    } else if (currentPage >= totalPages - 2) {
                                        pageNum = totalPages - 4 + i;
                                    } else {
                                        pageNum = currentPage - 2 + i;
                                    }
                                    return (
                                        <button
                                            key={pageNum}
                                            onClick={() => paginate(pageNum)}
                                            className={`px-3 py-1 rounded-md ${currentPage === pageNum ? 'bg-blue-600 text-white' : 'bg-gray-800 text-white hover:bg-gray-700'}`}
                                        >
                                            {pageNum}
                                        </button>
                                    );
                                })}
                                <button
                                    onClick={() => paginate(Math.min(totalPages, currentPage + 1))}
                                    disabled={currentPage === totalPages}
                                    className={`px-3 py-1 rounded-md ${currentPage === totalPages ? 'bg-gray-800 text-gray-600 cursor-not-allowed' : 'bg-gray-800 text-white hover:bg-gray-700'}`}
                                >
                                    <FaChevronRight />
                                </button>
                            </div>
                        </div>
                    )}
                </motion.div>

                {/* User Detail Modal */}
                <AnimatePresence>
                    {isModalOpen && selectedUser && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-70 backdrop-blur-sm"
                            onClick={() => setIsModalOpen(false)}
                        >
                            <motion.div
                                initial={{ scale: 0.9, y: 20 }}
                                animate={{ scale: 1, y: 0 }}
                                exit={{ scale: 0.9, y: 20 }}
                                className="relative bg-gray-900 rounded-xl border border-gray-800 w-full max-w-2xl max-h-[90vh] overflow-y-auto"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <button
                                    onClick={() => setIsModalOpen(false)}
                                    className="absolute top-4 right-4 text-gray-400 hover:text-white p-1 rounded-full hover:bg-gray-800 transition-colors"
                                >
                                    <FaTimes className="text-xl" />
                                </button>

                                <div className="p-6">
                                    <div className="flex flex-col md:flex-row gap-6">
                                        {/* Profile Picture Section */}
                                        <div className="flex-shrink-0">
                                            <div className="relative">
                                                {selectedUser.profilePic ? (
                                                    <img
                                                        src={selectedUser.profilePic}
                                                        alt={selectedUser.userName}
                                                        className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover border-4 border-blue-500/30 shadow-lg"
                                                    />
                                                ) : (
                                                    <FaUserCircle className="w-32 h-32 md:w-40 md:h-40 text-gray-400 rounded-full" />
                                                )}
                                                <div className="absolute -bottom-2 right-2 bg-gray-800 rounded-full p-2 border border-gray-700">
                                                    {selectedUser.role?.includes("ADMIN") ? (
                                                        <FaUserShield className="text-yellow-400 text-xl" title="Admin" />
                                                    ) : (
                                                        <FaUserCircle className="text-blue-400 text-xl" title="User" />
                                                    )}
                                                </div>
                                            </div>
                                        </div>

                                        {/* User Details Section */}
                                        <div className="flex-1 space-y-4">
                                            <div>
                                                <h2 className="text-2xl font-bold text-white">{selectedUser.userName}</h2>
                                                <div className="flex items-center space-x-2 mt-1">
                                                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${selectedUser.isBanned
                                                            ? 'bg-red-500/20 text-red-400'
                                                            : selectedUser.isActive
                                                                ? 'bg-green-500/20 text-green-400'
                                                                : 'bg-gray-500/20 text-gray-400'
                                                        }`}>
                                                        {selectedUser.isBanned ? 'Banned' : selectedUser.isActive ? 'Active' : 'Inactive'}
                                                    </span>
                                                    {selectedUser.email && (
                                                        <span className="text-sm text-gray-400">{selectedUser.email}</span>
                                                    )}
                                                </div>
                                            </div>

                                            {/* Profile Details */}
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <div className="bg-gray-800/50 p-3 rounded-lg">
                                                    <h3 className="text-sm font-medium text-gray-400 mb-1">Bio</h3>
                                                    <p className="text-white">
                                                        {selectedUser.profileDetail?.bio || 'Not specified'}
                                                    </p>
                                                </div>

                                                <div className="bg-gray-800/50 p-3 rounded-lg">
                                                    <h3 className="text-sm font-medium text-gray-400 mb-1">Pronouns</h3>
                                                    <p className="text-white">
                                                        {selectedUser.profileDetail?.pronoun || 'Not specified'}
                                                    </p>
                                                </div>

                                                <div className="bg-gray-800/50 p-3 rounded-lg">
                                                    <h3 className="text-sm font-medium text-gray-400 mb-1">Gender</h3>
                                                    <p className="text-white">
                                                        {selectedUser.profileDetail?.gender || 'Not specified'}
                                                    </p>
                                                </div>

                                                <div className="bg-gray-800/50 p-3 rounded-lg">
                                                    <h3 className="text-sm font-medium text-gray-400 mb-1">Profession</h3>
                                                    <p className="text-white">
                                                        {selectedUser.profileDetail?.profession || 'Not specified'}
                                                    </p>
                                                </div>
                                            </div>

                                            {/* Account Details */}
                                            <div className="bg-gray-800/30 p-4 rounded-lg">
                                                <h3 className="text-sm font-medium text-gray-400 mb-2">Account Information</h3>
                                                <div className="space-y-2">
                                                    <div className="flex justify-between">
                                                        <span className="text-gray-400">User ID:</span>
                                                        <span className="text-white font-mono text-sm">{selectedUser.id}</span>
                                                    </div>
                                                    <div className="flex justify-between">
                                                        <span className="text-gray-400">Role:</span>
                                                        <span className="text-white">
                                                            {selectedUser.role?.join(', ') || 'User'}
                                                        </span>
                                                    </div>
                                                    <div className="flex justify-between">
                                                        <span className="text-gray-400">Account Created:</span>
                                                        <span className="text-white">
                                                            {new Date(selectedUser.createdAt).toLocaleDateString()}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Action Buttons */}
                                    <div className="flex flex-wrap gap-3 mt-6 pt-4 border-t border-gray-800">
                                        {!selectedUser.role?.includes("ADMIN") && (
                                            <>
                                                {selectedUser.isBanned ? (
                                                    <button
                                                        // onClick={() => handleUnbanUser(selectedUser.id)}
                                                        className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
                                                    >
                                                        <FaCheck /> Unban User
                                                    </button>
                                                ) : (
                                                    <button
                                                        // onClick={() => handleBanUser(selectedUser.id)}
                                                        className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
                                                    >
                                                        <FaBan /> Ban User
                                                    </button>
                                                )}
                                                <button
                                                    onClick={() => handleDeleteUser(selectedUser.id)}
                                                    className="flex items-center gap-2 px-4 py-2 bg-red-900 hover:bg-red-800 text-white rounded-lg transition-colors"
                                                >
                                                    <FaTrash /> Delete Account
                                                </button>
                                            </>
                                        )}
                                        <button
                                            onClick={() => setIsModalOpen(false)}
                                            className="flex items-center gap-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors ml-auto"
                                        >
                                            Close
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default UserManagement;