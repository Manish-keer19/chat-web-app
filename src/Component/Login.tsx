import React, { useState } from "react";
import { authService } from "../Service/Authservice";
import { useDispatch } from "react-redux";
import { setToken, setuser } from "../features/User/UserSlice";
import { Link, useNavigate } from "react-router-dom";

const LoginForm: React.FC = () => {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loginData, setLoginData] = useState("");
  const [password, setPassword] = useState("");

  const handleGoogleLogin = () => {
    // Redirect to Google OAuth2 login URL
    // window.location.href = "http://localhost:8080/oauth2/authorization/google";
  };

  const handleGitHubLogin = () => {
    // Redirect to GitHub OAuth2 login URL
    // window.location.href = "http://localhost:8080/oauth2/authorization/github";
  };

  const handleSubmit = async () => {
    const data = { userName: loginData, password: password };

    try {
      console.log("Data in login is ", data);
      const res = await authService.login(data);

      if (res.success) {
        console.log("Login successful: ", res);
        dispatch(setuser(res.data.userData));
        dispatch(setToken(res.data.token));
        navigate("/home");
      }
    } catch (error) {
      console.log("Error in login: ", error);
    }
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen"
      style={{ backgroundColor: "#212121" }}
    >
      <div
        className={`bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md transform transition-all duration-500 ${
          isHovered ? "scale-105" : "scale-100"
        }`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <h2 className="text-3xl font-semibold text-white text-center mb-6">
          Login
        </h2>

        <div className="mb-4">
          <label htmlFor="text" className="block text-gray-400 text-sm mb-2">
            credentials
          </label>
          <input
            type="text"
            id="email"
            className="w-full px-4 py-2 text-white bg-gray-700 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your email or username"
            value={loginData}
            onChange={(e) => setLoginData(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-gray-400 text-sm mb-2"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            className="w-full px-4 py-2 text-white bg-gray-700 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button
          onClick={handleSubmit}
          className="w-full py-2 mt-4 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded transition duration-300"
        >
          Login
        </button>

        <div className="mt-6">
          <div className="flex items-center justify-between mb-4">
            <span className="border-b border-gray-600 flex-grow"></span>
            <span className="text-gray-400 px-2">or</span>
            <span className="border-b border-gray-600 flex-grow"></span>
          </div>
          <button
            className="w-full flex items-center justify-center gap-2 py-2 bg-gray-700 hover:bg-gray-600 text-white font-bold rounded transition duration-300 mb-4"
            onClick={handleGitHubLogin}
          >
            <img
              src="https://cdn-icons-png.flaticon.com/512/25/25231.png"
              alt="GitHub"
              className="w-5 h-5"
            />
            Login with GitHub
          </button>
          <button
            className="w-full flex items-center justify-center gap-2 py-2 bg-red-600 hover:bg-red-500 text-white font-bold rounded transition duration-300"
            onClick={handleGoogleLogin}
          >
            <img
              src="https://cdn-icons-png.flaticon.com/512/281/281764.png"
              alt="Google"
              className="w-5 h-5"
            />
            Login with Google
          </button>
        </div>
        <p className="text-gray-400 text-sm mt-4 text-center">
          Don’t have an account?{" "}
          <Link to={"#"} className="text-blue-500 hover:underline">
            sign-up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
