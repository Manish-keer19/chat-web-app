// import { useState } from "react";
// import { motion } from "framer-motion";
// import { useNavigate } from "react-router-dom";

// import { FaUser, FaLock } from "react-icons/fa";
// import { setToken, setUser } from "../features/User/UserSlice";
// import { authService } from "../Service/Authservice";
// import { useDispatch } from "react-redux";
// import toast from "react-hot-toast";

// const LoginForm = () => {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   const [password, setPassword] = useState("");
//   const [loginData, setLoginData] = useState("");
//   const [isLoading, setIsLoading] = useState(false);

//   const handleGoogleLogin = () => {
//     // Redirect to Google OAuth2 login URL
//     // toast.error(
//     //  "Google oauth2 is giving error in login you can use dummy account to login or use username and password"
//     // );
//     window.location.href = import.meta.env.VITE_BACKEND_GOOGLE_AUTH2_URL;
//     // window.location.href = import.meta.env.VITE_BACKEND_GOOGLE_LOCAL_AUTH2_URL;
//   };

//   const handleGitHubLogin = () => {
//     // toast.error(
//     //  "Github oauth2 is giving error in login you can use dummy account to login or use username and password"
//     // );
//     // Redirect to GitHub OAuth2 login URL
//     window.location.href = import.meta.env.VITE_BACKEND_GITHUB_AUTH2_URL;
//     // window.location.href = import.meta.env.VITE_BACKEND_GITHUB_LOCAL_AUTH2_URL;
//   };

//   const handleSubmit = async () => {
//     if (!loginData || !password) {
//       toast.error("Please enter username and password");
//       return;
//     }
//     setIsLoading(true);
//     const data = { userName: loginData, password: password };
//     console.log("Data in login is ", data);
//     try {
//       console.log("Data in login is ", data);
//       const res = await authService.login(data);
//       if (res.success) {
//         console.log("Login successful: ", res);
//         dispatch(setUser(res.data.userData));
//         dispatch(setToken(res.data.token));
//         navigate("/home");
//         setIsLoading(false);
//       }
//     } catch (error) {
//       setIsLoading(false);
//       setLoginData("");
//       setPassword("");
//       setIsLoading(false);
//       console.log("Error in login: ", error);
//     }
//   };

//   const handleDemoLogin = async () => {
//     const data = { userName: "Dummy Account", password: "ms19" };
//     console.log("Data in login is ", data);
//     try {
//       console.log("Data in login is ", data);
//       const res = await authService.login(data);
//       if (res.success) {
//         console.log("Login successful: ", res);
//         dispatch(setUser(res.data.userData));
//         dispatch(setToken(res.data.token));
//         navigate("/home");
//       }
//     } catch (error) {
//       console.log("Error in login: ", error);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-purple-900 via-gray-900 to-black flex items-center justify-center p-4">
//       <motion.div
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.6 }}
//         className="w-full max-w-md"
//       >
//         <div className="bg-opacity-20 backdrop-blur-xl bg-gray-900 rounded-2xl p-8 border border-opacity-30 border-purple-500 shadow-[0_0_40px_rgba(139,92,246,0.3)]">
//           <div className="text-center mb-8">
//             <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
//               Log In
//             </h1>
//             <p className="text-gray-400 mt-2">Welcome back!</p>
//           </div>

//           <div className="space-y-6">
//             {/* Username Input */}
//             <div className="relative">
//               <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                 <FaUser className="text-gray-400" />
//               </div>
//               <input
//                 type="text"
//                 name="username"
//                 required
//                 placeholder="Username"
//                 value={loginData}
//                 onChange={(e) => {
//                   setLoginData(e.target.value);
//                 }}
//                 className="w-full pl-10 pr-4 py-3 bg-gray-800/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-white placeholder-gray-400"
//               />
//             </div>

//             {/* Password Input */}
//             <div className="relative">
//               <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                 <FaLock className="text-gray-400" />
//               </div>
//               <input
//                 type="password"
//                 name="password"
//                 required
//                 placeholder="Password"
//                 value={password}
//                 onChange={(e) => {
//                   setPassword(e.target.value);
//                 }}
//                 className="w-full pl-10 pr-4 py-3 bg-gray-800/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-white placeholder-gray-400"
//               />
//             </div>

//             {/* Submit Button */}
//             <motion.button
//               whileHover={{ scale: 1.02 }}
//               whileTap={{ scale: 0.98 }}
//               type="submit"
//               disabled={isLoading}
//               onClick={handleSubmit}
//               className="w-full py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg font-semibold hover:from-purple-600 hover:to-pink-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-900"
//             >
//               {isLoading ? "Logging In..." : "Log In"}
//             </motion.button>

//             {/* Divider */}
//             <div className="flex items-center my-6">
//               <hr className="flex-grow border-gray-600" />
//               <span className="text-gray-400 px-2">or</span>
//               <hr className="flex-grow border-gray-600" />
//             </div>

//             <button
//               onClick={handleDemoLogin}
//               className="w-full flex items-center justify-center gap-2 py-2 bg-gray-700 hover:bg-gray-600 text-white font-bold rounded transition duration-300"
//             >
//               <img

//                 src="https://api.dicebear.com/9.x/avataaars/svg?seed=Leah"
//                 alt="GitHub"
//                 className="w-7 h-7 rounded-full"
//               />
//              Continue as Demo User
//             </button>

//             {/* Google Login Button */}
//             <button
//               onClick={handleGoogleLogin}
//               className="w-full flex items-center justify-center gap-2 py-2 bg-red-600 hover:bg-red-500 text-white font-bold rounded transition duration-300 mb-4"
//             >
//               <img
//                 src="https://cdn-icons-png.flaticon.com/512/281/281764.png"
//                 alt="Google"
//                 className="w-5 h-5"
//               />
//               Log in with Google
//             </button>

//             {/* GitHub Login Button */}
//             <button
//               onClick={handleGitHubLogin}
//               className="w-full flex items-center justify-center gap-2 py-2 bg-gray-700 hover:bg-gray-600 text-white font-bold rounded transition duration-300"
//             >
//               <img
//                 src="https://cdn-icons-png.flaticon.com/512/25/25231.png"
//                 alt="GitHub"
//                 className="w-5 h-5"
//               />
//               Log in with GitHub
//             </button>
           
//           </div>

//           <p className="text-center text-gray-400 mt-4">
//             Don’t have an account?{" "}
//             <motion.button
//               whileHover={{ scale: 1.05 }}
//               onClick={() => navigate("/signup")}
//               className="text-purple-400 hover:text-purple-300 font-medium focus:outline-none"
//             >
//               Sign Up
//             </motion.button>
//           </p>
//         </div>
//       </motion.div>
//     </div>
//   );
// };

// export default LoginForm;











import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { FaUser, FaLock, FaEye, FaEyeSlash, FaGoogle, FaGithub } from "react-icons/fa";
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
  const [showPassword, setShowPassword] = useState(false);
  const [activeField, setActiveField] = useState<string | null>(null);

  const handleGoogleLogin = () => {
    window.location.href = import.meta.env.VITE_BACKEND_GOOGLE_AUTH2_URL;
  };

  const handleGitHubLogin = () => {
    window.location.href = import.meta.env.VITE_BACKEND_GITHUB_AUTH2_URL;
  };

  const handleSubmit = async (e:any) => {
    e.preventDefault();
    if (!loginData || !password) {
      toast.error("Please enter username and password");
      return;
    }
    setIsLoading(true);
    const data = { userName: loginData, password: password };
    
    try {
      const res = await authService.login(data);
      if (res.success) {
        dispatch(setUser(res.data.userData));
        dispatch(setToken(res.data.token));
        toast.success("Login successful!");
        navigate("/home");
      }
    } catch (error) {
      if (error && typeof error === "object" && "response" in error && error.response && typeof error.response === "object" && "data" in error.response && error.response.data && typeof error.response.data === "object" && "message" in error.response.data) {
        // @ts-ignore
        toast.error(error.response.data.message || "Login failed");
      } else {
        toast.error("Login failed");
      }
      setLoginData("");
      setPassword("");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDemoLogin = async () => {
    const data = { userName: "Dummy Account", password: "ms19" };
    try {
      const res = await authService.login(data);
      if (res.success) {
        dispatch(setUser(res.data.userData));
        dispatch(setToken(res.data.token));
        toast.success("Demo login successful!");
        navigate("/home");
      }
    } catch (error) {
      toast.error("Demo login failed");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 flex items-center justify-center p-4">
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.3 }}
          className="w-full max-w-md"
        >
          <div className="bg-white/5 backdrop-blur-2xl rounded-3xl p-8 border border-white/10 shadow-2xl shadow-purple-900/30">
            {/* Floating Particles Background */}
            <div className="absolute inset-0 overflow-hidden rounded-3xl -z-10">
              {[...Array(15)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{
                    x: Math.random() * 100,
                    y: Math.random() * 100,
                    opacity: 0.3,
                    scale: Math.random() * 0.5 + 0.5
                  }}
                  animate={{
                    x: Math.random() * 100,
                    y: Math.random() * 100,
                    transition: {
                      duration: Math.random() * 10 + 10,
                      repeat: Infinity,
                      repeatType: "reverse"
                    }
                  }}
                  className="absolute rounded-full bg-purple-400/20"
                  style={{
                    width: `${Math.random() * 10 + 5}px`,
                    height: `${Math.random() * 10 + 5}px`
                  }}
                />
              ))}
            </div>

            <div className="text-center mb-8">
              <motion.h1 
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1 }}
                className="text-4xl font-bold bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text text-transparent"
              >
                Welcome Back
              </motion.h1>
              <motion.p 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-gray-300 mt-2 text-sm"
              >
                Sign in to continue to your account
              </motion.p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Username Input */}
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                <label className="block text-sm font-medium text-gray-300 mb-1 ml-1">
                  Username or Email
                </label>
                <div 
                  className={`relative transition-all duration-200 ${activeField === 'username' ? 'ring-2 ring-purple-400/50' : ''}`}
                  style={{ borderRadius: '12px' }}
                >
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaUser className={`text-gray-400 transition-colors ${activeField === 'username' ? 'text-purple-300' : ''}`} />
                  </div>
                  <input
                    type="text"
                    name="username"
                    required
                    placeholder="Enter your username or email"
                    value={loginData}
                    onChange={(e) => setLoginData(e.target.value)}
                    onFocus={() => setActiveField('username')}
                    onBlur={() => setActiveField(null)}
                    className="w-full pl-10 pr-4 py-3 bg-white/5 backdrop-blur-sm rounded-xl focus:outline-none focus:bg-white/10 text-white placeholder-gray-400 transition-all duration-200"
                  />
                </div>
              </motion.div>

              {/* Password Input */}
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
              >
                <label className="block text-sm font-medium text-gray-300 mb-1 ml-1">
                  Password
                </label>
                <div 
                  className={`relative transition-all duration-200 ${activeField === 'password' ? 'ring-2 ring-purple-400/50' : ''}`}
                  style={{ borderRadius: '12px' }}
                >
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaLock className={`text-gray-400 transition-colors ${activeField === 'password' ? 'text-purple-300' : ''}`} />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    required
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onFocus={() => setActiveField('password')}
                    onBlur={() => setActiveField(null)}
                    className="w-full pl-10 pr-10 py-3 bg-white/5 backdrop-blur-sm rounded-xl focus:outline-none focus:bg-white/10 text-white placeholder-gray-400 transition-all duration-200"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-purple-300 transition-colors"
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
                <div className="flex justify-end mt-1">
                  <button
                    type="button"
                    // onClick={() => navigate("/forgot-password")}
                    className="text-xs text-purple-300 hover:text-purple-200 transition-colors"
                  >
                    Forgot password?
                  </button>
                </div>
              </motion.div>

              {/* Submit Button */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={isLoading}
                  className={`w-full py-3.5 rounded-xl font-semibold text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-all duration-200 ${isLoading ? 'bg-purple-700' : 'bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 shadow-lg'}`}
                >
                  {isLoading ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Signing in...
                    </span>
                  ) : (
                    "Sign In"
                  )}
                </motion.button>
              </motion.div>

              {/* Divider */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="flex items-center my-6"
              >
                <hr className="flex-grow border-gray-600/50" />
                <span className="text-gray-400 px-3 text-sm">or continue with</span>
                <hr className="flex-grow border-gray-600/50" />
              </motion.div>

              {/* Social Login Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="grid grid-cols-2 gap-3"
              >
                <button
                  type="button"
                  onClick={handleGoogleLogin}
                  className="flex items-center justify-center gap-2 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-white transition-colors duration-200"
                >
                  <FaGoogle className="text-red-400" />
                  <span className="text-sm">Google</span>
                </button>

                <button
                  type="button"
                  onClick={handleGitHubLogin}
                  className="flex items-center justify-center gap-2 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-white transition-colors duration-200"
                >
                  <FaGithub className="text-gray-300" />
                  <span className="text-sm">GitHub</span>
                </button>
              </motion.div>

              {/* Demo Login */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
              >
                <button
                  type="button"
                  onClick={handleDemoLogin}
                  className="w-full flex items-center justify-center gap-2 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-white transition-colors duration-200 mt-3"
                >
                  <img
                    src="https://api.dicebear.com/9.x/avataaars/svg?seed=Demo"
                    alt="Demo"
                    className="w-5 h-5 rounded-full"
                  />
                  <span className="text-sm">Try Demo Account</span>
                </button>
              </motion.div>
            </form>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
              className="text-center text-gray-400 mt-6 text-sm"
            >
              Don't have an account?{" "}
              <button
                onClick={() => navigate("/signup")}
                className="text-purple-300 hover:text-purple-200 font-medium focus:outline-none transition-colors"
              >
                Sign up
              </button>
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default LoginForm;