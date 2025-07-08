// MessageView.tsx
import React, { useEffect, useRef, useState } from "react";
import { IoChevronBackOutline, IoSearchOutline, IoArrowDown, IoArrowUp } from "react-icons/io5";
import { MdClose, MdSend, MdAttachFile, MdEmojiEmotions, MdMoreVert } from "react-icons/md";
import { BiImageAlt } from "react-icons/bi";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import { Stomp } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import { userService } from "../../Service/userService";
import { useNavigate, useParams } from "react-router-dom";
import EmojiPicker from "emoji-picker-react";
import Lightbox from "react-18-image-lightbox";
import "react-18-image-lightbox/style.css";
// Add these imports at the top
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";


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

const MessageView: React.FC = () => {
    const { userId } = useParams();
    const token = useSelector((state: { User: UserState }) => state.User.token);
    const userData = useSelector((state: { User: UserState }) => state.User.userdata);
    const navigate = useNavigate();

    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const [message, setMessage] = useState<string>("");
    const [messages, setMessages] = useState<Message[]>([]);
    const [stompClient, setStompClient] = useState<any>(null);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [filePreview, setFilePreview] = useState<string | null>(null);
    const [showEmojiPicker, setShowEmojiPicker] = useState<boolean>(false);
    const [isLightboxOpen, setIsLightboxOpen] = useState<boolean>(false);
    const [lightboxImage, setLightboxImage] = useState<string>("");
    const [typing, setTyping] = useState<boolean>(false);
    const [typingTimeout, setTypingTimeout] = useState<NodeJS.Timeout | null>(null);
    const [loadingImages, setLoadingImages] = useState<{ [key: string]: boolean }>({});
    const [showScrollButton, setShowScrollButton] = useState<boolean>(false);
    const [showUpButton, setShowUpButton] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);

    const messagesEndRef = useRef<HTMLDivElement>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const emojiPickerRef = useRef<HTMLDivElement>(null);
    const messageInputRef = useRef<HTMLInputElement>(null);
    const messagesContainerRef = useRef<HTMLDivElement>(null);

    // Fetch selected user data
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                if (!userId || !token) return;

                const cachedUsers = localStorage.getItem("users");
                if (cachedUsers) {
                    const users = JSON.parse(cachedUsers);
                    const user = users.find((u: User) => u.id === userId);
                    if (user) {
                        setSelectedUser(user);
                        return;
                    }
                }

                navigate("/messages");
            } catch (error) {
                
                toast.error("Could not fetch user data");
                navigate("/messages");
            }
        };

        fetchUserData();
    }, [userId, token, navigate]);

    // Setup WebSocket connection
    useEffect(() => {
        if (!userData?.id || !selectedUser) return;

        const socket = new SockJS(import.meta.env.VITE_BACKEND_URL_WEBSOCKET_WITH_HTTPS);
        const client = Stomp.over(socket);

        client.connect({}, () => {
            // Private messages subscription
            client.subscribe(`/user/queue/${userData.id}`, (message) => {
                const messageData = JSON.parse(message.body);
                const storageKey = `messages_${selectedUser.id}`;
                const existing = JSON.parse(localStorage.getItem(storageKey) || '[]');

                // Append new message and keep only the last 100 messages
                const updatedMessages = [...existing, messageData].slice(-100);
                localStorage.setItem(storageKey, JSON.stringify(updatedMessages));

                setMessages(prevMessages => {
                    const newMessages = [...prevMessages, messageData];
                    if (messageData.media) {
                        setLoadingImages(prev => ({ ...prev, [messageData.id]: true }));
                    }
                    return newMessages;
                });
            });

            // Typing indicator subscription
            client.subscribe(`/user/queue/typing`, (message) => {
                const typingData = JSON.parse(message.body);
                if (typingData.senderId === selectedUser.id) {
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

    // Handle scroll events
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
            setLoading(true);

            // Check if messages are already in localStorage
            const cachedMessages = localStorage.getItem(`messages_${selectedUser.id}`);
            if (cachedMessages) {
                const parsedMessages = JSON.parse(cachedMessages).map((msg: any) => ({
                    ...msg,
                    createdAt: new Date(msg.createdAt)
                }));
                setMessages(parsedMessages);
                setLoading(false);
                return;
            }

            const res = await userService.getUserMessages(token, selectedUser.id);
            if (res.success) {

                if(!res.data) {
                    // toast.error("No messages found for this user");
                    return;
                }
                localStorage.setItem(`messages_${selectedUser.id}`, JSON.stringify(res.data.messages));

                const formattedMessages = res.data.messages.map((msg: any) => ({
                    ...msg,
                    createdAt: new Date(msg.createdAt)
                }));
                setMessages(formattedMessages);

                const initialLoadingStates = res.data.messages.reduce((acc: { [key: string]: boolean }, msg: any) => {
                    if (msg.media) {
                        acc[msg.id] = true;
                    }
                    return acc;
                }, {});
                setLoadingImages(initialLoadingStates);
            }
            
        } catch (error) {
            toast.error("Could not fetch messages");
        } finally {
            setLoading(false);
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
                const newMessage: Message = {
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

    const MessageSkeleton =() => {
  return (
    <div className="space-y-6 p-4">
    {/* Date divider skeleton */}
    <div className="flex justify-center">
      <Skeleton 
        width={100} 
        height={24} 
        className="rounded-full"
        baseColor="#f3f4f6"
        highlightColor="#e5e7eb"
      />
    </div>

    {/* Incoming message skeleton */}
    <div className="flex items-start gap-3">
      <Skeleton 
        circle 
        width={40} 
        height={40} 
        baseColor="#f3f4f6"
        highlightColor="#e5e7eb"
      />
      <div className="flex-1 space-y-2">
        <Skeleton 
          width={120} 
          height={16} 
          baseColor="#f3f4f6"
          highlightColor="#e5e7eb"
        />
        <Skeleton 
          width={200} 
          height={80} 
          className="rounded-lg rounded-bl-none"
          baseColor="#ffffff"
          highlightColor="#f9fafb"
        />
        <Skeleton 
          width={60} 
          height={12} 
          className="self-end"
          baseColor="#f3f4f6"
          highlightColor="#e5e7eb"
        />
      </div>
    </div>

    {/* Outgoing message skeleton */}
    <div className="flex items-start justify-end gap-3">
      <div className="flex-1 space-y-2 flex flex-col items-end">
        <Skeleton 
          width={200} 
          height={80} 
          className="rounded-lg rounded-br-none"
          baseColor="#8b5cf6"
          highlightColor="#a78bfa"
        />
        <Skeleton 
          width={60} 
          height={12} 
          baseColor="#f3f4f6"
          highlightColor="#e5e7eb"
        />
      </div>
    </div>

    {/* Image message skeleton */}
    <div className="flex items-start gap-3">
      <Skeleton 
        circle 
        width={40} 
        height={40} 
        baseColor="#f3f4f6"
        highlightColor="#e5e7eb"
      />
      <div className="flex-1 space-y-2">
        <Skeleton 
          width={120} 
          height={16} 
          baseColor="#f3f4f6"
          highlightColor="#e5e7eb"
        />
        <Skeleton 
          width={300} 
          height={200} 
          className="rounded-lg"
          baseColor="#f3f4f6"
          highlightColor="#e5e7eb"
        />
        <Skeleton 
          width={60} 
          height={12} 
          className="self-end"
          baseColor="#f3f4f6"
          highlightColor="#e5e7eb"
        />
      </div>
    </div>
  </div>
  );
};


    const groupedMessages = groupMessagesByDate();

    if (!selectedUser) {
        return (
            <div className="flex items-center justify-center h-full bg-gray-50 dark:bg-gray-900">
                <div className="text-center p-6">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500 mx-auto mb-4"></div>
                    <p className="text-gray-500 dark:text-gray-400">Loading user data...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="flex-1 flex flex-col bg-gray-50 dark:bg-gray-900 h-full">
        {/* <Navbar/> */}
            {/* Chat Header */}
            <div className="p-4 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 flex items-center justify-between">
                <div className="flex items-center">
                    <button
                        onClick={() => navigate("/messages")}
                        className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 mr-2"
                    >
                        <IoChevronBackOutline className="text-gray-600 dark:text-gray-300" />
                    </button>
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
                            className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white dark:border-gray-800 ${selectedUser.status === "Online" ? "bg-green-500" : "bg-gray-400"
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
                {loading ? (
                    <MessageSkeleton />
                ) : Object.entries(groupedMessages).length > 0 ? (
                    Object.entries(groupedMessages).map(([date, dateMessages]) => (
                        <div key={date} className="mb-6">
                            <div className="flex justify-center mb-4">
                                <span className="px-3 py-1 bg-gray-200 dark:bg-gray-700 text-xs text-gray-600 dark:text-gray-300 rounded-full">
                                    {date}
                                </span>
                            </div>
                            {dateMessages.map((msg, index) => (
                                <div
                                    key={msg.id || index}
                                    className={`flex mb-4 ${msg.sender === userData.id ? "justify-end" : "justify-start"
                                        }`}
                                >
                                    <div
                                        className={`max-w-xs md:max-w-md lg:max-w-lg rounded-lg p-3 ${msg.sender === userData.id
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
                                                    className={`max-h-60 w-full object-cover cursor-pointer hover:opacity-90 transition-opacity ${loadingImages[msg.id] ? 'opacity-0' : 'opacity-100'
                                                        }`}
                                                    onClick={() => openLightbox(msg.media!)}
                                                    onLoad={() => handleImageLoad(msg.id)}
                                                />
                                            </div>
                                        )}
                                        {msg.message && <p className="text-sm whitespace-pre-wrap break-words">{msg.message}</p>}
                                        <div
                                            className={`text-xs mt-1 flex justify-end items-center ${msg.sender === userData.id
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
                    ))
                ) : (
                    <div className="flex flex-col items-center justify-center h-full text-gray-500 dark:text-gray-400">
                        <p>No messages yet</p>
                        <p className="text-sm mt-2">Start the conversation with {selectedUser.userName}</p>
                    </div>
                )}
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
            <div className="p-4 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
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
                        className={`p-3 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-colors ${message.trim() || selectedFile
                            ? "bg-purple-500 text-white hover:bg-purple-600"
                            : "bg-gray-200 dark:bg-gray-700 text-gray-400 cursor-not-allowed"
                            }`}
                        disabled={!message.trim() && !selectedFile}
                    >
                        <MdSend size={24} />
                    </button>
                </div>
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
    );
};

export default MessageView;