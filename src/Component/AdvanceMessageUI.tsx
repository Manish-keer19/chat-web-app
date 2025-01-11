import React, { useEffect, useRef, useState } from "react";
import { IoChevronBackOutline } from "react-icons/io5";
import { MdClose, MdSend } from "react-icons/md";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import { Stomp } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import { userService } from "../Service/userService";

import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";

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
  media?: any; // Optional for media messages
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
  const userData = useSelector(
    (state: { User: UserState }) => state.User.userdata
  );
  const navigate = useNavigate();

  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [message, setMessage] = useState<string>("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [stompClient, setStompClient] = useState<any>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null); // State for image/video file
  const [filePreview, setFilePreview] = useState<string | null>(null); // Preview for image/video file
  // const [sumOfSenderIdAndReceiverId, setSumOfSenderIdAndReceiverId] = useState<number>(0);

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
    const socket = new SockJS(import.meta.env.VITE_BACKEND_URL_WEBSOCKET);
    // const socket = new SockJS(import.meta.env.VITE_BACKEND_URL_WEBSOCKET_WITH_HTTPS);
    // const socket = new SockJS(import.meta.env.VITE_BACKEND_LOCAL_WEBSOCKET);
    const client = Stomp.over(socket);

    client.connect({}, () => {
      console.log("WebSocket connected");
      client.subscribe("/public/messages", (message) => {
        const messageData = JSON.parse(message.body);
        console.log("Message received:", messageData);
        setMessages((prevMessages) => [...prevMessages, messageData]);
        setMessage("");
      });

      client.subscribe(`/user/queue/${userData.id}`, (message) => {
        const messageData = JSON.parse(message.body);
        console.log("Message received:", messageData);
        setMessages((prevMessages) => [...prevMessages, messageData]);
        setMessage("");
      });

      // Error event
      stompClient.onStompError = (frame:any) => {
        console.error("Broker reported error: ", frame.headers["message"]);
        console.error("Additional details: ", frame.body);
      };
    });

    setStompClient(client);

    return () => {
      client.disconnect(() => console.log("WebSocket disconnected"));
    };
  }, []);

  // const sendMessage = () => {
  //   if (stompClient && (message.trim() || selectedFile) && selectedUser) {
  //     const messageData = {
  //       senderId: userData.id,
  //       receiverId: selectedUser.id,
  //       messageContent: message,
  //     };
  //     stompClient.send("/app/sendMessage", {}, JSON.stringify(messageData));
  //     console.log("Message sent:", messageData);
  //     setMessage("");
  //     setSelectedFile(null); // Clear the selected file after sending
  //     setFilePreview(null); // Clear preview after sending
  //   }
  // };

  const sendMessageSenderAndReceiver = () => {
    if (stompClient && (message.trim() || selectedFile) && selectedUser) {
      const messageData = {
        senderId: userData.id,
        receiverId: selectedUser.id,
        messageContent: message,
      };
      stompClient.send(
        "/app/sendMessageSederAndReceiver",
        {},
        JSON.stringify(messageData)
      );
      console.log("Message sent:", messageData);
      setMessage("");
      setSelectedFile(null); // Clear the selected file after sending
      setFilePreview(null); // Clear preview after sending
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      // sendMessage();
      sendMessageSenderAndReceiver();
    }
  };

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

  // Handle file selection and set preview
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      console.log("Selected file:", file);
      const fileURL = URL.createObjectURL(file);
      console.log("File URL:", fileURL);
      setFilePreview(fileURL); // Set the file preview for image/video
    }
  };

  const handleFileSave = async (): Promise<void> => {
    setSelectedFile(null);
    if (!selectedFile) return; // Ensure `selectedFile` is not null
    setMessages((prev: any) => [
      ...prev,
      {
        sender: userData.id,
        createdAt: new Date(),
        media: URL.createObjectURL(selectedFile), // Correctly handle file
      },
    ]);
    try {
      const data = new FormData();
      data.append("file", selectedFile);

      data.append(
        "messageRequest",
        JSON.stringify({ senderId: userData.id, receiverId: selectedUser?.id })
      );
      const res = await userService.SendMedia(token, data);
      console.log("res is ", res);
    } catch (error) {
      console.log("Error saving file:", error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="w-full min-h-screen bg-gradient-to-br from-[#1e1e2f] to-[#121212] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between bg-gradient-to-r from-purple-700 via-purple-800 to-purple-900 p-4 shadow-lg">
          <button
            onClick={() => {
              window.history.back();
            }}
          >
            <IoChevronBackOutline
              size={25}
              className="text-white cursor-pointer hover:text-purple-300 transition-all duration-300"
            />
          </button>
          <h1 className="text-2xl text-white font-semibold">
            Manish's Chat App
          </h1>
          <button
            className="flex items-center flex-col"
            onClick={() => {
              navigate("/profile");
            }}
          >
            <img
              className="w-12 h-12 rounded-full object-cover border-2 border-purple-400 shadow-md"
              src={userData?.profilePic}
              alt={userData?.userName}
            />
            <p className="text-white font-medium">{userData?.userName}</p>
          </button>
        </div>

        <div className="flex flex-col md:flex-row w-full flex-grow">
          {/* Users List */}
          <div className="w-full md:w-1/4 bg-[#161d39] p-6 text-white overflow-y-auto border-b md:border-r border-purple-700">
            <h2 className="text-xl mb-6 font-bold text-purple-400">Users</h2>
            <div className="space-y-4">
              {users.map((user) => (
                <div
                  key={user.id}
                  className="flex items-center gap-4 p-4 bg-gradient-to-r from-purple-700 to-purple-900 hover:from-purple-600 hover:to-purple-800 rounded-lg cursor-pointer transition-transform transform hover:scale-105"
                  onClick={() => handleSelectUser(user)}
                >
                  <img
                    className="w-12 h-12 rounded-full border-2 border-purple-400"
                    src={user.profilePic}
                    alt={user.userName}
                  />
                  <div className="flex flex-col">
                    <span className="text-lg font-semibold">
                      {user.userName}
                    </span>
                    <span
                      className={`text-sm font-medium ${
                        user.status === "Online"
                          ? "text-green-400"
                          : "text-gray-500"
                      }`}
                    >
                      {user.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Chat Section */}
          {selectedUser ? (
            <div className="flex-1 bg-[#121212] p-6 flex flex-col">
              <div className="bg-gradient-to-r from-purple-600 via-purple-700 to-purple-900 rounded-lg mb-4 shadow-md p-4">
                <div className="flex items-center gap-4">
                  <img
                    className="w-16 h-16 rounded-full border-2 border-purple-400"
                    src={selectedUser.profilePic}
                    alt={selectedUser.userName}
                  />
                  <div className="flex flex-col">
                    <span className="text-2xl font-semibold text-white">
                      {selectedUser.userName}
                    </span>
                    <span className="text-sm text-gray-400">Online</span>
                  </div>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto space-y-4 min-h-[50vh] ">
                {messages.map((msg, index) => (
                  <div
                    key={index}
                    className={`flex ${
                      msg.sender === userData.id
                        ? "justify-end"
                        : "justify-start"
                    }`}
                  >
                    <div
                      className={`p-4 rounded-lg max-w-[60%] text-white shadow-lg ${
                        msg.sender === userData.id
                          ? "bg-gradient-to-br from-purple-600 to-purple-800"
                          : "bg-gradient-to-br from-gray-700 to-gray-900"
                      }`}
                    >
                      {msg.message && <span>{msg.message}</span>}
                      {msg.media && (
                        <div className="mt-2">
                          <img
                            src={msg.media}
                            alt="media"
                            className="w-[15vw] rounded-md shadow-md"
                          />
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div ref={messagesEndRef} />

              <div className="flex items-center gap-4 mt-4">
                <input
                  type="text"
                  className="w-full p-4 rounded-lg border border-purple-700 bg-[#1e1e2f] text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Type a message..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyDown={handleKeyDown}
                />
                <input
                  type="file"
                  accept="image/*, video/*"
                  className="hidden"
                  id="file-input"
                  onChange={handleFileSelect}
                />
                <label
                  htmlFor="file-input"
                  className="p-4 bg-purple-700 rounded-lg cursor-pointer text-white hover:bg-purple-600"
                >
                  📷
                </label>
                <button
                  onClick={() => {
                    handleFileSave();
                    if (message.length > 0) {
                      // sendMessage();
                      sendMessageSenderAndReceiver();
                    }
                  }}
                  className="p-4 bg-purple-700 rounded-lg text-white hover:bg-purple-600"
                >
                  <MdSend size={20} />
                </button>
              </div>

              {filePreview && selectedFile && (
                <div className="mt-4 fixed bottom-[6vw]  ">
                  <button
                    onClick={() => {
                      setSelectedFile(null);
                      setFilePreview(null);
                    }} // Function to remove the file preview
                    className="absolute top-0 right-0 p-2 bg-red-600 rounded-full text-white hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-red-500 shadow-lg"
                  >
                    <MdClose size={20} />
                  </button>
                  <p className="text-white font-semibold">Preview:</p>
                  {selectedFile?.type.startsWith("image") ? (
                    <img
                      src={filePreview}
                      alt="File Preview"
                      className="w-[20vw] rounded-md shadow-lg mt-2"
                    />
                  ) : (
                    <video
                      controls
                      className="w-[20vw] rounded-md shadow-lg mt-2"
                    >
                      <source src={filePreview} />
                      Your browser does not support the video tag.
                    </video>
                  )}
                </div>
              )}
            </div>
          ) : (
            <div className="flex-1 flex justify-center items-center text-white">
              <span className="text-lg font-medium">
                Select a user to start chatting
              </span>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default AdvanceMessageUI;
