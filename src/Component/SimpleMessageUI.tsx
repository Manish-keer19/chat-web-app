import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import { Stomp } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import { userService } from "../Service/userService";
import { motion } from "framer-motion";
import Navbar from "./Navbar";

interface User {
  id: string;
  userName: string;
  profilePic: string;
  status: "Online" | "Offline";
}

interface Message {
  sender: string;
  message: string;
  createdAt: Date;
}

interface UserState {
  token: string;
  userdata: {
    id: string;
    userName: string;
    profilePic: string;
  };
}

const SimpleMessageUI: React.FC = () => {
  const token = useSelector((state: { User: UserState }) => state.User.token);
  const userData = useSelector(
    (state: { User: UserState }) => state.User.userdata
  );

  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [message, setMessage] = useState<string>("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [stompClient, setStompClient] = useState<any>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSelectUser = (user: User) => {
    setMessages([]);
    setSelectedUser(user);
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
      console.error("Could not fetch user data", error);
    }
  };

  useEffect(() => {
    fetchAllUsersData();
  }, [token]);

  useEffect(() => {
    // const socket = new SockJS(import.meta.env.VITE_BACKEND_URL_WEBSOCKET);
        const socket = new SockJS(import.meta.env.VITE_BACKEND_URL_WEBSOCKET_WITH_HTTPS);
    // const socket = new SockJS(import.meta.env.VITE_BACKEND_LOCAL_WEBSOCKET);
    const client = Stomp.over(socket);

    client.connect({}, () => {
      console.log("WebSocket connected");
      client.subscribe("/public/messages", (message) => {
        const messageData = JSON.parse(message.body);
        console.log("Message received:", messageData);
        setMessages((prev: any) => [...prev, messageData]);
        setMessage("");
      });
    });

    setStompClient(client);

    return () => {
      client.disconnect(() => console.log("WebSocket disconnected"));
    };
  }, []);

  const sendMessage = () => {
    if (stompClient && message.trim() && selectedUser) {
      const messageData = {
        senderId: userData.id,
        receiverId: selectedUser.id,
        messageContent: message,
      };
      stompClient.send("/app/sendMessage", {}, JSON.stringify(messageData));
      console.log("Message sent:", messageData);
      setMessage("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  // const sendMessageUserTyping = () => {
  //   if (stompClient && message.trim()) {
  //     stompClient.send(
  //       "/app/sendTypingMessage",
  //       {},
  //       JSON.stringify(`${userData.userName} is typing...`)
  //     );
  //   }
  // };

  const getMessages = async () => {
    try {
      if (!selectedUser) return;
      const res = await userService.getUserMessages(token, selectedUser.id);
      if (res.success) {
        setMessages(res.data.messages);
      }
    } catch (error) {
      console.error("Could not fetch messages", error);
    }
  };

  useEffect(() => {
    if (selectedUser) {
      getMessages();
    }
  }, [selectedUser]);

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-gray-900 to-black p-4 sm:p-6">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
            {/* Users List */}
            <div className="lg:col-span-1">
              <div className="bg-opacity-20 backdrop-blur-xl bg-gray-900 rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-lg border border-opacity-30 border-purple-500">
                <h2 className="text-xl sm:text-2xl font-bold text-white mb-4 sm:mb-6">
                  Users
                </h2>
                <div className="space-y-3">
                  {users.map((user) => (
                    <motion.div
                      key={user.id}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleSelectUser(user)}
                      className={`flex items-center gap-3 p-3 sm:p-4 rounded-lg cursor-pointer ${
                        selectedUser?.id === user.id
                          ? "bg-purple-600/30"
                          : "bg-gray-800/30 hover:bg-gray-700/30"
                      }`}
                    >
                      <img
                        src={user.profilePic}
                        alt={user.userName}
                        className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover"
                      />
                      <div>
                        <h3 className="text-white font-medium text-sm sm:text-base">
                          {user.userName}
                        </h3>
                        <p className="text-gray-400 text-xs sm:text-sm">
                          {user.status}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            {/* Chat Section */}
            <div className="lg:col-span-2">
              {selectedUser ? (
                <div className="bg-opacity-20 backdrop-blur-xl bg-gray-900 rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-lg border border-opacity-30 border-purple-500 h-[calc(100vh-2rem)] sm:h-[calc(100vh-3rem)] flex flex-col">
                  {/* Chat Header */}
                  <div className="flex items-center gap-3 sm:gap-4 pb-4 border-b border-gray-700">
                    <img
                      src={selectedUser.profilePic}
                      alt={selectedUser.userName}
                      className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover"
                    />
                    <div>
                      <h2 className="text-white font-semibold text-lg sm:text-xl">
                        {selectedUser.userName}
                      </h2>
                      <p className="text-gray-400 text-xs sm:text-sm">
                        {selectedUser.status}
                      </p>
                    </div>
                  </div>

                  {/* Messages */}
                  <div className="flex-1 overflow-y-auto py-4 space-y-4 border">
                    {messages.map((msg, index) => (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        key={index}
                        className={`flex ${
                          msg.sender === userData.id
                            ? "justify-end"
                            : "justify-start"
                        }`}
                      >
                        <div
                          className={`max-w-[80%] sm:max-w-[70%] p-3 sm:p-4 rounded-lg ${
                            msg.sender === userData.id
                              ? "bg-purple-600/30 ml-4"
                              : "bg-gray-800/30 mr-4"
                          }`}
                        >
                          <p className="text-white text-sm sm:text-base">
                            {msg.message}
                          </p>
                        </div>
                      </motion.div>
                    ))}
                    <div ref={messagesEndRef} />
                  </div>
                  {/* Message Input */}
                  <div className="pt-4 border-t border-gray-700">
                    <div className="flex gap-2 sm:gap-3">
                      <input
                        type="text"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="Type a message..."
                        className="flex-1 bg-gray-800/50 text-white rounded-lg px-4 py-2 sm:py-3 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-purple-500"
                      />
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={sendMessage}
                        className="bg-purple-600 text-white p-2 sm:p-3 rounded-lg hover:bg-purple-500 transition-colors"
                      >
                        <svg
                          className="w-5 h-5 sm:w-6 sm:h-6"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                          />
                        </svg>
                      </motion.button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-opacity-20 backdrop-blur-xl bg-gray-900 rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-lg border border-opacity-30 border-purple-500 h-[calc(100vh-2rem)] sm:h-[calc(100vh-3rem)] flex items-center justify-center">
                  <p className="text-gray-400 text-lg sm:text-xl">
                    Select a user to start chatting
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SimpleMessageUI;
