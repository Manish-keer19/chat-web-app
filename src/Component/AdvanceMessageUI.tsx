// // // // import React, { useEffect, useRef, useState } from "react";
// // // // import { IoChevronBackOutline } from "react-icons/io5";
// // // // import { MdClose, MdSend } from "react-icons/md";
// // // // import { useSelector } from "react-redux";
// // // // import toast from "react-hot-toast";
// // // // import { Stomp } from "@stomp/stompjs";
// // // // import SockJS from "sockjs-client";
// // // // import { userService } from "../Service/userService";

// // // // import Navbar from "./Navbar";
// // // // import { useNavigate } from "react-router-dom";

// // // // interface User {
// // // //   id: string;
// // // //   userName: string;
// // // //   profilePic: string;
// // // //   status: "Online" | "Offline";
// // // // }

// // // // interface Message {
// // // //   sender: string;
// // // //   message: string;
// // // //   createdAt: Date;
// // // //   media?: any; // Optional for media messages
// // // // }

// // // // interface UserState {
// // // //   token: string;
// // // //   userdata: {
// // // //     id: string;
// // // //     userName: string;
// // // //     profilePic: string;
// // // //   };
// // // // }

// // // // const AdvanceMessageUI: React.FC = () => {
// // // //   const token = useSelector((state: { User: UserState }) => state.User.token);
// // // //   const userData = useSelector(
// // // //     (state: { User: UserState }) => state.User.userdata
// // // //   );
// // // //   const navigate = useNavigate();

// // // //   const [selectedUser, setSelectedUser] = useState<User | null>(null);
// // // //   const [message, setMessage] = useState<string>("");
// // // //   const [messages, setMessages] = useState<Message[]>([]);
// // // //   const [users, setUsers] = useState<User[]>([]);
// // // //   const [stompClient, setStompClient] = useState<any>(null);
// // // //   const [selectedFile, setSelectedFile] = useState<File | null>(null); // State for image/video file
// // // //   const [filePreview, setFilePreview] = useState<string | null>(null); // Preview for image/video file
// // // //   // const [sumOfSenderIdAndReceiverId, setSumOfSenderIdAndReceiverId] = useState<number>(0);

// // // //   const messagesEndRef = useRef<HTMLDivElement>(null);

// // // //   const scrollToBottom = () => {
// // // //     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
// // // //   };

// // // //   useEffect(() => {
// // // //     scrollToBottom();
// // // //   }, [messages]);

// // // //   const handleSelectUser = (user: User) => {
// // // //     setMessages([]);

// // // //     setSelectedUser(user);
// // // //   };

// // // //   const fetchAllUsersData = async () => {
// // // //     try {
// // // //       if (!token) {
// // // //         toast.error("Token not found");
// // // //         return;
// // // //       }
// // // //       const res = await userService.getUsersData(token);
// // // //       if (res.success) {
// // // //         setUsers(res.data);
// // // //       }
// // // //     } catch (error) {
// // // //       console.error("Could not fetch user data", error);
// // // //     }
// // // //   };

// // // //   useEffect(() => {
// // // //     fetchAllUsersData();
// // // //   }, [token]);

// // // //   useEffect(() => {
// // // //     // const socket = new SockJS(import.meta.env.VITE_BACKEND_URL_WEBSOCKET);
    
// // // //     const socket = new SockJS(import.meta.env.VITE_BACKEND_URL_WEBSOCKET_WITH_HTTPS);
// // // //     // const socket = new SockJS(import.meta.env.VITE_BACKEND_LOCAL_WEBSOCKET);
// // // //     const client = Stomp.over(socket);

// // // //     client.connect({}, () => {
// // // //       console.log("WebSocket connected");
// // // //       client.subscribe("/public/messages", (message) => {
// // // //         const messageData = JSON.parse(message.body);
// // // //         console.log("Message received:", messageData);
// // // //         setMessages((prevMessages) => [...prevMessages, messageData]);
// // // //         setMessage("");
// // // //       });

// // // //       client.subscribe(`/user/queue/${userData.id}`, (message) => {
// // // //         const messageData = JSON.parse(message.body);
// // // //         console.log("Message received:", messageData);
// // // //         setMessages((prevMessages) => [...prevMessages, messageData]);
// // // //         setMessage("");
// // // //       });
// // // //     });

// // // //     setStompClient(client);

// // // //     return () => {
// // // //       client.disconnect(() => console.log("WebSocket disconnected"));
// // // //     };
// // // //   }, []);

// // // //   // const sendMessage = () => {
// // // //   //   if (stompClient && (message.trim() || selectedFile) && selectedUser) {
// // // //   //     const messageData = {
// // // //   //       senderId: userData.id,
// // // //   //       receiverId: selectedUser.id,
// // // //   //       messageContent: message,
// // // //   //     };
// // // //   //     stompClient.send("/app/sendMessage", {}, JSON.stringify(messageData));
// // // //   //     console.log("Message sent:", messageData);
// // // //   //     setMessage("");
// // // //   //     setSelectedFile(null); // Clear the selected file after sending
// // // //   //     setFilePreview(null); // Clear preview after sending
// // // //   //   }
// // // //   // };

// // // //   const sendMessageSenderAndReceiver = () => {
// // // //     if (stompClient && (message.trim() || selectedFile) && selectedUser) {
// // // //       const messageData = {
// // // //         senderId: userData.id,
// // // //         receiverId: selectedUser.id,
// // // //         messageContent: message,
// // // //       };
// // // //       stompClient.send(
// // // //         "/app/sendMessageSenderAndReceiver",
// // // //         {},
// // // //         JSON.stringify(messageData)
// // // //       );
// // // //       console.log("Message sent:", messageData);
// // // //       setMessage("");
// // // //       setSelectedFile(null); // Clear the selected file after sending
// // // //       setFilePreview(null); // Clear preview after sending
// // // //     }
// // // //   };

// // // //   const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
// // // //     if (e.key === "Enter") {
// // // //       // sendMessage();
// // // //       sendMessageSenderAndReceiver();
// // // //     }
// // // //   };

// // // //   const getMessages = async () => {
// // // //     try {
// // // //       if (!selectedUser) return;
// // // //       const res = await userService.getUserMessages(token, selectedUser.id);
// // // //       if (res.success) {
// // // //         setMessages(res.data.messages);
// // // //       }
// // // //     } catch (error) {
// // // //       console.error("Could not fetch messages", error);
// // // //     }
// // // //   };

// // // //   useEffect(() => {
// // // //     if (selectedUser) {
// // // //       getMessages();
// // // //     }
// // // //   }, [selectedUser]);

// // // //   // Handle file selection and set preview
// // // //   const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
// // // //     const file = e.target.files?.[0];
// // // //     if (file) {
// // // //       setSelectedFile(file);
// // // //       console.log("Selected file:", file);
// // // //       const fileURL = URL.createObjectURL(file);
// // // //       console.log("File URL:", fileURL);
// // // //       setFilePreview(fileURL); // Set the file preview for image/video
// // // //     }
// // // //   };

// // // //   const handleFileSave = async (): Promise<void> => {
// // // //     setSelectedFile(null);
// // // //     if (!selectedFile) return; // Ensure `selectedFile` is not null
// // // //     setMessages((prev: any) => [
// // // //       ...prev,
// // // //       {
// // // //         sender: userData.id,
// // // //         createdAt: new Date(),
// // // //         media: URL.createObjectURL(selectedFile), // Correctly handle file
// // // //       },
// // // //     ]);
// // // //     try {
// // // //       const data = new FormData();
// // // //       data.append("file", selectedFile);

// // // //       data.append(
// // // //         "messageRequest",
// // // //         JSON.stringify({ senderId: userData.id, receiverId: selectedUser?.id })
// // // //       );
// // // //       const res = await userService.SendMedia(token, data);
// // // //       console.log("res is ", res);
// // // //     } catch (error) {
// // // //       console.log("Error saving file:", error);
// // // //     }
// // // //   };

// // // //   return (
// // // //     <>
// // // //       <Navbar />
// // // //       <div className="w-full min-h-screen bg-gradient-to-br from-[#1e1e2f] to-[#121212] flex flex-col">
// // // //         {/* Header */}
// // // //         <div className="flex items-center justify-between bg-gradient-to-r from-purple-700 via-purple-800 to-purple-900 p-4 shadow-lg">
// // // //           <button
// // // //             onClick={() => {
// // // //               window.history.back();
// // // //             }}
// // // //           >
// // // //             <IoChevronBackOutline
// // // //               size={25}
// // // //               className="text-white cursor-pointer hover:text-purple-300 transition-all duration-300"
// // // //             />
// // // //           </button>
// // // //           <h1 className="text-2xl text-white font-semibold">
// // // //             Manish's Chat App
// // // //           </h1>
// // // //           <button
// // // //             className="flex items-center flex-col"
// // // //             onClick={() => {
// // // //               navigate("/profile");
// // // //             }}
// // // //           >
// // // //             <img
// // // //               className="w-12 h-12 rounded-full  border-2 border-purple-400 shadow-md object-cover"
// // // //               src={userData?.profilePic}
// // // //               alt={userData?.userName}
// // // //             />
// // // //             <p className="text-white font-medium">{userData?.userName}</p>
// // // //           </button>
// // // //         </div>

// // // //         <div className="flex flex-col md:flex-row w-full flex-grow">
// // // //           {/* Users List */}
// // // //           <div className="w-full md:w-1/4 bg-[#161d39] p-6 text-white overflow-y-auto border-b md:border-r border-purple-700">
// // // //             <h2 className="text-xl mb-6 font-bold text-purple-400">Users</h2>
// // // //             <div className="space-y-4">
// // // //               {users.map((user) => (
// // // //                 <div
// // // //                   key={user.id}
// // // //                   className="flex items-center gap-4 p-4 bg-gradient-to-r from-purple-700 to-purple-900 hover:from-purple-600 hover:to-purple-800 rounded-lg cursor-pointer transition-transform transform hover:scale-105"
// // // //                   onClick={() => handleSelectUser(user)}
// // // //                 >
// // // //                   <img
// // // //                     className="w-12 h-12 rounded-full border-2 border-purple-400 object-cover"
// // // //                     src={user.profilePic}
// // // //                     alt={user.userName}
// // // //                   />
// // // //                   <div className="flex flex-col">
// // // //                     <span className="text-lg font-semibold">
// // // //                       {user.userName}
// // // //                     </span>
// // // //                     <span
// // // //                       className={`text-sm font-medium ${
// // // //                         user.status === "Online"
// // // //                           ? "text-green-400"
// // // //                           : "text-gray-500"
// // // //                       }`}
// // // //                     >
// // // //                       {user.status}
// // // //                     </span>
// // // //                   </div>
// // // //                 </div>
// // // //               ))}
// // // //             </div>
// // // //           </div>

// // // //           {/* Chat Section */}
// // // //           {selectedUser ? (
// // // //             <div className="flex-1 bg-[#121212] p-6 flex flex-col">
// // // //               <div className="bg-gradient-to-r from-purple-600 via-purple-700 to-purple-900 rounded-lg mb-4 shadow-md p-4">
// // // //                 <div className="flex items-center gap-4">
// // // //                   <img
// // // //                     className="w-16 h-16 rounded-full border-2 border-purple-400"
// // // //                     src={selectedUser.profilePic}
// // // //                     alt={selectedUser.userName}
// // // //                   />
// // // //                   <div className="flex flex-col">
// // // //                     <span className="text-2xl font-semibold text-white">
// // // //                       {selectedUser.userName}
// // // //                     </span>
// // // //                     <span className="text-sm text-gray-400">Online</span>
// // // //                   </div>
// // // //                 </div>
// // // //               </div>

// // // //               <div className="flex-1 overflow-y-auto space-y-4 min-h-[70vh] ">
// // // //                 {messages.map((msg, index) => (
// // // //                   <div
// // // //                     key={index}
// // // //                     className={`flex ${
// // // //                       msg.sender === userData.id
// // // //                         ? "justify-end"
// // // //                         : "justify-start"
// // // //                     }`}
// // // //                   >
// // // //                     <div
// // // //                       className={`p-4 rounded-lg max-w-[60%] text-white shadow-lg ${
// // // //                         msg.sender === userData.id
// // // //                           ? "bg-gradient-to-br from-purple-600 to-purple-800"
// // // //                           : "bg-gradient-to-br from-gray-700 to-gray-900"
// // // //                       }`}
// // // //                     >
// // // //                       {msg.message && <span>{msg.message}</span>}
// // // //                       {msg.media && (
// // // //                         <div className="mt-2">
// // // //                           <img
// // // //                             src={msg.media}
// // // //                             alt="media"
// // // //                             className="w-[15vw] rounded-md shadow-md"
// // // //                           />
// // // //                         </div>
// // // //                       )}
// // // //                     </div>
// // // //                   </div>
// // // //                 ))}
// // // //               </div>

// // // //               <div ref={messagesEndRef} />

// // // //               <div className="flex items-center gap-4 mt-4">
// // // //                 <input
// // // //                   type="text"
// // // //                   className="w-full p-4 rounded-lg border border-purple-700 bg-[#1e1e2f] text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
// // // //                   placeholder="Type a message..."
// // // //                   value={message}
// // // //                   onChange={(e) => setMessage(e.target.value)}
// // // //                   onKeyDown={handleKeyDown}
// // // //                 />
// // // //                 <input
// // // //                   type="file"
// // // //                   accept="image/*, video/*"
// // // //                   className="hidden"
// // // //                   id="file-input"
// // // //                   onChange={handleFileSelect}
// // // //                 />
// // // //                 <label
// // // //                   htmlFor="file-input"
// // // //                   className="p-4 bg-purple-700 rounded-lg cursor-pointer text-white hover:bg-purple-600"
// // // //                 >
// // // //                   📷
// // // //                 </label>
// // // //                 <button
// // // //                   onClick={() => {
// // // //                     handleFileSave();
// // // //                     if (message.length > 0) {
// // // //                       // sendMessage();
// // // //                       sendMessageSenderAndReceiver();
// // // //                     }
// // // //                   }}
// // // //                   className="p-4 bg-purple-700 rounded-lg text-white hover:bg-purple-600"
// // // //                 >
// // // //                   <MdSend size={20} />
// // // //                 </button>
// // // //               </div>

// // // //               {filePreview && selectedFile && (
// // // //                 <div className="mt-4 fixed bottom-[6vw]  ">
// // // //                   <button
// // // //                     onClick={() => {
// // // //                       setSelectedFile(null);
// // // //                       setFilePreview(null);
// // // //                     }} // Function to remove the file preview
// // // //                     className="absolute top-0 right-0 p-2 bg-red-600 rounded-full text-white hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-red-500 shadow-lg"
// // // //                   >
// // // //                     <MdClose size={20} />
// // // //                   </button>
// // // //                   <p className="text-white font-semibold">Preview:</p>
// // // //                   {selectedFile?.type.startsWith("image") ? (
// // // //                     <img
// // // //                       src={filePreview}
// // // //                       alt="File Preview"
// // // //                       className="w-[20vw] rounded-md shadow-lg mt-2 "
// // // //                     />
// // // //                   ) : (
// // // //                     <video
// // // //                       controls
// // // //                       className="w-[20vw] rounded-md shadow-lg mt-2"
// // // //                     >
// // // //                       <source src={filePreview} />
// // // //                       Your browser does not support the video tag.
// // // //                     </video>
// // // //                   )}
// // // //                 </div>
// // // //               )}
// // // //             </div>
// // // //           ) : (
// // // //             <div className="flex-1 flex justify-center items-center text-white">
// // // //               <span className="text-lg font-medium">
// // // //                 Select a user to start chatting
// // // //               </span>
// // // //             </div>
// // // //           )}
// // // //         </div>
// // // //       </div>
// // // //     </>
// // // //   );
// // // // };

// // // // export default AdvanceMessageUI;








// // // import React, { useEffect, useRef, useState } from "react";
// // // import { IoChevronBackOutline, IoSearchOutline } from "react-icons/io5";
// // // import { MdClose, MdSend, MdAttachFile, MdEmojiEmotions, MdMoreVert } from "react-icons/md";
// // // import { BiImageAlt, BiVideo } from "react-icons/bi";
// // // import { useSelector } from "react-redux";
// // // import toast from "react-hot-toast";
// // // import { Stomp } from "@stomp/stompjs";
// // // import SockJS from "sockjs-client";
// // // import { userService } from "../Service/userService";
// // // import Navbar from "./Navbar";
// // // import { useNavigate } from "react-router-dom";
// // // import EmojiPicker from "emoji-picker-react";
// // // import Lightbox from "react-18-image-lightbox";

// // // interface User {
// // //   id: string;
// // //   userName: string;
// // //   profilePic: string;
// // //   status: "Online" | "Offline";
// // //   lastSeen?: string;
// // // }

// // // interface Message {
// // //   sender: string;
// // //   message: string;
// // //   createdAt: Date;
// // //   media?: string;
// // //   mediaType?: "image" | "video";
// // // }

// // // interface UserState {
// // //   token: string;
// // //   userdata: {
// // //     id: string;
// // //     userName: string;
// // //     profilePic: string;
// // //   };
// // // }

// // // const AdvanceMessageUI: React.FC = () => {
// // //   const token = useSelector((state: { User: UserState }) => state.User.token);
// // //   const userData = useSelector((state: { User: UserState }) => state.User.userdata);
// // //   const navigate = useNavigate();

// // //   const [selectedUser, setSelectedUser] = useState<User | null>(null);
// // //   const [message, setMessage] = useState<string>("");
// // //   const [messages, setMessages] = useState<Message[]>([]);
// // //   const [users, setUsers] = useState<User[]>([]);
// // //   const [stompClient, setStompClient] = useState<any>(null);
// // //   const [selectedFile, setSelectedFile] = useState<File | null>(null);
// // //   const [filePreview, setFilePreview] = useState<string | null>(null);
// // //   const [searchQuery, setSearchQuery] = useState<string>("");
// // //   const [showEmojiPicker, setShowEmojiPicker] = useState<boolean>(false);
// // //   const [isLightboxOpen, setIsLightboxOpen] = useState<boolean>(false);
// // //   const [lightboxImage, setLightboxImage] = useState<string>("");
// // //   const [typing, setTyping] = useState<boolean>(false);
// // //   const [typingTimeout, setTypingTimeout] = useState<NodeJS.Timeout | null>(null);

// // //   const messagesEndRef = useRef<HTMLDivElement>(null);
// // //   const fileInputRef = useRef<HTMLInputElement>(null);
// // //   const emojiPickerRef = useRef<HTMLDivElement>(null);

// // //   // Close emoji picker when clicking outside
// // //   useEffect(() => {
// // //     const handleClickOutside = (event: MouseEvent) => {
// // //       if (emojiPickerRef.current && !emojiPickerRef.current.contains(event.target as Node)) {
// // //         setShowEmojiPicker(false);
// // //       }
// // //     };
// // //     document.addEventListener("mousedown", handleClickOutside);
// // //     return () => {
// // //       document.removeEventListener("mousedown", handleClickOutside);
// // //     };
// // //   }, []);

// // //   const scrollToBottom = () => {
// // //     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
// // //   };

// // //   useEffect(() => {
// // //     scrollToBottom();
// // //   }, [messages]);

// // //   const handleSelectUser = (user: User) => {
// // //     setMessages([]);
// // //     setSelectedUser(user);
// // //     setShowEmojiPicker(false);
// // //   };

// // //   const fetchAllUsersData = async () => {
// // //     try {
// // //       if (!token) {
// // //         toast.error("Token not found");
// // //         return;
// // //       }
// // //       const res = await userService.getUsersData(token);
// // //       if (res.success) {
// // //         setUsers(res.data);
// // //       }
// // //     } catch (error) {
// // //       console.error("Could not fetch user data", error);
// // //     }
// // //   };

// // //   useEffect(() => {
// // //     fetchAllUsersData();
// // //   }, [token]);

// // //   useEffect(() => {
// // //     const socket = new SockJS(import.meta.env.VITE_BACKEND_URL_WEBSOCKET_WITH_HTTPS);
// // //     const client = Stomp.over(socket);

// // //     client.connect({}, () => {
// // //       console.log("WebSocket connected");
      
// // //       // Public messages subscription
// // //       client.subscribe("/public/messages", (message) => {
// // //         const messageData = JSON.parse(message.body);
// // //         setMessages((prevMessages) => [...prevMessages, messageData]);
// // //       });

// // //       // Private messages subscription
// // //       client.subscribe(`/user/queue/${userData.id}`, (message) => {
// // //         const messageData = JSON.parse(message.body);
// // //         setMessages((prevMessages) => [...prevMessages, messageData]);
// // //       });

// // //       // Typing indicator subscription
// // //       client.subscribe(`/user/queue/typing`, (message) => {
// // //         const typingData = JSON.parse(message.body);
// // //         if (typingData.senderId === selectedUser?.id) {
// // //           setTyping(typingData.typing);
// // //         }
// // //       });
// // //     });

// // //     setStompClient(client);

// // //     return () => {
// // //       client.disconnect(() => console.log("WebSocket disconnected"));
// // //     };
// // //   }, [selectedUser]);

// // //   const sendTypingIndicator = (isTyping: boolean) => {
// // //     if (stompClient && selectedUser) {
// // //       stompClient.send(
// // //         "/app/typing",
// // //         {},
// // //         JSON.stringify({
// // //           senderId: userData.id,
// // //           receiverId: selectedUser.id,
// // //           typing: isTyping
// // //         })
// // //       );
// // //     }
// // //   };

// // //   const handleMessageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
// // //     setMessage(e.target.value);
    
// // //     // Send typing indicator
// // //     if (e.target.value.length > 0) {
// // //       sendTypingIndicator(true);
// // //       if (typingTimeout) {
// // //         clearTimeout(typingTimeout);
// // //       }
// // //       setTypingTimeout(setTimeout(() => {
// // //         sendTypingIndicator(false);
// // //       }, 2000));
// // //     } else {
// // //       sendTypingIndicator(false);
// // //     }
// // //   };

// // //   const sendMessage = () => {
// // //     if (stompClient && (message.trim() || selectedFile) && selectedUser) {
// // //       const messageData = {
// // //         senderId: userData.id,
// // //         receiverId: selectedUser.id,
// // //         messageContent: message,
// // //       };
// // //       stompClient.send(
// // //         "/app/sendMessageSenderAndReceiver",
// // //         {},
// // //         JSON.stringify(messageData)
// // //       );
// // //       setMessage("");
// // //       setSelectedFile(null);
// // //       setFilePreview(null);
// // //       sendTypingIndicator(false);
// // //     }
// // //   };

// // //   const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
// // //     if (e.key === "Enter" && !e.shiftKey) {
// // //       e.preventDefault();
// // //       sendMessage();
// // //     }
// // //   };

// // //   const getMessages = async () => {
// // //     try {
// // //       if (!selectedUser) return;
// // //       const res = await userService.getUserMessages(token, selectedUser.id);
// // //       if (res.success) {
// // //         setMessages(res.data.messages);
// // //       }
// // //     } catch (error) {
// // //       console.error("Could not fetch messages", error);
// // //     }
// // //   };

// // //   useEffect(() => {
// // //     if (selectedUser) {
// // //       getMessages();
// // //     }
// // //   }, [selectedUser]);

// // //   const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
// // //     const file = e.target.files?.[0];
// // //     if (file) {
// // //       setSelectedFile(file);
// // //       const fileURL = URL.createObjectURL(file);
// // //       setFilePreview(fileURL);
// // //     }
// // //   };

// // //   const handleFileSave = async (): Promise<void> => {
// // //     if (!selectedFile || !selectedUser) return;
    
// // //     try {
// // //       const data = new FormData();
// // //       data.append("file", selectedFile);
// // //       data.append(
// // //         "messageRequest",
// // //         JSON.stringify({ senderId: userData.id, receiverId: selectedUser.id })
// // //       );
      
// // //       const res = await userService.SendMedia(token, data);
// // //       if (res.success) {
// // //         setMessages(prev => [
// // //           ...prev,
// // //           {
// // //             sender: userData.id,
// // //             message: "",
// // //             createdAt: new Date(),
// // //             media: res.data.mediaUrl,
// // //             mediaType: selectedFile.type.startsWith("image") ? "image" : "video"
// // //           }
// // //         ]);
// // //       }
// // //     } catch (error) {
// // //       console.log("Error saving file:", error);
// // //     } finally {
// // //       setSelectedFile(null);
// // //       setFilePreview(null);
// // //     }
// // //   };

// // //   const handleEmojiClick = (emojiData: any) => {
// // //     setMessage(prev => prev + emojiData.emoji);
// // //     setShowEmojiPicker(false);
// // //   };

// // //   const openLightbox = (imageUrl: string) => {
// // //     setLightboxImage(imageUrl);
// // //     setIsLightboxOpen(true);
// // //   };

// // //   const filteredUsers = users.filter(user =>
// // //     user.userName.toLowerCase().includes(searchQuery.toLowerCase())
// // //   );

// // //   const formatTime = (dateString: Date | string) => {
// // //     const date = new Date(dateString);
// // //     return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
// // //   };

// // //   const isSameDay = (date1: Date, date2: Date) => {
// // //     return (
// // //       date1.getFullYear() === date2.getFullYear() &&
// // //       date1.getMonth() === date2.getMonth() &&
// // //       date1.getDate() === date2.getDate()
// // //     );
// // //   };

// // //   const formatDate = (dateString: Date | string) => {
// // //     const date = new Date(dateString);
// // //     const today = new Date();
// // //     const yesterday = new Date(today);
// // //     yesterday.setDate(yesterday.getDate() - 1);

// // //     if (isSameDay(date, today)) {
// // //       return "Today";
// // //     } else if (isSameDay(date, yesterday)) {
// // //       return "Yesterday";
// // //     } else {
// // //       return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
// // //     }
// // //   };

// // //   const groupMessagesByDate = () => {
// // //     const grouped: { [key: string]: Message[] } = {};
    
// // //     messages.forEach(message => {
// // //       const dateKey = formatDate(message.createdAt);
// // //       if (!grouped[dateKey]) {
// // //         grouped[dateKey] = [];
// // //       }
// // //       grouped[dateKey].push(message);
// // //     });
    
// // //     return grouped;
// // //   };

// // //   const groupedMessages = groupMessagesByDate();

// // //   return (
// // //     <>
// // //       <Navbar />
// // //       <div className="w-full min-h-screen bg-gray-100 dark:bg-gray-900 flex flex-col">
// // //         {/* Main Container */}
// // //         <div className="flex flex-1 overflow-hidden">
// // //           {/* Sidebar */}
// // //           <div className="w-full md:w-80 lg:w-96 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col">
// // //             {/* Sidebar Header */}
// // //             <div className="p-4 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
// // //               <div className="flex items-center justify-between">
// // //                 <div className="flex items-center">
// // //                   <button
// // //                     onClick={() => navigate(-1)}
// // //                     className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 mr-2"
// // //                   >
// // //                     <IoChevronBackOutline className="text-gray-600 dark:text-gray-300" />
// // //                   </button>
// // //                   <h1 className="text-xl font-semibold text-gray-800 dark:text-white">
// // //                     Messages
// // //                   </h1>
// // //                 </div>
// // //                 <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
// // //                   <MdMoreVert className="text-gray-600 dark:text-gray-300" />
// // //                 </button>
// // //               </div>
// // //               {/* Search Bar */}
// // //               <div className="mt-4 relative">
// // //                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
// // //                   <IoSearchOutline className="text-gray-400" />
// // //                 </div>
// // //                 <input
// // //                   type="text"
// // //                   className="w-full pl-10 pr-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-800 dark:text-white"
// // //                   placeholder="Search messages..."
// // //                   value={searchQuery}
// // //                   onChange={(e) => setSearchQuery(e.target.value)}
// // //                 />
// // //               </div>
// // //             </div>

// // //             {/* User List */}
// // //             <div className="flex-1 overflow-y-auto">
// // //               {filteredUsers.map((user) => (
// // //                 <div
// // //                   key={user.id}
// // //                   className={`flex items-center p-4 border-b border-gray-100 dark:border-gray-700 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors ${
// // //                     selectedUser?.id === user.id ? "bg-purple-50 dark:bg-gray-700" : ""
// // //                   }`}
// // //                   onClick={() => handleSelectUser(user)}
// // //                 >
// // //                   <div className="relative">
// // //                     <img
// // //                       className="w-12 h-12 rounded-full object-cover"
// // //                       src={user.profilePic}
// // //                       alt={user.userName}
// // //                     />
// // //                     <span
// // //                       className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white dark:border-gray-800 ${
// // //                         user.status === "Online" ? "bg-green-500" : "bg-gray-400"
// // //                       }`}
// // //                     ></span>
// // //                   </div>
// // //                   <div className="ml-3 flex-1">
// // //                     <div className="flex justify-between items-center">
// // //                       <h3 className="text-sm font-semibold text-gray-800 dark:text-white">
// // //                         {user.userName}
// // //                       </h3>
// // //                       <span className="text-xs text-gray-500 dark:text-gray-400">
// // //                         {user.lastSeen || "Just now"}
// // //                       </span>
// // //                     </div>
// // //                     <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
// // //                       {user.status === "Online" ? "Online" : "Offline"}
// // //                     </p>
// // //                   </div>
// // //                 </div>
// // //               ))}
// // //             </div>
// // //           </div>

// // //           {/* Chat Area */}
// // //           {selectedUser ? (
// // //             <div className="flex-1 flex flex-col bg-gray-50 dark:bg-gray-900">
// // //               {/* Chat Header */}
// // //               <div className="p-4 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 flex items-center justify-between">
// // //                 <div className="flex items-center">
// // //                   <button
// // //                     onClick={() => setSelectedUser(null)}
// // //                     className="md:hidden p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 mr-2"
// // //                   >
// // //                     <IoChevronBackOutline className="text-gray-600 dark:text-gray-300" />
// // //                   </button>
// // //                   <div className="relative">
// // //                     <img
// // //                       className="w-10 h-10 rounded-full object-cover"
// // //                       src={selectedUser.profilePic}
// // //                       alt={selectedUser.userName}
// // //                     />
// // //                     <span
// // //                       className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white dark:border-gray-800 ${
// // //                         selectedUser.status === "Online" ? "bg-green-500" : "bg-gray-400"
// // //                       }`}
// // //                     ></span>
// // //                   </div>
// // //                   <div className="ml-3">
// // //                     <h3 className="text-sm font-semibold text-gray-800 dark:text-white">
// // //                       {selectedUser.userName}
// // //                     </h3>
// // //                     <p className="text-xs text-gray-500 dark:text-gray-400">
// // //                       {typing ? "typing..." : selectedUser.status}
// // //                     </p>
// // //                   </div>
// // //                 </div>
// // //                 <div className="flex items-center space-x-2">
// // //                   <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
// // //                     <IoSearchOutline className="text-gray-600 dark:text-gray-300" />
// // //                   </button>
// // //                   <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
// // //                     <MdMoreVert className="text-gray-600 dark:text-gray-300" />
// // //                   </button>
// // //                 </div>
// // //               </div>

// // //               {/* Messages */}
// // //               <div className="flex-1 p-4 overflow-y-auto">
// // //                 {Object.entries(groupedMessages).map(([date, dateMessages]) => (
// // //                   <div key={date} className="mb-6">
// // //                     <div className="flex justify-center mb-4">
// // //                       <span className="px-3 py-1 bg-gray-200 dark:bg-gray-700 text-xs text-gray-600 dark:text-gray-300 rounded-full">
// // //                         {date}
// // //                       </span>
// // //                     </div>
// // //                     {dateMessages.map((msg, index) => (
// // //                       <div
// // //                         key={index}
// // //                         className={`flex mb-4 ${
// // //                           msg.sender === userData.id ? "justify-end" : "justify-start"
// // //                         }`}
// // //                       >
// // //                         <div
// // //                           className={`max-w-xs md:max-w-md lg:max-w-lg rounded-lg p-3 ${
// // //                             msg.sender === userData.id
// // //                               ? "bg-purple-500 text-white rounded-br-none"
// // //                               : "bg-white dark:bg-gray-700 text-gray-800 dark:text-white rounded-bl-none"
// // //                           } shadow`}
// // //                         >
// // //                           {msg.media && (
// // //                             <div className="mb-2">
// // //                               <img
// // //                                 src={msg.media}
// // //                                 alt="Media"
// // //                                 className="rounded-lg cursor-pointer max-h-60 object-cover"
// // //                                 onClick={() => openLightbox(msg.media!)}
// // //                               />
// // //                             </div>
// // //                           )}
// // //                           {/* {msg.media && msg.mediaType === "video" && (
// // //                             <div className="mb-2">
// // //                               <video controls className="rounded-lg max-h-60">
// // //                                 <source src={msg.media} />
// // //                                 Your browser does not support the video tag.
// // //                               </video>
// // //                             </div>
// // //                           )} */}
// // //                           {msg.message && <p className="text-sm">{msg.message}</p>}
// // //                           <div
// // //                             className={`text-xs mt-1 ${
// // //                               msg.sender === userData.id
// // //                                 ? "text-purple-100"
// // //                                 : "text-gray-500 dark:text-gray-400"
// // //                             }`}
// // //                           >
// // //                             {formatTime(msg.createdAt)}
// // //                           </div>
// // //                         </div>
// // //                       </div>
// // //                     ))}
// // //                     <div ref={messagesEndRef} />
// // //                   </div>
// // //                 ))}
// // //               </div>

// // //               {/* Message Input */}
// // //               <div className="p-4 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
// // //                 {filePreview && selectedFile && (
// // //                   <div className="relative mb-4 p-3 bg-gray-100 dark:bg-gray-700 rounded-lg">
// // //                     <button
// // //                       onClick={() => {
// // //                         setSelectedFile(null);
// // //                         setFilePreview(null);
// // //                       }}
// // //                       className="absolute -top-2 -right-2 p-1 bg-red-500 rounded-full text-white hover:bg-red-600"
// // //                     >
// // //                       <MdClose size={16} />
// // //                     </button>
// // //                     {selectedFile.type.startsWith("image") ? (
// // //                       <div className="flex items-center">
// // //                         <BiImageAlt className="text-gray-500 mr-2" size={20} />
// // //                         <img
// // //                           src={filePreview}
// // //                           alt="Preview"
// // //                           className="h-16 rounded-md"
// // //                         />
// // //                       </div>
// // //                     ) : (
// // //                       <div className="flex items-center">
// // //                         <BiVideo className="text-gray-500 mr-2" size={20} />
// // //                         <video className="h-16 rounded-md">
// // //                           <source src={filePreview} />
// // //                         </video>
// // //                       </div>
// // //                     )}
// // //                   </div>
// // //                 )}
// // //                 <div className="flex items-center">
// // //                   <button
// // //                     onClick={() => fileInputRef.current?.click()}
// // //                     className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300"
// // //                   >
// // //                     <MdAttachFile size={24} />
// // //                   </button>
// // //                   <input
// // //                     type="file"
// // //                     ref={fileInputRef}
// // //                     accept="image/*, video/*"
// // //                     className="hidden"
// // //                     onChange={handleFileSelect}
// // //                   />
// // //                   <button
// // //                     onClick={() => setShowEmojiPicker(!showEmojiPicker)}
// // //                     className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300"
// // //                   >
// // //                     <MdEmojiEmotions size={24} />
// // //                   </button>
// // //                   <div className="relative flex-1 mx-2">
// // //                     <input
// // //                       type="text"
// // //                       className="w-full p-3 bg-gray-100 dark:bg-gray-700 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-800 dark:text-white"
// // //                       placeholder="Type a message..."
// // //                       value={message}
// // //                       onChange={handleMessageChange}
// // //                       onKeyDown={handleKeyDown}
// // //                     />
// // //                     {showEmojiPicker && (
// // //                       <div ref={emojiPickerRef} className="absolute bottom-14 left-0 z-10">
// // //                         <EmojiPicker onEmojiClick={handleEmojiClick} width={300} height={350} />
// // //                       </div>
// // //                     )}
// // //                   </div>
// // //                   <button
// // //                     onClick={() => {
// // //                       if (selectedFile) {
// // //                         handleFileSave();
// // //                       }
// // //                       if (message.trim()) {
// // //                         sendMessage();
// // //                       }
// // //                     }}
// // //                     className="p-3 bg-purple-500 rounded-full text-white hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
// // //                     disabled={!message.trim() && !selectedFile}
// // //                   >
// // //                     <MdSend size={24} />
// // //                   </button>
// // //                 </div>
// // //               </div>
// // //             </div>
// // //           ) : (
// // //             <div className="hidden md:flex flex-1 items-center justify-center bg-gray-50 dark:bg-gray-900">
// // //               <div className="text-center p-6 max-w-md">
// // //                 <div className="mx-auto w-24 h-24 bg-purple-100 dark:bg-gray-700 rounded-full flex items-center justify-center mb-4">
// // //                   <MdSend className="text-purple-500 dark:text-purple-400" size={40} />
// // //                 </div>
// // //                 <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
// // //                   Select a conversation
// // //                 </h2>
// // //                 <p className="text-gray-500 dark:text-gray-400 mb-6">
// // //                   Choose from your existing conversations or start a new one
// // //                 </p>
               
// // //               </div>
// // //             </div>
// // //           )}
// // //         </div>

// // //         {/* Lightbox for image viewing */}
// // //         {isLightboxOpen && (
// // //           <Lightbox
// // //             mainSrc={lightboxImage}
// // //             onCloseRequest={() => setIsLightboxOpen(false)}
// // //             enableZoom={true}
// // //           />
// // //         )}
// // //       </div>
// // //     </>
// // //   );
// // // };

// // // export default AdvanceMessageUI;









// // import React, { useEffect, useRef, useState } from "react";
// // import { IoChevronBackOutline, IoSearchOutline } from "react-icons/io5";
// // import { MdClose, MdSend, MdAttachFile, MdEmojiEmotions, MdMoreVert } from "react-icons/md";
// // import { BiImageAlt } from "react-icons/bi";
// // import { useSelector } from "react-redux";
// // import toast from "react-hot-toast";
// // import { Stomp } from "@stomp/stompjs";
// // import SockJS from "sockjs-client";
// // import { userService } from "../Service/userService";
// // import Navbar from "./Navbar";
// // import { useNavigate } from "react-router-dom";
// // import EmojiPicker from "emoji-picker-react";
// // import Lightbox from "react-18-image-lightbox";
// // import "react-18-image-lightbox/style.css";

// // interface User {
// //   id: string;
// //   userName: string;
// //   profilePic: string;
// //   status: "Online" | "Offline";
// //   lastSeen?: string;
// // }

// // interface Message {
// //   id: string;
// //   sender: string;
// //   message: string;
// //   createdAt: string | Date;
// //   media?: string;
// //   mediaType?: "image";
// // }

// // interface UserState {
// //   token: string;
// //   userdata: {
// //     id: string;
// //     userName: string;
// //     profilePic: string;
// //   };
// // }

// // const AdvanceMessageUI: React.FC = () => {
// //   const token = useSelector((state: { User: UserState }) => state.User.token);
// //   const userData = useSelector((state: { User: UserState }) => state.User.userdata);
// //   const navigate = useNavigate();

// //   const [selectedUser, setSelectedUser] = useState<User | null>(null);
// //   const [message, setMessage] = useState<string>("");
// //   const [messages, setMessages] = useState<Message[]>([]);
// //   const [users, setUsers] = useState<User[]>([]);
// //   const [stompClient, setStompClient] = useState<any>(null);
// //   const [selectedFile, setSelectedFile] = useState<File | null>(null);
// //   const [filePreview, setFilePreview] = useState<string | null>(null);
// //   const [searchQuery, setSearchQuery] = useState<string>("");
// //   const [showEmojiPicker, setShowEmojiPicker] = useState<boolean>(false);
// //   const [isLightboxOpen, setIsLightboxOpen] = useState<boolean>(false);
// //   const [lightboxImage, setLightboxImage] = useState<string>("");
// //   const [typing, setTyping] = useState<boolean>(false);
// //   const [typingTimeout, setTypingTimeout] = useState<NodeJS.Timeout | null>(null);
// //   const [isMobileView, setIsMobileView] = useState<boolean>(window.innerWidth < 768);

// //   const messagesEndRef = useRef<HTMLDivElement>(null);
// //   const fileInputRef = useRef<HTMLInputElement>(null);
// //   const emojiPickerRef = useRef<HTMLDivElement>(null);
// //   const messageInputRef = useRef<HTMLInputElement>(null);

// //   // Handle window resize
// //   useEffect(() => {
// //     const handleResize = () => {
// //       setIsMobileView(window.innerWidth < 768);
// //     };
// //     window.addEventListener("resize", handleResize);
// //     return () => window.removeEventListener("resize", handleResize);
// //   }, []);

// //   // Close emoji picker when clicking outside
// //   useEffect(() => {
// //     const handleClickOutside = (event: MouseEvent) => {
// //       if (emojiPickerRef.current && !emojiPickerRef.current.contains(event.target as Node)) {
// //         setShowEmojiPicker(false);
// //       }
// //     };
// //     document.addEventListener("mousedown", handleClickOutside);
// //     return () => {
// //       document.removeEventListener("mousedown", handleClickOutside);
// //     };
// //   }, []);

// //   const scrollToBottom = () => {
// //     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
// //   };

// //   useEffect(() => {
// //     scrollToBottom();
// //   }, [messages]);

// //   const handleSelectUser = (user: User) => {
// //     setMessages([]);
// //     setSelectedUser(user);
// //     setShowEmojiPicker(false);
// //   };

// //   const fetchAllUsersData = async () => {
// //     try {
// //       if (!token) {
// //         toast.error("Token not found");
// //         return;
// //       }
// //       const res = await userService.getUsersData(token);
// //       if (res.success) {
// //         setUsers(res.data);
// //       }
// //     } catch (error) {
// //       console.error("Could not fetch user data", error);
// //     }
// //   };

// //   useEffect(() => {
// //     fetchAllUsersData();
// //   }, [token]);

// //   useEffect(() => {
// //     if (!userData?.id) return;

// //     const socket = new SockJS(import.meta.env.VITE_BACKEND_URL_WEBSOCKET_WITH_HTTPS);
// //     const client = Stomp.over(socket);

// //     client.connect({}, () => {
// //       console.log("WebSocket connected");
      
// //       // Public messages subscription
// //       client.subscribe("/public/messages", (message) => {
// //         const messageData = JSON.parse(message.body);
// //         setMessages((prevMessages) => [...prevMessages, messageData]);
// //       });

// //       // Private messages subscription
// //       client.subscribe(`/user/queue/${userData.id}`, (message) => {
// //         const messageData = JSON.parse(message.body);
// //         setMessages((prevMessages) => [...prevMessages, messageData]);
// //       });

// //       // Typing indicator subscription
// //       client.subscribe(`/user/queue/typing`, (message) => {
// //         const typingData = JSON.parse(message.body);
// //         if (typingData.senderId === selectedUser?.id) {
// //           setTyping(typingData.typing);
// //         }
// //       });
// //     });

// //     setStompClient(client);

// //     return () => {
// //       if (client.connected) {
// //         client.disconnect(() => console.log("WebSocket disconnected"));
// //       }
// //     };
// //   }, [selectedUser, userData]);

// //   const sendTypingIndicator = (isTyping: boolean) => {
// //     if (stompClient && selectedUser) {
// //       stompClient.send(
// //         "/app/typing",
// //         {},
// //         JSON.stringify({
// //           senderId: userData.id,
// //           receiverId: selectedUser.id,
// //           typing: isTyping
// //         })
// //       );
// //     }
// //   };

// //   const handleMessageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
// //     setMessage(e.target.value);
    
// //     if (e.target.value.length > 0) {
// //       sendTypingIndicator(true);
// //       if (typingTimeout) {
// //         clearTimeout(typingTimeout);
// //       }
// //       setTypingTimeout(setTimeout(() => {
// //         sendTypingIndicator(false);
// //       }, 2000));
// //     } else {
// //       sendTypingIndicator(false);
// //     }
// //   };

// //   const sendMessage = () => {
// //     if (stompClient && (message.trim() || selectedFile) && selectedUser) {
// //       const messageData = {
// //         senderId: userData.id,
// //         receiverId: selectedUser.id,
// //         messageContent: message,
// //       };
// //       stompClient.send(
// //         "/app/sendMessageSenderAndReceiver",
// //         {},
// //         JSON.stringify(messageData)
// //       );
// //       setMessage("");
// //       setSelectedFile(null);
// //       setFilePreview(null);
// //       sendTypingIndicator(false);
// //     }
// //   };

// //   const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
// //     if (e.key === "Enter" && !e.shiftKey) {
// //       e.preventDefault();
// //       sendMessage();
// //     }
// //   };

// //   const getMessages = async () => {
// //     try {
// //       if (!selectedUser || !token) return;
// //       const res = await userService.getUserMessages(token, selectedUser.id);
// //       if (res.success) {
// //         const formattedMessages = res.data.messages.map((msg: any) => ({
// //           ...msg,
// //           createdAt: new Date(msg.createdAt)
// //         }));
// //         setMessages(formattedMessages);
// //         setTimeout(() => scrollToBottom(), 100);
// //       }
// //     } catch (error) {
// //       console.error("Could not fetch messages", error);
// //     }
// //   };

// //   useEffect(() => {
// //     if (selectedUser) {
// //       getMessages();
// //     }
// //   }, [selectedUser]);

// //   const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
// //     const file = e.target.files?.[0];
// //     if (file && file.type.startsWith("image")) {
// //       setSelectedFile(file);
// //       const fileURL = URL.createObjectURL(file);
// //       setFilePreview(fileURL);
// //       if (e.target) e.target.value = '';
// //     } else {
// //       toast.error("Please select an image file");
// //     }
// //   };

// //   const handleFileSave = async (): Promise<void> => {
// //     if (!selectedFile || !selectedUser || !token) return;
    
// //     try {
// //       const data = new FormData();
// //       data.append("file", selectedFile);
// //       data.append(
// //         "messageRequest",
// //         JSON.stringify({ senderId: userData.id, receiverId: selectedUser.id })
// //       );
      
// //       const res = await userService.SendMedia(token, data);
// //       if (res.success) {
// //         const newMessage = {
// //           id: Date.now().toString(),
// //           sender: userData.id,
// //           message: "",
// //           createdAt: new Date(),
// //           media: res.data.mediaUrl,
// //           mediaType: "image"
// //         };
        
// //         setMessages(prev => [...prev, newMessage]);
// //         scrollToBottom();
// //       }
// //     } catch (error) {
// //       console.error("Error saving file:", error);
// //       toast.error("Failed to send image");
// //     } finally {
// //       setSelectedFile(null);
// //       setFilePreview(null);
// //     }
// //   };

// //   const handleEmojiClick = (emojiData: any) => {
// //     setMessage(prev => prev + emojiData.emoji);
// //     setShowEmojiPicker(false);
// //   };

// //   const openLightbox = (imageUrl: string) => {
// //     setLightboxImage(imageUrl);
// //     setIsLightboxOpen(true);
// //   };

// //   const filteredUsers = users.filter(user =>
// //     user.userName.toLowerCase().includes(searchQuery.toLowerCase())
// //   );

// //   const formatTime = (dateString: Date | string) => {
// //     const date = typeof dateString === 'string' ? new Date(dateString) : dateString;
// //     return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
// //   };

// //   const isSameDay = (date1: Date, date2: Date) => {
// //     return (
// //       date1.getFullYear() === date2.getFullYear() &&
// //       date1.getMonth() === date2.getMonth() &&
// //       date1.getDate() === date2.getDate()
// //     );
// //   };

// //   const formatDate = (dateString: Date | string) => {
// //     const date = typeof dateString === 'string' ? new Date(dateString) : dateString;
// //     const today = new Date();
// //     const yesterday = new Date(today);
// //     yesterday.setDate(yesterday.getDate() - 1);

// //     if (isSameDay(date, today)) {
// //       return "Today";
// //     } else if (isSameDay(date, yesterday)) {
// //       return "Yesterday";
// //     } else {
// //       return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
// //     }
// //   };

// //   const groupMessagesByDate = () => {
// //     const grouped: { [key: string]: Message[] } = {};
    
// //     messages.forEach(message => {
// //       const dateKey = formatDate(message.createdAt);
// //       if (!grouped[dateKey]) {
// //         grouped[dateKey] = [];
// //       }
// //       grouped[dateKey].push(message);
// //     });
    
// //     return grouped;
// //   };

// //   const groupedMessages = groupMessagesByDate();

// //   return (
// //     <>
// //       <Navbar />
// //       <div className="w-full min-h-screen bg-gray-100 dark:bg-gray-900 flex flex-col">
// //         {/* Main Container */}
// //         <div className="flex flex-1 overflow-hidden">
// //           {/* Sidebar */}
// //           {(!isMobileView || !selectedUser) && (
// //             <div className={`w-full ${isMobileView ? 'absolute inset-0 z-10' : 'md:w-80 lg:w-96'} bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col`}>
// //               {/* Sidebar Header */}
// //               <div className="p-4 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
// //                 <div className="flex items-center justify-between">
// //                   <div className="flex items-center">
// //                     {isMobileView && (
// //                       <button
// //                         onClick={() => navigate(-1)}
// //                         className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 mr-2"
// //                       >
// //                         <IoChevronBackOutline className="text-gray-600 dark:text-gray-300" />
// //                       </button>
// //                     )}
// //                     <h1 className="text-xl font-semibold text-gray-800 dark:text-white">
// //                       Messages
// //                     </h1>
// //                   </div>
// //                   <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
// //                     <MdMoreVert className="text-gray-600 dark:text-gray-300" />
// //                   </button>
// //                 </div>
// //                 {/* Search Bar */}
// //                 <div className="mt-4 relative">
// //                   <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
// //                     <IoSearchOutline className="text-gray-400" />
// //                   </div>
// //                   <input
// //                     type="text"
// //                     className="w-full pl-10 pr-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-800 dark:text-white"
// //                     placeholder="Search messages..."
// //                     value={searchQuery}
// //                     onChange={(e) => setSearchQuery(e.target.value)}
// //                   />
// //                 </div>
// //               </div>

// //               {/* User List */}
// //               <div className="flex-1 overflow-y-auto">
// //                 {filteredUsers.length > 0 ? (
// //                   filteredUsers.map((user) => (
// //                     <div
// //                       key={user.id}
// //                       className={`flex items-center p-4 border-b border-gray-100 dark:border-gray-700 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors ${
// //                         selectedUser?.id === user.id ? "bg-purple-50 dark:bg-gray-700" : ""
// //                       }`}
// //                       onClick={() => handleSelectUser(user)}
// //                     >
// //                       <div className="relative">
// //                         <img
// //                           className="w-12 h-12 rounded-full object-cover"
// //                           src={user.profilePic}
// //                           alt={user.userName}
// //                           onError={(e) => {
// //                             (e.target as HTMLImageElement).src = 'https://via.placeholder.com/150';
// //                           }}
// //                         />
// //                         <span
// //                           className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white dark:border-gray-800 ${
// //                             user.status === "Online" ? "bg-green-500" : "bg-gray-400"
// //                           }`}
// //                         ></span>
// //                       </div>
// //                       <div className="ml-3 flex-1">
// //                         <div className="flex justify-between items-center">
// //                           <h3 className="text-sm font-semibold text-gray-800 dark:text-white">
// //                             {user.userName}
// //                           </h3>
// //                           <span className="text-xs text-gray-500 dark:text-gray-400">
// //                             {user.lastSeen || "Just now"}
// //                           </span>
// //                         </div>
// //                         <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
// //                           {user.status === "Online" ? "Online" : "Offline"}
// //                         </p>
// //                       </div>
// //                     </div>
// //                   ))
// //                 ) : (
// //                   <div className="p-4 text-center text-gray-500 dark:text-gray-400">
// //                     No users found
// //                   </div>
// //                 )}
// //               </div>
// //             </div>
// //           )}

// //           {/* Chat Area */}
// //           {selectedUser ? (
// //             <div className={`flex-1 flex flex-col bg-gray-50 dark:bg-gray-900 ${isMobileView ? 'absolute inset-0 z-20' : ''}`}>
// //               {/* Chat Header */}
// //               <div className="p-4 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 flex items-center justify-between">
// //                 <div className="flex items-center">
// //                   {isMobileView && (
// //                     <button
// //                       onClick={() => setSelectedUser(null)}
// //                       className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 mr-2"
// //                     >
// //                       <IoChevronBackOutline className="text-gray-600 dark:text-gray-300" />
// //                     </button>
// //                   )}
// //                   <div className="relative">
// //                     <img
// //                       className="w-10 h-10 rounded-full object-cover"
// //                       src={selectedUser.profilePic}
// //                       alt={selectedUser.userName}
// //                       onError={(e) => {
// //                         (e.target as HTMLImageElement).src = 'https://via.placeholder.com/150';
// //                       }}
// //                     />
// //                     <span
// //                       className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white dark:border-gray-800 ${
// //                         selectedUser.status === "Online" ? "bg-green-500" : "bg-gray-400"
// //                       }`}
// //                     ></span>
// //                   </div>
// //                   <div className="ml-3">
// //                     <h3 className="text-sm font-semibold text-gray-800 dark:text-white">
// //                       {selectedUser.userName}
// //                     </h3>
// //                     <p className="text-xs text-gray-500 dark:text-gray-400">
// //                       {typing ? "typing..." : selectedUser.status}
// //                     </p>
// //                   </div>
// //                 </div>
// //                 <div className="flex items-center space-x-2">
// //                   <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
// //                     <IoSearchOutline className="text-gray-600 dark:text-gray-300" />
// //                   </button>
// //                   <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
// //                     <MdMoreVert className="text-gray-600 dark:text-gray-300" />
// //                   </button>
// //                 </div>
// //               </div>

// //               {/* Messages */}
// //               <div className="flex-1 p-4 overflow-y-auto">
// //                 {Object.entries(groupedMessages).map(([date, dateMessages]) => (
// //                   <div key={date} className="mb-6">
// //                     <div className="flex justify-center mb-4">
// //                       <span className="px-3 py-1 bg-gray-200 dark:bg-gray-700 text-xs text-gray-600 dark:text-gray-300 rounded-full">
// //                         {date}
// //                       </span>
// //                     </div>
// //                     {dateMessages.map((msg, index) => (
// //                       <div
// //                         key={msg.id || index}
// //                         className={`flex mb-4 ${
// //                           msg.sender === userData.id ? "justify-end" : "justify-start"
// //                         }`}
// //                       >
// //                         <div
// //                           className={`max-w-xs md:max-w-md lg:max-w-lg rounded-lg p-3 ${
// //                             msg.sender === userData.id
// //                               ? "bg-purple-500 text-white rounded-br-none"
// //                               : "bg-white dark:bg-gray-700 text-gray-800 dark:text-white rounded-bl-none"
// //                           } shadow`}
// //                         >
// //                           {msg.media && (
// //                             <div className="mb-2 overflow-hidden rounded-lg">
// //                               <img
// //                                 src={msg.media}
// //                                 alt="Media"
// //                                 className="max-h-60 w-full object-cover cursor-pointer hover:opacity-90 transition-opacity"
// //                                 onClick={() => openLightbox(msg.media!)}
// //                                 // onError={(e) => {
// //                                 //   (e.target as HTMLImageElement).src = 'https://via.placeholder.com/300';
// //                                 // }}
// //                               />
// //                             </div>
// //                           )}
// //                           {msg.message && <p className="text-sm whitespace-pre-wrap break-words">{msg.message}</p>}
// //                           <div
// //                             className={`text-xs mt-1 flex justify-end items-center ${
// //                               msg.sender === userData.id
// //                                 ? "text-purple-100"
// //                                 : "text-gray-500 dark:text-gray-400"
// //                             }`}
// //                           >
// //                             {formatTime(msg.createdAt)}
// //                           </div>
// //                         </div>
// //                       </div>
// //                     ))}
// //                   </div>
// //                 ))}
// //                 <div ref={messagesEndRef} />
// //               </div>

// //               {/* Message Input */}
// //               <div className="p-4 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
// //                 {filePreview && selectedFile && (
// //                   <div className="relative mb-4 p-3 bg-gray-100 dark:bg-gray-700 rounded-lg">
// //                     <button
// //                       onClick={() => {
// //                         setSelectedFile(null);
// //                         setFilePreview(null);
// //                       }}
// //                       className="absolute -top-2 -right-2 p-1 bg-red-500 rounded-full text-white hover:bg-red-600 transition-colors"
// //                     >
// //                       <MdClose size={16} />
// //                     </button>
// //                     <div className="flex items-center">
// //                       <BiImageAlt className="text-gray-500 mr-2" size={20} />
// //                       <img
// //                         src={filePreview}
// //                         alt="Preview"
// //                         className="h-16 rounded-md object-cover"
// //                       />
// //                     </div>
// //                   </div>
// //                 )}
// //                 <div className="flex items-center">
// //                   <button
// //                     onClick={() => fileInputRef.current?.click()}
// //                     className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300 transition-colors"
// //                   >
// //                     <MdAttachFile size={24} />
// //                   </button>
// //                   <input
// //                     type="file"
// //                     ref={fileInputRef}
// //                     accept="image/*"
// //                     className="hidden"
// //                     onChange={handleFileSelect}
// //                   />
// //                   <button
// //                     onClick={() => setShowEmojiPicker(!showEmojiPicker)}
// //                     className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300 transition-colors"
// //                   >
// //                     <MdEmojiEmotions size={24} />
// //                   </button>
// //                   <div className="relative flex-1 mx-2">
// //                     <input
// //                       type="text"
// //                       ref={messageInputRef}
// //                       className="w-full p-3 bg-gray-100 dark:bg-gray-700 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-800 dark:text-white"
// //                       placeholder="Type a message..."
// //                       value={message}
// //                       onChange={handleMessageChange}
// //                       onKeyDown={handleKeyDown}
// //                     />
// //                     {showEmojiPicker && (
// //                       <div ref={emojiPickerRef} className="absolute bottom-14 left-0 z-10">
// //                         <EmojiPicker 
// //                           onEmojiClick={handleEmojiClick} 
// //                           width={300} 
// //                           height={350}
// //                           searchDisabled
// //                           skinTonesDisabled
// //                           previewConfig={{ showPreview: false }}
// //                         />
// //                       </div>
// //                     )}
// //                   </div>
// //                   <button
// //                     onClick={() => {
// //                       if (selectedFile) {
// //                         handleFileSave();
// //                       } else if (message.trim()) {
// //                         sendMessage();
// //                       }
// //                     }}
// //                     className={`p-3 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-colors ${
// //                       message.trim() || selectedFile
// //                         ? "bg-purple-500 text-white hover:bg-purple-600"
// //                         : "bg-gray-200 dark:bg-gray-700 text-gray-400 cursor-not-allowed"
// //                     }`}
// //                     disabled={!message.trim() && !selectedFile}
// //                   >
// //                     <MdSend size={24} />
// //                   </button>
// //                 </div>
// //               </div>
// //             </div>
// //           ) : (
// //             <div className="hidden md:flex flex-1 items-center justify-center bg-gray-50 dark:bg-gray-900">
// //               <div className="text-center p-6 max-w-md">
// //                 <div className="mx-auto w-24 h-24 bg-purple-100 dark:bg-gray-700 rounded-full flex items-center justify-center mb-4">
// //                   <MdSend className="text-purple-500 dark:text-purple-400" size={40} />
// //                 </div>
// //                 <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
// //                   Select a conversation
// //                 </h2>
// //                 <p className="text-gray-500 dark:text-gray-400 mb-6">
// //                   Choose from your existing conversations or start a new one
// //                 </p>
// //                 <button
// //                   onClick={() => navigate("/contacts")}
// //                   className="px-6 py-2 bg-purple-500 text-white rounded-full hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-colors"
// //                 >
// //                   New Message
// //                 </button>
// //               </div>
// //             </div>
// //           )}
// //         </div>

// //         {/* Lightbox for image viewing */}
// //         {isLightboxOpen && (
// //           <Lightbox
// //             mainSrc={lightboxImage}
// //             onCloseRequest={() => setIsLightboxOpen(false)}
// //             enableZoom={true}
// //           />
// //         )}
// //       </div>
// //     </>
// //   );
// // };

// // export default AdvanceMessageUI;





// import React, { useEffect, useRef, useState, useCallback } from "react";
// import { IoChevronBackOutline, IoSearchOutline, IoArrowDown } from "react-icons/io5";
// import { MdClose, MdSend, MdAttachFile, MdEmojiEmotions, MdMoreVert } from "react-icons/md";
// import { BiImageAlt } from "react-icons/bi";
// import { useSelector } from "react-redux";
// import toast from "react-hot-toast";
// import { Stomp } from "@stomp/stompjs";
// import SockJS from "sockjs-client";
// import { userService } from "../Service/userService";
// import Navbar from "./Navbar";
// import { useNavigate } from "react-router-dom";
// import EmojiPicker from "emoji-picker-react";
// import Lightbox from "react-18-image-lightbox";
// import "react-18-image-lightbox/style.css";

// interface User {
//   id: string;
//   userName: string;
//   profilePic: string;
//   status: "Online" | "Offline";
//   lastSeen?: string;
// }

// interface Message {
//   id: string;
//   sender: string;
//   message: string;
//   createdAt: string | Date;
//   media?: string;
//   mediaType?: "image";
// }

// interface UserState {
//   token: string;
//   userdata: {
//     id: string;
//     userName: string;
//     profilePic: string;
//   };
// }

// const AdvanceMessageUI: React.FC = () => {
//   const token = useSelector((state: { User: UserState }) => state.User.token);
//   const userData = useSelector((state: { User: UserState }) => state.User.userdata);
//   const navigate = useNavigate();

//   const [selectedUser, setSelectedUser] = useState<User | null>(null);
//   const [message, setMessage] = useState<string>("");
//   const [messages, setMessages] = useState<Message[]>([]);
//   const [users, setUsers] = useState<User[]>([]);
//   const [stompClient, setStompClient] = useState<any>(null);
//   const [selectedFile, setSelectedFile] = useState<File | null>(null);
//   const [filePreview, setFilePreview] = useState<string | null>(null);
//   const [searchQuery, setSearchQuery] = useState<string>("");
//   const [showEmojiPicker, setShowEmojiPicker] = useState<boolean>(false);
//   const [isLightboxOpen, setIsLightboxOpen] = useState<boolean>(false);
//   const [lightboxImage, setLightboxImage] = useState<string>("");
//   const [typing, setTyping] = useState<boolean>(false);
//   const [typingTimeout, setTypingTimeout] = useState<NodeJS.Timeout | null>(null);
//   const [isMobileView, setIsMobileView] = useState<boolean>(window.innerWidth < 768);
//   const [showScrollButton, setShowScrollButton] = useState<boolean>(false);
//   const [loadingImages, setLoadingImages] = useState<{ [key: string]: boolean }>({});

//   const messagesEndRef = useRef<HTMLDivElement>(null);
//   const fileInputRef = useRef<HTMLInputElement>(null);
//   const emojiPickerRef = useRef<HTMLDivElement>(null);
//   const messageInputRef = useRef<HTMLInputElement>(null);
//   const messagesContainerRef = useRef<HTMLDivElement>(null);

//   // Handle window resize
//   useEffect(() => {
//     const handleResize = () => {
//       setIsMobileView(window.innerWidth < 768);
//     };
//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   // Close emoji picker when clicking outside
//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       if (emojiPickerRef.current && !emojiPickerRef.current.contains(event.target as Node)) {
//         setShowEmojiPicker(false);
//       }
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, []);

//   // Scroll behavior and button visibility
//   useEffect(() => {
//     const container = messagesContainerRef.current;
//     if (!container) return;

//     const handleScroll = () => {
//       if (container) {
//         const { scrollTop, scrollHeight, clientHeight } = container;
//         const isNearBottom = scrollHeight - (scrollTop + clientHeight) > 200;
//         setShowScrollButton(isNearBottom);
//       }
//     };

//     container.addEventListener('scroll', handleScroll);
//     return () => container.removeEventListener('scroll', handleScroll);
//   }, []);

//   const scrollToBottom = useCallback((behavior: ScrollBehavior = 'smooth') => {
//     messagesEndRef.current?.scrollIntoView({ behavior });
//   }, []);

//   useEffect(() => {
//     scrollToBottom('auto');
//   }, [messages, scrollToBottom]);

//   const handleSelectUser = (user: User) => {
//     setMessages([]);
//     setSelectedUser(user);
//     setShowEmojiPicker(false);
//     setLoadingImages({});
//   };

//   const fetchAllUsersData = async () => {
//     try {
//       if (!token) {
//         toast.error("Token not found");
//         return;
//       }
//       const res = await userService.getUsersData(token);
//       if (res.success) {
//         setUsers(res.data);
//       }
//     } catch (error) {
//       toast.error("Could not fetch user data");
//     }
//   };

//   useEffect(() => {
//     fetchAllUsersData();
//   }, [token]);

//   useEffect(() => {
//     if (!userData?.id) return;

//     const socket = new SockJS(import.meta.env.VITE_BACKEND_URL_WEBSOCKET_WITH_HTTPS);
//     const client = Stomp.over(socket);

//     client.connect({}, () => {
//       // Public messages subscription
//       client.subscribe("/public/messages", (message) => {
//         const messageData = JSON.parse(message.body);
//         setMessages((prevMessages) => [...prevMessages, messageData]);
//       });

//       // Private messages subscription
//       client.subscribe(`/user/queue/${userData.id}`, (message) => {
//         const messageData = JSON.parse(message.body);
//         setMessages((prevMessages) => [...prevMessages, messageData]);
//       });

//       // Typing indicator subscription
//       client.subscribe(`/user/queue/typing`, (message) => {
//         const typingData = JSON.parse(message.body);
//         if (typingData.senderId === selectedUser?.id) {
//           setTyping(typingData.typing);
//         }
//       });
//     });

//     setStompClient(client);

//     return () => {
//       if (client.connected) {
//         client.disconnect();
//       }
//     };
//   }, [selectedUser, userData]);

//   const sendTypingIndicator = (isTyping: boolean) => {
//     if (stompClient && selectedUser) {
//       stompClient.send(
//         "/app/typing",
//         {},
//         JSON.stringify({
//           senderId: userData.id,
//           receiverId: selectedUser.id,
//           typing: isTyping
//         })
//       );
//     }
//   };

//   const handleMessageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setMessage(e.target.value);
    
//     if (e.target.value.length > 0) {
//       sendTypingIndicator(true);
//       if (typingTimeout) {
//         clearTimeout(typingTimeout);
//       }
//       setTypingTimeout(setTimeout(() => {
//         sendTypingIndicator(false);
//       }, 2000));
//     } else {
//       sendTypingIndicator(false);
//     }
//   };

//   const sendMessage = () => {
//     if (stompClient && (message.trim() || selectedFile) && selectedUser) {
//       const messageData = {
//         senderId: userData.id,
//         receiverId: selectedUser.id,
//         messageContent: message,
//       };
//       stompClient.send(
//         "/app/sendMessageSenderAndReceiver",
//         {},
//         JSON.stringify(messageData)
//       );
//       setMessage("");
//       setSelectedFile(null);
//       setFilePreview(null);
//       sendTypingIndicator(false);
//     }
//   };

//   const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
//     if (e.key === "Enter" && !e.shiftKey) {
//       e.preventDefault();
//       sendMessage();
//     }
//   };

//   const getMessages = async () => {
//     try {
//       if (!selectedUser || !token) return;
//       const res = await userService.getUserMessages(token, selectedUser.id);
//       if (res.success) {
//         const formattedMessages = res.data.messages.map((msg: any) => ({
//           ...msg,
//           createdAt: new Date(msg.createdAt)
//         }));
//         setMessages(formattedMessages);
//       }
//     } catch (error) {
//       toast.error("Could not fetch messages");
//     }
//   };

//   useEffect(() => {
//     if (selectedUser) {
//       getMessages();
//     }
//   }, [selectedUser]);

//   const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (file && file.type.startsWith("image")) {
//       setSelectedFile(file);
//       const fileURL = URL.createObjectURL(file);
//       setFilePreview(fileURL);
//       if (e.target) e.target.value = '';
//     } else {
//       toast.error("Please select an image file");
//     }
//   };

//   const handleFileSave = async (): Promise<void> => {
//     if (!selectedFile || !selectedUser || !token) return;
    
//     try {
//       const data = new FormData();
//       data.append("file", selectedFile);
//       data.append(
//         "messageRequest",
//         JSON.stringify({ senderId: userData.id, receiverId: selectedUser.id })
//       );
      
//       const res = await userService.SendMedia(token, data);
//       if (res.success) {
//         const newMessage = {
//           id: Date.now().toString(),
//           sender: userData.id,
//           message: "",
//           createdAt: new Date(),
//           media: res.data.mediaUrl,
//           mediaType: "image"
//         };
        
//         setMessages(prev => [...prev, newMessage]);
//       }
//     } catch (error) {
//       toast.error("Failed to send image");
//     } finally {
//       setSelectedFile(null);
//       setFilePreview(null);
//     }
//   };

//   const handleEmojiClick = (emojiData: any) => {
//     setMessage(prev => prev + emojiData.emoji);
//     setShowEmojiPicker(false);
//   };

//   const openLightbox = (imageUrl: string) => {
//     setLightboxImage(imageUrl);
//     setIsLightboxOpen(true);
//   };

//   const handleImageLoad = (messageId: string) => {
//     setLoadingImages(prev => ({ ...prev, [messageId]: false }));
//   };

//   const filteredUsers = users.filter(user =>
//     user.userName.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   const formatTime = (dateString: Date | string) => {
//     const date = typeof dateString === 'string' ? new Date(dateString) : dateString;
//     return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
//   };

//   const isSameDay = (date1: Date, date2: Date) => {
//     return (
//       date1.getFullYear() === date2.getFullYear() &&
//       date1.getMonth() === date2.getMonth() &&
//       date1.getDate() === date2.getDate()
//     );
//   };

//   const formatDate = (dateString: Date | string) => {
//     const date = typeof dateString === 'string' ? new Date(dateString) : dateString;
//     const today = new Date();
//     const yesterday = new Date(today);
//     yesterday.setDate(yesterday.getDate() - 1);

//     if (isSameDay(date, today)) {
//       return "Today";
//     } else if (isSameDay(date, yesterday)) {
//       return "Yesterday";
//     } else {
//       return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
//     }
//   };

//   const groupMessagesByDate = () => {
//     const grouped: { [key: string]: Message[] } = {};
    
//     messages.forEach(message => {
//       const dateKey = formatDate(message.createdAt);
//       if (!grouped[dateKey]) {
//         grouped[dateKey] = [];
//       }
//       grouped[dateKey].push(message);
//     });
    
//     return grouped;
//   };

//   const groupedMessages = groupMessagesByDate();

//   return (
//     <>
//       <Navbar />
//       <div className="w-full min-h-screen bg-gray-100 dark:bg-gray-900 flex flex-col">
//         {/* Main Container */}
//         <div className="flex flex-1 overflow-hidden">
//           {/* Sidebar */}
//           {(!isMobileView || !selectedUser) && (
//             <div className={`w-full ${isMobileView ? 'absolute inset-0 z-10' : 'md:w-80 lg:w-96'} bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col`}>
//               {/* Sidebar Header */}
//               <div className="p-4 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
//                 <div className="flex items-center justify-between">
//                   <div className="flex items-center">
//                     {isMobileView && (
//                       <button
//                         onClick={() => navigate(-1)}
//                         className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 mr-2"
//                       >
//                         <IoChevronBackOutline className="text-gray-600 dark:text-gray-300" />
//                       </button>
//                     )}
//                     <h1 className="text-xl font-semibold text-gray-800 dark:text-white">
//                       Messages
//                     </h1>
//                   </div>
//                   <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
//                     <MdMoreVert className="text-gray-600 dark:text-gray-300" />
//                   </button>
//                 </div>
//                 {/* Search Bar */}
//                 <div className="mt-4 relative">
//                   <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                     <IoSearchOutline className="text-gray-400" />
//                   </div>
//                   <input
//                     type="text"
//                     className="w-full pl-10 pr-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-800 dark:text-white"
//                     placeholder="Search messages..."
//                     value={searchQuery}
//                     onChange={(e) => setSearchQuery(e.target.value)}
//                   />
//                 </div>
//               </div>

//               {/* User List */}
//               <div className="flex-1 overflow-y-auto">
//                 {filteredUsers.length > 0 ? (
//                   filteredUsers.map((user) => (
//                     <div
//                       key={user.id}
//                       className={`flex items-center p-4 border-b border-gray-100 dark:border-gray-700 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors ${
//                         selectedUser?.id === user.id ? "bg-purple-50 dark:bg-gray-700" : ""
//                       }`}
//                       onClick={() => handleSelectUser(user)}
//                     >
//                       <div className="relative">
//                         <img
//                           className="w-12 h-12 rounded-full object-cover"
//                           src={user.profilePic}
//                           alt={user.userName}
//                           onError={(e) => {
//                             (e.target as HTMLImageElement).src = 'https://via.placeholder.com/150';
//                           }}
//                         />
//                         <span
//                           className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white dark:border-gray-800 ${
//                             user.status === "Online" ? "bg-green-500" : "bg-gray-400"
//                           }`}
//                         ></span>
//                       </div>
//                       <div className="ml-3 flex-1">
//                         <div className="flex justify-between items-center">
//                           <h3 className="text-sm font-semibold text-gray-800 dark:text-white">
//                             {user.userName}
//                           </h3>
//                           <span className="text-xs text-gray-500 dark:text-gray-400">
//                             {user.lastSeen || "Just now"}
//                           </span>
//                         </div>
//                         <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
//                           {user.status === "Online" ? "Online" : "Offline"}
//                         </p>
//                       </div>
//                     </div>
//                   ))
//                 ) : (
//                   <div className="p-4 text-center text-gray-500 dark:text-gray-400">
//                     No users found
//                   </div>
//                 )}
//               </div>
//             </div>
//           )}

//           {/* Chat Area */}
//           {selectedUser ? (
//             <div className={`flex-1 flex flex-col bg-gray-50 dark:bg-gray-900 ${isMobileView ? 'absolute inset-0 z-20' : ''}`}>
//               {/* Chat Header */}
//               <div className="p-4 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 flex items-center justify-between">
//                 <div className="flex items-center">
//                   {isMobileView && (
//                     <button
//                       onClick={() => setSelectedUser(null)}
//                       className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 mr-2"
//                     >
//                       <IoChevronBackOutline className="text-gray-600 dark:text-gray-300" />
//                     </button>
//                   )}
//                   <div className="relative">
//                     <img
//                       className="w-10 h-10 rounded-full object-cover"
//                       src={selectedUser.profilePic}
//                       alt={selectedUser.userName}
//                       onError={(e) => {
//                         (e.target as HTMLImageElement).src = 'https://via.placeholder.com/150';
//                       }}
//                     />
//                     <span
//                       className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white dark:border-gray-800 ${
//                         selectedUser.status === "Online" ? "bg-green-500" : "bg-gray-400"
//                       }`}
//                     ></span>
//                   </div>
//                   <div className="ml-3">
//                     <h3 className="text-sm font-semibold text-gray-800 dark:text-white">
//                       {selectedUser.userName}
//                     </h3>
//                     <p className="text-xs text-gray-500 dark:text-gray-400">
//                       {typing ? "typing..." : selectedUser.status}
//                     </p>
//                   </div>
//                 </div>
//                 <div className="flex items-center space-x-2">
//                   <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
//                     <IoSearchOutline className="text-gray-600 dark:text-gray-300" />
//                   </button>
//                   <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
//                     <MdMoreVert className="text-gray-600 dark:text-gray-300" />
//                   </button>
//                 </div>
//               </div>

//               {/* Messages */}
//               <div className="flex-1 p-4 overflow-y-auto" ref={messagesContainerRef}>
//                 {Object.entries(groupedMessages).map(([date, dateMessages]) => (
//                   <div key={date} className="mb-6">
//                     <div className="flex justify-center mb-4">
//                       <span className="px-3 py-1 bg-gray-200 dark:bg-gray-700 text-xs text-gray-600 dark:text-gray-300 rounded-full">
//                         {date}
//                       </span>
//                     </div>
//                     {dateMessages.map((msg, index) => (
//                       <div
//                         key={msg.id || index}
//                         className={`flex mb-4 ${
//                           msg.sender === userData.id ? "justify-end" : "justify-start"
//                         }`}
//                       >
//                         <div
//                           className={`max-w-xs md:max-w-md lg:max-w-lg rounded-lg p-3 ${
//                             msg.sender === userData.id
//                               ? "bg-purple-500 text-white rounded-br-none"
//                               : "bg-white dark:bg-gray-700 text-gray-800 dark:text-white rounded-bl-none"
//                           } shadow`}
//                         >
//                           {msg.media && (
//                             <div className="mb-2 overflow-hidden rounded-lg relative">
//                               {loadingImages[msg.id] !== false && (
//                                 <div className="absolute inset-0 flex items-center justify-center bg-gray-200 dark:bg-gray-800">
//                                   <div className="animate-pulse rounded-lg w-full h-full"></div>
//                                 </div>
//                               )}
//                               <img
//                                 src={msg.media}
//                                 alt="Media"
//                                 className={`max-h-60 w-full object-cover cursor-pointer hover:opacity-90 transition-opacity ${
//                                   loadingImages[msg.id] !== false ? 'opacity-0' : 'opacity-100'
//                                 }`}
//                                 onClick={() => openLightbox(msg.media!)}
//                                 onLoad={() => handleImageLoad(msg.id)}
                            
//                               />
//                             </div>
//                           )}
//                           {msg.message && <p className="text-sm whitespace-pre-wrap break-words">{msg.message}</p>}
//                           <div
//                             className={`text-xs mt-1 flex justify-end items-center ${
//                               msg.sender === userData.id
//                                 ? "text-purple-100"
//                                 : "text-gray-500 dark:text-gray-400"
//                             }`}
//                           >
//                             {formatTime(msg.createdAt)}
//                           </div>
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 ))}
//                 <div ref={messagesEndRef} />
                
//                 {/* Scroll to bottom button */}
//                 {showScrollButton && (
//                   <button
//                     onClick={() => scrollToBottom()}
//                     className="fixed bottom-24 right-4 md:right-8 p-3 bg-purple-500 text-white rounded-full shadow-lg hover:bg-purple-600 transition-colors z-30"
//                   >
//                     <IoArrowDown size={20} />
//                   </button>
//                 )}
//               </div>

//               {/* Message Input */}
//               <div className="p-4 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
//                 {filePreview && selectedFile && (
//                   <div className="relative mb-4 p-3 bg-gray-100 dark:bg-gray-700 rounded-lg">
//                     <button
//                       onClick={() => {
//                         setSelectedFile(null);
//                         setFilePreview(null);
//                       }}
//                       className="absolute -top-2 -right-2 p-1 bg-red-500 rounded-full text-white hover:bg-red-600 transition-colors"
//                     >
//                       <MdClose size={16} />
//                     </button>
//                     <div className="flex items-center">
//                       <BiImageAlt className="text-gray-500 mr-2" size={20} />
//                       <img
//                         src={filePreview}
//                         alt="Preview"
//                         className="h-16 rounded-md object-cover"
//                       />
//                     </div>
//                   </div>
//                 )}
//                 <div className="flex items-center">
//                   <button
//                     onClick={() => fileInputRef.current?.click()}
//                     className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300 transition-colors"
//                   >
//                     <MdAttachFile size={24} />
//                   </button>
//                   <input
//                     type="file"
//                     ref={fileInputRef}
//                     accept="image/*"
//                     className="hidden"
//                     onChange={handleFileSelect}
//                   />
//                   <button
//                     onClick={() => setShowEmojiPicker(!showEmojiPicker)}
//                     className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300 transition-colors"
//                   >
//                     <MdEmojiEmotions size={24} />
//                   </button>
//                   <div className="relative flex-1 mx-2">
//                     <input
//                       type="text"
//                       ref={messageInputRef}
//                       className="w-full p-3 bg-gray-100 dark:bg-gray-700 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-800 dark:text-white"
//                       placeholder="Type a message..."
//                       value={message}
//                       onChange={handleMessageChange}
//                       onKeyDown={handleKeyDown}
//                     />
//                     {showEmojiPicker && (
//                       <div ref={emojiPickerRef} className="absolute bottom-14 left-0 z-10">
//                         <EmojiPicker 
//                           onEmojiClick={handleEmojiClick} 
//                           width={300} 
//                           height={350}
//                           searchDisabled
//                           skinTonesDisabled
//                           previewConfig={{ showPreview: false }}
//                         />
//                       </div>
//                     )}
//                   </div>
//                   <button
//                     onClick={() => {
//                       if (selectedFile) {
//                         handleFileSave();
//                       } else if (message.trim()) {
//                         sendMessage();
//                       }
//                     }}
//                     className={`p-3 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-colors ${
//                       message.trim() || selectedFile
//                         ? "bg-purple-500 text-white hover:bg-purple-600"
//                         : "bg-gray-200 dark:bg-gray-700 text-gray-400 cursor-not-allowed"
//                     }`}
//                     disabled={!message.trim() && !selectedFile}
//                   >
//                     <MdSend size={24} />
//                   </button>
//                 </div>
//               </div>
//             </div>
//           ) : (
//             <div className="hidden md:flex flex-1 items-center justify-center bg-gray-50 dark:bg-gray-900">
//               <div className="text-center p-6 max-w-md">
//                 <div className="mx-auto w-24 h-24 bg-purple-100 dark:bg-gray-700 rounded-full flex items-center justify-center mb-4">
//                   <MdSend className="text-purple-500 dark:text-purple-400" size={40} />
//                 </div>
//                 <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
//                   Select a conversation
//                 </h2>
//                 <p className="text-gray-500 dark:text-gray-400 mb-6">
//                   Choose from your existing conversations or start a new one
//                 </p>
               
//               </div>
//             </div>
//           )}
//         </div>

//         {/* Lightbox for image viewing */}
//         {isLightboxOpen && (
//           <Lightbox
//             mainSrc={lightboxImage}
//             onCloseRequest={() => setIsLightboxOpen(false)}
//             enableZoom={true}
//           />
//         )}
//       </div>
//     </>
//   );
// };

// export default AdvanceMessageUI;









import React, { useEffect, useRef, useState } from "react";
import { IoChevronBackOutline, IoSearchOutline, IoArrowDown } from "react-icons/io5";
import { MdClose, MdSend, MdAttachFile, MdEmojiEmotions, MdMoreVert } from "react-icons/md";
import { BiImageAlt } from "react-icons/bi";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import { Stomp } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import { userService } from "../Service/userService";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";
import EmojiPicker from "emoji-picker-react";
import Lightbox from "react-18-image-lightbox";
import "react-18-image-lightbox/style.css";
import { IoArrowUp } from "react-icons/io5";

interface User {
  id: string;
  userName: string;
  profilePic: string;
  status: "Online" | "Offline";
  lastSeen?: string;
}

interface Message {
  id: string;
  sender: string;
  message: string;
  createdAt: string | Date;
  media?: string;
  mediaType?: "image";
}

interface UserState {
  token: string;
  userdata: {
    id: string;
    userName: string;
    profilePic: string;
  };
}

const AdvanceMessageUI: React.FC = () => {
  const token = useSelector((state: { User: UserState }) => state.User.token);
  const userData = useSelector((state: { User: UserState }) => state.User.userdata);
  const navigate = useNavigate();

  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [message, setMessage] = useState<string>("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [stompClient, setStompClient] = useState<any>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [filePreview, setFilePreview] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [showEmojiPicker, setShowEmojiPicker] = useState<boolean>(false);
  const [isLightboxOpen, setIsLightboxOpen] = useState<boolean>(false);
  const [lightboxImage, setLightboxImage] = useState<string>("");
  const [typing, setTyping] = useState<boolean>(false);
  const [typingTimeout, setTypingTimeout] = useState<NodeJS.Timeout | null>(null);
  const [isMobileView, setIsMobileView] = useState<boolean>(window.innerWidth < 768);
  const [showScrollButton, setShowScrollButton] = useState<boolean>(false);

  const [loadingImages, setLoadingImages] = useState<{ [key: string]: boolean }>({});
  // Add this state to track scroll direction
const [showUpButton, setShowUpButton] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const emojiPickerRef = useRef<HTMLDivElement>(null);
  const messageInputRef = useRef<HTMLInputElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth < 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Close emoji picker when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (emojiPickerRef.current && !emojiPickerRef.current.contains(event.target as Node)) {
        setShowEmojiPicker(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);


useEffect(() => {
  const container = messagesContainerRef.current;
  if (!container) return;

  const handleScroll = () => {
    if (container) {
      const { scrollTop, scrollHeight, clientHeight } = container;
      const isNearBottom = scrollHeight - (scrollTop + clientHeight) > 200;
      setShowScrollButton(isNearBottom);
      setShowUpButton(scrollTop > 200);
    }
  };

  container.addEventListener('scroll', handleScroll);
  return () => container.removeEventListener('scroll', handleScroll);
}, []);

const scrollToTop = () => {
  if (messagesContainerRef.current) {
    messagesContainerRef.current.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }
};

const scrollToBottom = () => {
  if (messagesContainerRef.current) {
    messagesContainerRef.current.scrollTo({
      top: messagesContainerRef.current.scrollHeight,
      behavior: 'smooth'
    });
  }
};

 
 

  const handleSelectUser = (user: User) => {
    setMessages([]);
    setSelectedUser(user);
    setShowEmojiPicker(false);
    setLoadingImages({});
  };

  const fetchAllUsersData = async () => {
    try {
      if (!token) {
        toast.error("Token not found");
        return;
      }
      const res = await userService.getUsersData(token);
      if (res.success) {
        setUsers(res.data);
      }
    } catch (error) {
      toast.error("Could not fetch user data");
    }
  };

  useEffect(() => {
    fetchAllUsersData();
  }, [token]);

  useEffect(() => {
    if (!userData?.id) return;

    const socket = new SockJS(import.meta.env.VITE_BACKEND_URL_WEBSOCKET_WITH_HTTPS);
    const client = Stomp.over(socket);

    client.connect({}, () => {
      // Public messages subscription
      client.subscribe("/public/messages", (message) => {
        const messageData = JSON.parse(message.body);
        setMessages((prevMessages) => {
          const newMessages = [...prevMessages, messageData];
          // Set loading state for any new messages with media
          if (messageData.media) {
            setLoadingImages(prev => ({ ...prev, [messageData.id]: true }));
          }
          return newMessages;
        });
      });

      // Private messages subscription
      client.subscribe(`/user/queue/${userData.id}`, (message) => {
        const messageData = JSON.parse(message.body);
        setMessages((prevMessages) => {
          const newMessages = [...prevMessages, messageData];
          // Set loading state for any new messages with media
          if (messageData.media) {
            setLoadingImages(prev => ({ ...prev, [messageData.id]: true }));
          }
          return newMessages;
        });
      });

      // Typing indicator subscription
      client.subscribe(`/user/queue/typing`, (message) => {
        const typingData = JSON.parse(message.body);
        if (typingData.senderId === selectedUser?.id) {
          setTyping(typingData.typing);
        }
      });
    });

    setStompClient(client);

    return () => {
      if (client.connected) {
        client.disconnect();
      }
    };
  }, [selectedUser, userData]);

  const sendTypingIndicator = (isTyping: boolean) => {
    if (stompClient && selectedUser) {
      stompClient.send(
        "/app/typing",
        {},
        JSON.stringify({
          senderId: userData.id,
          receiverId: selectedUser.id,
          typing: isTyping
        })
      );
    }
  };

  const handleMessageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
    
    if (e.target.value.length > 0) {
      sendTypingIndicator(true);
      if (typingTimeout) {
        clearTimeout(typingTimeout);
      }
      setTypingTimeout(setTimeout(() => {
        sendTypingIndicator(false);
      }, 2000));
    } else {
      sendTypingIndicator(false);
    }
  };

  const sendMessage = () => {
    if (stompClient && (message.trim() || selectedFile) && selectedUser) {
      const messageData = {
        senderId: userData.id,
        receiverId: selectedUser.id,
        messageContent: message,
      };
      stompClient.send(
        "/app/sendMessageSenderAndReceiver",
        {},
        JSON.stringify(messageData)
      );
      setMessage("");
      setSelectedFile(null);
      setFilePreview(null);
      sendTypingIndicator(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const getMessages = async () => {
    try {
      if (!selectedUser || !token) return;
      const res = await userService.getUserMessages(token, selectedUser.id);
      if (res.success) {
        const formattedMessages = res.data.messages.map((msg: any) => ({
          ...msg,
          createdAt: new Date(msg.createdAt)
        }));
        setMessages(formattedMessages);
        
        // Initialize loading states for all messages with media
        const initialLoadingStates = res.data.messages.reduce((acc: {[key: string]: boolean}, msg: any) => {
          if (msg.media) {
            acc[msg.id] = true;
          }
          return acc;
        }, {});
        setLoadingImages(initialLoadingStates);
      }
    } catch (error) {
      toast.error("Could not fetch messages");
    }
  };

  useEffect(() => {
    if (selectedUser) {
      getMessages();
    }
  }, [selectedUser]);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith("image")) {
      setSelectedFile(file);
      const fileURL = URL.createObjectURL(file);
      setFilePreview(fileURL);
      if (e.target) e.target.value = '';
    } else {
      toast.error("Please select an image file");
    }
  };

  const handleFileSave = async (): Promise<void> => {
    if (!selectedFile || !selectedUser || !token) return;
    
    try {
      const data = new FormData();
      data.append("file", selectedFile);
      data.append(
        "messageRequest",
        JSON.stringify({ senderId: userData.id, receiverId: selectedUser.id })
      );
      
      const res = await userService.SendMedia(token, data);
      if (res.success) {
        const newMessage = {
          id: Date.now().toString(),
          sender: userData.id,
          message: "",
          createdAt: new Date(),
          media: res.data.mediaUrl,
          mediaType: "image"
        };
        
        setMessages(prev => [...prev, newMessage]);
        setLoadingImages(prev => ({ ...prev, [newMessage.id]: true }));
      }
    } catch (error) {
      toast.error("Failed to send image");
    } finally {
      setSelectedFile(null);
      setFilePreview(null);
    }
  };

  const handleEmojiClick = (emojiData: any) => {
    setMessage(prev => prev + emojiData.emoji);
    setShowEmojiPicker(false);
  };

  const openLightbox = (imageUrl: string) => {
    setLightboxImage(imageUrl);
    setIsLightboxOpen(true);
  };

  const handleImageLoad = (messageId: string) => {
    setLoadingImages(prev => ({ ...prev, [messageId]: false }));
  };

  const filteredUsers = users.filter(user =>
    user.userName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const formatTime = (dateString: Date | string) => {
    const date = typeof dateString === 'string' ? new Date(dateString) : dateString;
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const isSameDay = (date1: Date, date2: Date) => {
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    );
  };

  const formatDate = (dateString: Date | string) => {
    const date = typeof dateString === 'string' ? new Date(dateString) : dateString;
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (isSameDay(date, today)) {
      return "Today";
    } else if (isSameDay(date, yesterday)) {
      return "Yesterday";
    } else {
      return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
    }
  };

  const groupMessagesByDate = () => {
    const grouped: { [key: string]: Message[] } = {};
    
    messages.forEach(message => {
      const dateKey = formatDate(message.createdAt);
      if (!grouped[dateKey]) {
        grouped[dateKey] = [];
      }
      grouped[dateKey].push(message);
    });
    
    return grouped;
  };

  const groupedMessages = groupMessagesByDate();

  return (
    <>
      <Navbar />
      <div className="w-full min-h-screen bg-gray-100 dark:bg-gray-900 flex flex-col">
        {/* Main Container */}
        <div className="flex flex-1 overflow-hidden">
          {/* Sidebar */}
          {(!isMobileView || !selectedUser) && (
            <div className={`w-full ${isMobileView ? 'absolute inset-0 z-10' : 'md:w-80 lg:w-96'} bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col`}>
              {/* Sidebar Header */}
              <div className="p-4 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    {isMobileView && (
                      <button
                        onClick={() => navigate(-1)}
                        className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 mr-2"
                      >
                        <IoChevronBackOutline className="text-gray-600 dark:text-gray-300" />
                      </button>
                    )}
                    <h1 className="text-xl font-semibold text-gray-800 dark:text-white">
                      Messages
                    </h1>
                  </div>
                  <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
                    <MdMoreVert className="text-gray-600 dark:text-gray-300" />
                  </button>
                </div>
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
                {filteredUsers.length > 0 ? (
                  filteredUsers.map((user) => (
                    <div
                      key={user.id}
                      className={`flex items-center p-4 border-b border-gray-100 dark:border-gray-700 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors ${
                        selectedUser?.id === user.id ? "bg-purple-50 dark:bg-gray-700" : ""
                      }`}
                      onClick={() => handleSelectUser(user)}
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
                    No users found
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Chat Area */}
          {selectedUser ? (
            <div className={`flex-1 flex flex-col bg-gray-50 dark:bg-gray-900 ${isMobileView ? 'absolute inset-0 z-20' : ''}`}>
              {/* Chat Header */}
              <div className="p-4 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 flex items-center justify-between">
                <div className="flex items-center">
                  {isMobileView && (
                    <button
                      onClick={() => setSelectedUser(null)}
                      className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 mr-2"
                    >
                      <IoChevronBackOutline className="text-gray-600 dark:text-gray-300" />
                    </button>
                  )}
                  <div className="relative">
                    <img
                      className="w-10 h-10 rounded-full object-cover"
                      src={selectedUser.profilePic}
                      alt={selectedUser.userName}
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'https://via.placeholder.com/150';
                      }}
                    />
                    <span
                      className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white dark:border-gray-800 ${
                        selectedUser.status === "Online" ? "bg-green-500" : "bg-gray-400"
                      }`}
                    ></span>
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-semibold text-gray-800 dark:text-white">
                      {selectedUser.userName}
                    </h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {typing ? "typing..." : selectedUser.status}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
                    <IoSearchOutline className="text-gray-600 dark:text-gray-300" />
                  </button>
                  <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
                    <MdMoreVert className="text-gray-600 dark:text-gray-300" />
                  </button>
                </div>

                
              </div>

              {/* Messages */}
              <div className="flex-1 p-4 overflow-y-auto" ref={messagesContainerRef}>
                {Object.entries(groupedMessages).map(([date, dateMessages]) => (
                  <div key={date} className="mb-6">
                    <div className="flex justify-center mb-4">
                      <span className="px-3 py-1 bg-gray-200 dark:bg-gray-700 text-xs text-gray-600 dark:text-gray-300 rounded-full">
                        {date}
                      </span>
                    </div>
                    {dateMessages.map((msg, index) => (
                      <div
                        key={msg.id || index}
                        className={`flex mb-4 ${
                          msg.sender === userData.id ? "justify-end" : "justify-start"
                        }`}
                      >
                        <div
                          className={`max-w-xs md:max-w-md lg:max-w-lg rounded-lg p-3 ${
                            msg.sender === userData.id
                              ? "bg-purple-500 text-white rounded-br-none"
                              : "bg-white dark:bg-gray-700 text-gray-800 dark:text-white rounded-bl-none"
                          } shadow`}
                        >
                          {msg.media && (
                            <div className="mb-2 overflow-hidden rounded-lg relative">
                              {loadingImages[msg.id] && (
                                <div className="absolute inset-0 flex items-center justify-center bg-gray-200 dark:bg-gray-800">
                                  <div className="animate-pulse rounded-lg w-full h-full"></div>
                                </div>
                              )}
                              <img
                                src={msg.media}
                                alt="Media"
                                className={`max-h-60 w-full object-cover cursor-pointer hover:opacity-90 transition-opacity ${
                                  loadingImages[msg.id] ? 'opacity-0' : 'opacity-100'
                                }`}
                                onClick={() => openLightbox(msg.media!)}
                                onLoad={() => handleImageLoad(msg.id)}
                              
                              />
                            </div>
                          )}
                          {msg.message && <p className="text-sm whitespace-pre-wrap break-words">{msg.message}</p>}
                          <div
                            className={`text-xs mt-1 flex justify-end items-center ${
                              msg.sender === userData.id
                                ? "text-purple-100"
                                : "text-gray-500 dark:text-gray-400"
                            }`}
                          >
                            {formatTime(msg.createdAt)}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ))}

                
                <div ref={messagesEndRef} />
                

                
              
              </div>
{/* Scroll buttons container */}
<div className="fixed bottom-24 left-1/2 transform -translate-x-1/2 flex space-x-2 z-30">
  {showUpButton && (
    <button
      onClick={scrollToTop}
      className="p-2 bg-purple-500 text-white rounded-full shadow-lg hover:bg-purple-600 transition-colors"
    >
      <IoArrowUp size={20} />
    </button>
  )}
  {showScrollButton && (
    <button
      onClick={scrollToBottom}
      className="p-2 bg-purple-500 text-white rounded-full shadow-lg hover:bg-purple-600 transition-colors"
    >
      <IoArrowDown size={20} />
    </button>
  )}
</div>

              {/* Message Input */}
              <div className="p-4 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800  ">
                {filePreview && selectedFile && (
                  <div className="relative mb-4 p-3 bg-gray-100 dark:bg-gray-700 rounded-lg">
                    <button
                      onClick={() => {
                        setSelectedFile(null);
                        setFilePreview(null);
                      }}
                      className="absolute -top-2 -right-2 p-1 bg-red-500 rounded-full text-white hover:bg-red-600 transition-colors"
                    >
                      <MdClose size={16} />
                    </button>
                    <div className="flex items-center">
                      <BiImageAlt className="text-gray-500 mr-2" size={20} />
                      <img
                        src={filePreview}
                        alt="Preview"
                        className="h-16 rounded-md object-cover"
                      />
                    </div>
                  </div>
                )}
                <div className="flex items-center">
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300 transition-colors"
                  >
                    <MdAttachFile size={24} />
                  </button>
                  <input
                    type="file"
                    ref={fileInputRef}
                    accept="image/*"
                    className="hidden"
                    onChange={handleFileSelect}
                  />
                  <button
                    onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                    className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300 transition-colors"
                  >
                    <MdEmojiEmotions size={24} />
                  </button>
                  <div className="relative flex-1 mx-2">
                    <input
                      type="text"
                      ref={messageInputRef}
                      className="w-full p-3 bg-gray-100 dark:bg-gray-700 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-800 dark:text-white"
                      placeholder="Type a message..."
                      value={message}
                      onChange={handleMessageChange}
                      onKeyDown={handleKeyDown}
                    />
                    {showEmojiPicker && (
                      <div ref={emojiPickerRef} className="absolute bottom-14 left-0 z-10">
                        <EmojiPicker 
                          onEmojiClick={handleEmojiClick} 
                          width={300} 
                          height={350}
                          searchDisabled
                          skinTonesDisabled
                          previewConfig={{ showPreview: false }}
                        />
                      </div>
                    )}
                  </div>
                  <button
                    onClick={() => {
                      if (selectedFile) {
                        handleFileSave();
                      } else if (message.trim()) {
                        sendMessage();
                      }
                    }}
                    className={`p-3 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-colors ${
                      message.trim() || selectedFile
                        ? "bg-purple-500 text-white hover:bg-purple-600"
                        : "bg-gray-200 dark:bg-gray-700 text-gray-400 cursor-not-allowed"
                    }`}
                    disabled={!message.trim() && !selectedFile}
                  >
                    <MdSend size={24} />
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="hidden md:flex flex-1 items-center justify-center bg-gray-50 dark:bg-gray-900">
              <div className="text-center p-6 max-w-md">
                <div className="mx-auto w-24 h-24 bg-purple-100 dark:bg-gray-700 rounded-full flex items-center justify-center mb-4">
                  <MdSend className="text-purple-500 dark:text-purple-400" size={40} />
                </div>
                <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
                  Select a conversation
                </h2>
                <p className="text-gray-500 dark:text-gray-400 mb-6">
                  Choose from your existing conversations or start a new one
                </p>
                <button
                  onClick={() => navigate("/contacts")}
                  className="px-6 py-2 bg-purple-500 text-white rounded-full hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-colors"
                >
                  New Message
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Lightbox for image viewing */}
        {isLightboxOpen && (
          <Lightbox
            mainSrc={lightboxImage}
            onCloseRequest={() => setIsLightboxOpen(false)}
            enableZoom={true}
          />
        )}
      </div>
    </>
  );
};

export default AdvanceMessageUI;