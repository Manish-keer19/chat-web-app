import React, { useEffect, useRef, useState } from "react";
import { IoChevronBackOutline } from "react-icons/io5";
import { MdSend } from "react-icons/md";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import { Stomp } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import { userService } from "../Service/userService";

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

const UserDetail: React.FC = () => {
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
    const socket = new SockJS("http://localhost:8080/ws");
    const client = Stomp.over(socket);

    client.connect({}, () => {
      console.log("WebSocket connected");
      client.subscribe("/public/messages", (message) => {
        const messageData = JSON.parse(message.body);
        console.log("Message received:", messageData);
        setMessages(messageData.messages);
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

  const sendMessageUserTyping = () => {
    if (stompClient && message.trim()) {
      stompClient.send(
        "/app/sendTypingMessage",
        {},
        JSON.stringify(`${userData.userName} is typing...`)
      );
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

  return (
    <div className="w-full min-h-screen bg-[#212121] flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between bg-gradient-to-r from-[#2c333f] to-[#161d29] p-2 shadow-lg">
        <IoChevronBackOutline
          size={25}
          className="text-[#c5c7d4] cursor-pointer"
        />
        <h1 className="text-2xl text-[#c5c7d4]">Manish's Chat App</h1>
        <div className="flex items-center flex-col">
          <img
            className="w-12 h-12 rounded-full object-cover border-2 border-[#4b4b4b]"
            src={userData?.profilePic}
            alt={userData?.userName}
          />
          <p className="text-[#c5c7d4]">{userData?.userName}</p>
        </div>
      </div>

      <div className="flex flex-row w-full min-h-[80vh]">
        {/* Users List */}
        <div className="w-[30%] bg-[#161d39] p-6 text-[#c5c7d4] overflow-y-auto rounded-sm">
          <h2 className="text-xl mb-6 font-semibold">Users</h2>
          <div className="flex flex-col gap-4">
            {users.map((user) => (
              <div
                key={user.id}
                className="flex items-center gap-4 p-4 cursor-pointer hover:bg-[#2c333f] rounded-lg transition-all duration-300 ease-in-out transform hover:scale-105"
                onClick={() => handleSelectUser(user)}
              >
                <img
                  className="w-12 h-12 rounded-full object-cover border-2 border-[#4b4b4b]"
                  src={user.profilePic}
                  alt={user.userName}
                />
                <div className="flex flex-col">
                  <span className="text-lg font-medium">{user.userName}</span>
                  <span
                    className={`text-sm ${
                      user.status === "Online"
                        ? "text-green-500"
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
          <div className="flex-1 bg-[#161d29] p-6">
            <div className="bg-[#2c333f] rounded-lg mb-2 shadow-lg p-1 pl-2">
              <div className="flex items-center gap-4">
                <img
                  className="w-16 h-16 rounded-full object-cover border-2 border-[#4b4b4b]"
                  src={selectedUser.profilePic}
                  alt={selectedUser.userName}
                />
                <div className="flex flex-col">
                  <span className="text-2xl font-semibold text-[#c5c7d4]">
                    {selectedUser.userName}
                  </span>
                  <span className="text-sm text-[#a0a0a0]">Online</span>
                </div>
              </div>
            </div>

            <div className="bg-[#161d29] p-6 rounded-lg h-[60vh] overflow-y-auto shadow-inner">
              <div className="flex flex-col gap-6">
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
                      className={`p-4 rounded-lg max-w-[70%] text-white shadow-md ${
                        msg.sender === userData.id
                          ? "bg-[#2c333f]"
                          : "bg-[#4b4b4b]"
                      }`}
                    >
                      <span>{msg.message}</span>
                    </div>
                  </div>
                ))}
              </div>
              <div ref={messagesEndRef} />
            </div>

            {/* Typing Indicator */}
            {message && (
              <div className="text-[#c5c7d4] text-sm mt-2">Typing...</div>
            )}

            <div className="flex items-center gap-4 mt-6">
              <input
                type="text"
                className="w-full p-4 bg-[#2c333f] text-[#c5c7d4] rounded-lg border-2 border-[#4b4b4b] focus:border-yellow-500 focus:outline-none transition-all"
                placeholder="Type a message..."
                value={message}
                onChange={(e) => {
                  setMessage(e.target.value);
                  sendMessageUserTyping();
                }}
                onKeyDown={handleKeyDown}
              />
              <button
                onClick={sendMessage}
                className="p-4 bg-[#2c333f] text-yellow-500 rounded-lg transition-all duration-300 ease-in-out hover:bg-[#3a434f]"
              >
                <MdSend size={20} />
              </button>
            </div>
          </div>
        ) : (
          <div className="flex-1 bg-[#161d29] p-6 flex justify-center items-center text-[#c5c7d4]">
            <span className="text-xl">Select a user to start chatting</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserDetail;
