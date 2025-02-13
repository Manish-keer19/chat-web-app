import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

import { FaUser, FaLock } from "react-icons/fa";
import { setToken, setUser } from "../features/User/UserSlice";
import { authService } from "../Service/Authservice";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";

const LoginForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [password, setPassword] = useState("");
  const [loginData, setLoginData] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleGoogleLogin = () => {
    // Redirect to Google OAuth2 login URL
    // toast.error(
    //  "Google oauth2 is giving error in login you can use dummy account to login or use username and password"
    // );
    window.location.href = import.meta.env.VITE_BACKEND_GOOGLE_AUTH2_URL;
    // window.location.href = import.meta.env.VITE_BACKEND_GOOGLE_LOCAL_AUTH2_URL;
  };

  const handleGitHubLogin = () => {
    // toast.error(
    //  "Github oauth2 is giving error in login you can use dummy account to login or use username and password"
    // );
    // Redirect to GitHub OAuth2 login URL
    window.location.href = import.meta.env.VITE_BACKEND_GITHUB_AUTH2_URL;
    // window.location.href = import.meta.env.VITE_BACKEND_GITHUB_LOCAL_AUTH2_URL;
  };

  const handleSubmit = async () => {
    if (!loginData || !password) {
      toast.error("Please enter username and password");
      return;
    }
    setIsLoading(true);
    const data = { userName: loginData, password: password };
    console.log("Data in login is ", data);
    try {
      console.log("Data in login is ", data);
      const res = await authService.login(data);
      if (res.success) {
        console.log("Login successful: ", res);
        dispatch(setUser(res.data.userData));
        dispatch(setToken(res.data.token));
        navigate("/home");
        setIsLoading(false);
      }
    } catch (error) {
      setIsLoading(false);
      setLoginData("");
      setPassword("");
      setIsLoading(false);
      console.log("Error in login: ", error);
    }
  };

  const handleDemoLogin = async () => {
    const data = { userName: "Dummy Account", password: "ms19" };
    console.log("Data in login is ", data);
    try {
      console.log("Data in login is ", data);
      const res = await authService.login(data);
      if (res.success) {
        console.log("Login successful: ", res);
        dispatch(setUser(res.data.userData));
        dispatch(setToken(res.data.token));
        navigate("/home");
      }
    } catch (error) {
      console.log("Error in login: ", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-gray-900 to-black flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md"
      >
        <div className="bg-opacity-20 backdrop-blur-xl bg-gray-900 rounded-2xl p-8 border border-opacity-30 border-purple-500 shadow-[0_0_40px_rgba(139,92,246,0.3)]">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Log In
            </h1>
            <p className="text-gray-400 mt-2">Welcome back!</p>
          </div>

          <div className="space-y-6">
            {/* Username Input */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaUser className="text-gray-400" />
              </div>
              <input
                type="text"
                name="username"
                required
                placeholder="Username"
                value={loginData}
                onChange={(e) => {
                  setLoginData(e.target.value);
                }}
                className="w-full pl-10 pr-4 py-3 bg-gray-800/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-white placeholder-gray-400"
              />
            </div>

            {/* Password Input */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaLock className="text-gray-400" />
              </div>
              <input
                type="password"
                name="password"
                required
                placeholder="Password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                className="w-full pl-10 pr-4 py-3 bg-gray-800/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-white placeholder-gray-400"
              />
            </div>

            {/* Submit Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={isLoading}
              onClick={handleSubmit}
              className="w-full py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg font-semibold hover:from-purple-600 hover:to-pink-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-900"
            >
              {isLoading ? "Logging In..." : "Log In"}
            </motion.button>

            {/* Divider */}
            <div className="flex items-center my-6">
              <hr className="flex-grow border-gray-600" />
              <span className="text-gray-400 px-2">or</span>
              <hr className="flex-grow border-gray-600" />
            </div>

            <button
              onClick={handleDemoLogin}
              className="w-full flex items-center justify-center gap-2 py-2 bg-gray-700 hover:bg-gray-600 text-white font-bold rounded transition duration-300"
            >
              <img

                src="https://api.dicebear.com/9.x/avataaars/svg?seed=Leah"
                alt="GitHub"
                className="w-7 h-7 rounded-full"
              />
             Continue as Demo User
            </button>

            {/* Google Login Button */}
            <button
              onClick={handleGoogleLogin}
              className="w-full flex items-center justify-center gap-2 py-2 bg-red-600 hover:bg-red-500 text-white font-bold rounded transition duration-300 mb-4"
            >
              <img
                src="https://cdn-icons-png.flaticon.com/512/281/281764.png"
                alt="Google"
                className="w-5 h-5"
              />
              Log in with Google
            </button>

            {/* GitHub Login Button */}
            <button
              onClick={handleGitHubLogin}
              className="w-full flex items-center justify-center gap-2 py-2 bg-gray-700 hover:bg-gray-600 text-white font-bold rounded transition duration-300"
            >
              <img
                src="https://cdn-icons-png.flaticon.com/512/25/25231.png"
                alt="GitHub"
                className="w-5 h-5"
              />
              Log in with GitHub
            </button>
           
          </div>

          <p className="text-center text-gray-400 mt-4">
            Don’t have an account?{" "}
            <motion.button
              whileHover={{ scale: 1.05 }}
              onClick={() => navigate("/signup")}
              className="text-purple-400 hover:text-purple-300 font-medium focus:outline-none"
            >
              Sign Up
            </motion.button>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default LoginForm;
