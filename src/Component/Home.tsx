import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const HomePage: React.FC = () => {
  const navigate = useNavigate();

  const userData = useSelector((state: any) => state.User.userdata);
  console.log("userData", userData);

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-[#212121] text-white">
      <div
        className="bg-gradient-to-br from-gray-800 via-gray-900 to-black p-8 rounded-3xl shadow-2xl w-96 max-w-lg transform scale-95 hover:scale-100 transition-transform duration-500"
        style={{ animation: "fadeIn 1.5s" }}
      >
        <h2
          className="text-3xl font-bold text-center mb-4 animate-bounce"
          style={{ animation: "fadeInUp 1.5s" }}
        >
          Welcome to Chat App
        </h2>
        <p className="text-lg text-center mb-6" style={{ animation: "fadeInUp 1.8s" }}>
          Created by <span className="text-blue-500">Manish Keer</span>
        </p>
        <div
          className="text-center mb-6"
          style={{ animation: "fadeInUp 2s" }}
        >
          <div className="flex justify-center mb-4">
            <img
              src={userData.profilePic}
              alt="Profile"
              className="w-20 h-20 rounded-full shadow-lg transform hover:scale-110 transition-transform duration-300"
            />
          </div>
          <h3 className="text-2xl font-semibold">{userData.userName}</h3>
          <p className="text-sm text-gray-400 mt-1">
            Role: {userData.role.join(", ")}
          </p>
        </div>

        <button
          onClick={() => {
            navigate("/UserFullDetail");
          }}
          className="w-full py-3 bg-gradient-to-r from-blue-500 to-blue-700 text-white font-semibold rounded-lg hover:opacity-90 transition-all duration-300 focus:outline-none shadow-lg"
          style={{ animation: "fadeInUp 2.3s" }}
        >
          Go to Chat
        </button>
      </div>
      <style>
        {`
          @keyframes fadeIn {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(40px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}
      </style>
    </div>
  );
};

export default HomePage;
