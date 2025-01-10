import React, { useEffect, useState } from "react";
import { Stomp } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import { useSelector } from "react-redux";
import Navbar from "./Navbar";

interface UserData {
  userName?: string;
  profilePic?: string;
}

interface Message {
  id: number;
  username: string;
  content: string;
}
interface client {
  send: (destination: string, headers: any, body: string) => void;
}

const MessengerUI: React.FC = () => {
  const userData: UserData = useSelector((state: any) => state.User.userdata);

  const [messages, setMessages] = useState<Message[]>([]);
  const [messageInput, setMessageInput] = useState<string>("");
  const [stompClient, setStompClient] = useState<client | null>(null);

  useEffect(() => {
    // Initialize WebSocket connection
    const socket = new SockJS(import.meta.env.VITE_BACKEND_URL_WEBSOCKET);
    // const socket = new SockJS(import.meta.env.VITE_BACKEND_LOCAL_WEBSOCKET);
    const client = Stomp.over(socket);

    client.connect({}, () => {
      console.log("WebSocket connected");

      client.subscribe("/public/messages", (message) => {
        if (message.body) {
          const messageData: Message = JSON.parse(message.body);
          setMessages((prevMessages) => [...prevMessages, messageData]);
        }
      });
    });

    setStompClient(client);

    return () => {
      if (client) {
        client.disconnect(() => {
          console.log("WebSocket disconnected");
        });
      }
    };
  }, []);

  const sendMessage = () => {
    if (stompClient && messageInput.trim() !== "") {
      const messageData: Message = {
        id: Date.now(),
        username: userData?.userName || "manish keer",
        content: messageInput,
      };
      stompClient.send("/app/sendMessage", {}, JSON.stringify(messageData));
      setMessageInput("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  return (
    <>
      <Navbar />

      <div className="flex flex-col h-screen bg-[#212121]">
        {/* Profile Section */}
        <div className="bg-gray-800 p-4 flex items-center justify-between">
          <div className="flex items-center cursor-pointer">
            {/* Profile Image */}
            <img
              src={userData?.profilePic}
              alt="User Avatar"
              className="w-10 h-10 rounded-full"
            />
            {/* Username */}
            <div className="ml-3">
              <h2 className="text-white font-semibold">{userData?.userName}</h2>
              <p className="text-gray-400 text-sm">Online</p>
            </div>
          </div>
          {/* Navigation Button */}
          <button className="text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-all">
            Menu
          </button>
        </div>

        {/* Message List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${
                message.username === userData?.userName
                  ? "justify-end"
                  : "justify-start"
              }`}
            >
              <div
                className={`max-w-xs p-3 rounded-lg ${
                  message.username === userData?.userName
                    ? "bg-blue-600 text-white"
                    : "bg-gray-700 text-white"
                }`}
              >
                {message.content}
              </div>
            </div>
          ))}
        </div>

        {/* Message Input */}
        <div className="bg-gray-800 p-4 flex items-center">
          <input
            type="text"
            value={messageInput}
            onChange={(e) => setMessageInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type a message"
            className="flex-1 p-3 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={sendMessage}
            className="ml-3 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all"
          >
            Send
          </button>
        </div>
      </div>
    </>
  );
};

export default MessengerUI;
