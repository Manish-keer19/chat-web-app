// import React, { useState } from "react";
// import { motion } from "framer-motion";
// import { useNavigate } from "react-router-dom";
// import { FaUser, FaEnvelope, FaLock, FaImage } from "react-icons/fa";
// import toast from "react-hot-toast";
// import { authService } from "../Service/Authservice";

// const SignUp = () => {
//   const navigate = useNavigate();
//   const [userName, setUserName] = useState<string>("");
//   const [email, setEmail] = useState<string>("");
//   const [password, setPassword] = useState<string>("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [isLoading, setIsLoading] = useState(false);
//   const [selectedFile, setSelectedFile] = useState<File | null>();

//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files && e.target.files[0]) {
//       const file = e.target.files[0];
//       console.log("file is", file);
//       setSelectedFile(file);
//     }
//   };

//   const handleSubmit = async () => {
//     if (!userName || !email || !password || !confirmPassword) {
//       toast.error("Please fill all the fields");
//       return;
//     }
//     if (password !== confirmPassword) {
//       toast.error("Passwords do not match");
//       return;
//     }
//     setIsLoading(true);
//     const data = {
//       userName,
//       email,
//       password,
//     };

//     const formData = new FormData();
//     formData.append("User", JSON.stringify(data));
//     if (selectedFile) {
//       formData.append("file", selectedFile);
//     }
//     try {
//       const res = await authService.signUp(formData);
//       console.log("res is ", res);
//       if (res.success) {
//         toast.success("Login karo bhai");
//         navigate("/login");
//         setIsLoading(false);
//       }
//     } catch (error) {
//       setIsLoading(false);
//       console.log("Error in signup: ", error);
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
//               Create Account
//             </h1>
//             <p className="text-gray-400 mt-2">Join our community today</p>
//           </div>

//           <div className="space-y-6">
//             {/* Profile Picture Upload */}
//             <div className="flex justify-center mb-6">
//               <motion.div whileHover={{ scale: 1.05 }} className="relative">
//                 <div className="w-24 h-24 rounded-full border-2 border-purple-500 overflow-hidden">
//                   {selectedFile ? (
//                     <img
//                       src={URL.createObjectURL(selectedFile)}
//                       alt="Profile Preview"
//                       className="w-full h-full object-cover"
//                     />
//                   ) : (
//                     <div className="w-full h-full bg-gray-800 flex items-center justify-center">
//                       <FaUser className="w-8 h-8 text-gray-400" />
//                     </div>
//                   )}
//                 </div>
//                 <label
//                   htmlFor="profilePic"
//                   className="absolute bottom-0 right-0 bg-purple-500 p-2 rounded-full cursor-pointer hover:bg-purple-600 transition-colors"
//                 >
//                   <FaImage className="w-4 h-4" />
//                 </label>
//                 <input
//                   type="file"
//                   id="profilePic"
//                   accept="image/*"
//                   onChange={handleFileChange}
//                   className="hidden"
//                 />
//               </motion.div>
//             </div>

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
//                 value={userName}
//                 onChange={(e) => setUserName(e.target.value)}
//                 className="w-full pl-10 pr-4 py-3 bg-gray-800/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-white placeholder-gray-400"
//               />
//             </div>

//             {/* Email Input */}
//             <div className="relative">
//               <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                 <FaEnvelope className="text-gray-400" />
//               </div>
//               <input
//                 type="email"
//                 name="email"
//                 required
//                 placeholder="Email address"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
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
//                 onChange={(e) => setPassword(e.target.value)}
//                 className="w-full pl-10 pr-4 py-3 bg-gray-800/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-white placeholder-gray-400"
//               />
//             </div>

//             {/* Confirm Password Input */}
//             <div className="relative">
//               <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                 <FaLock className="text-gray-400" />
//               </div>
//               <input
//                 type="password"
//                 name="confirmPassword"
//                 required
//                 placeholder="Confirm password"
//                 value={confirmPassword}
//                 onChange={(e) => {
//                   setConfirmPassword(e.target.value);
//                 }}
//                 className="w-full pl-10 pr-4 py-3 bg-gray-800/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-white placeholder-gray-400"
//               />
//             </div>

//             {/* Submit Button */}
//             <motion.button
//               whileHover={{ scale: 1.02 }}
//               whileTap={{ scale: 0.98 }}
//               onClick={handleSubmit}
//               disabled={isLoading}
//               className="w-full py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg font-semibold hover:from-purple-600 hover:to-pink-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-900"
//             >
//               {isLoading ? "Creating Account..." : "Sign Up"}
//             </motion.button>

//             {/* Login Link */}
//             <p className="text-center text-gray-400">
//               Already have an account?{" "}
//               <motion.button
//                 whileHover={{ scale: 1.05 }}
//                 onClick={() => navigate("/login")}
//                 className="text-purple-400 hover:text-purple-300 font-medium focus:outline-none"
//               >
//                 Log in
//               </motion.button>
//             </p>
//           </div>
//         </div>
//       </motion.div>
//     </div>
//   );
// };

// export default SignUp;







import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { FaUser, FaEnvelope, FaLock, FaEye, FaEyeSlash, FaGoogle, FaGithub, FaImage } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { setToken, setUser } from "../features/User/UserSlice";
import { authService } from "../Service/Authservice";
import toast from "react-hot-toast";

const SignUp = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [errors, setErrors] = useState({
    userName: "",
    email: "",
    password: "",
    confirmPassword: "",
    general: ""
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [activeField, setActiveField] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      // Validate file type and size
      if (!file.type.match('image.*')) {
        setErrors(prev => ({ ...prev, general: "Please select an image file" }));
        return;
      }
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        setErrors(prev => ({ ...prev, general: "Image size should be less than 5MB" }));
        return;
      }
      setSelectedFile(file);
      setErrors(prev => ({ ...prev, general: "" }));
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    let valid = true;
    const newErrors = {
      userName: "",
      email: "",
      password: "",
      confirmPassword: "",
      general: ""
    };

    if (!formData.userName.trim()) {
      newErrors.userName = "Username is required";
      valid = false;
    } else if (formData.userName.length < 3) {
      newErrors.userName = "Username must be at least 3 characters";
      valid = false;
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
      valid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
      valid = false;
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
      valid = false;
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
      valid = false;
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
      valid = false;
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    
    const data = {
      userName: formData.userName,
      email: formData.email,
      password: formData.password,
    };

    const formDataToSend = new FormData();
    formDataToSend.append("User", JSON.stringify(data));
    if (selectedFile) {
      formDataToSend.append("file", selectedFile);
    }

    try {
      const res = await authService.signUp(formDataToSend);
      if (res.success) {
        // Auto-login after successful signup
        const loginRes = await authService.login({
          userName: formData.userName,
          password: formData.password
        });
        
        if (loginRes.success) {
          dispatch(setUser(loginRes.data.userData));
          dispatch(setToken(loginRes.data.token));
          toast.success("Account created successfully!");
          navigate("/home");
        }
      }
    } catch (error: any) {
      console.error("Error in signup: ", error);
      const errorMsg = error.response?.data?.message || "Signup failed. Please try again.";
      setErrors(prev => ({ ...prev, general: errorMsg }));
      toast.error(errorMsg);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    window.location.href = import.meta.env.VITE_BACKEND_GOOGLE_AUTH2_URL;
  };

  const handleGitHubLogin = () => {
    window.location.href = import.meta.env.VITE_BACKEND_GITHUB_AUTH2_URL;
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
                Create Account
              </motion.h1>
              <motion.p 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-gray-300 mt-2 text-sm"
              >
                Join our community today
              </motion.p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Profile Picture Upload */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="flex justify-center"
              >
                <motion.div whileHover={{ scale: 1.05 }} className="relative">
                  <div className="w-20 h-20 rounded-full border-2 border-purple-500 overflow-hidden">
                    {selectedFile ? (
                      <img
                        src={URL.createObjectURL(selectedFile)}
                        alt="Profile Preview"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-800/50 flex items-center justify-center">
                        <FaUser className="w-6 h-6 text-gray-400" />
                      </div>
                    )}
                  </div>
                  <label
                    htmlFor="profilePic"
                    className="absolute bottom-0 right-0 bg-purple-500 p-1.5 rounded-full cursor-pointer hover:bg-purple-600 transition-colors"
                  >
                    <FaImage className="w-3 h-3" />
                  </label>
                  <input
                    type="file"
                    id="profilePic"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                </motion.div>
              </motion.div>

              {errors.general && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center text-sm text-red-400 bg-red-900/30 py-2 px-3 rounded-lg"
                >
                  {errors.general}
                </motion.div>
              )}

              {/* Username Input */}
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
              >
                <label className="block text-sm font-medium text-gray-300 mb-1 ml-1">
                  Username
                </label>
                <div 
                  className={`relative transition-all duration-200 ${activeField === 'userName' ? 'ring-2 ring-purple-400/50' : ''}`}
                  style={{ borderRadius: '12px' }}
                >
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaUser className={`text-gray-400 transition-colors ${activeField === 'userName' ? 'text-purple-300' : ''}`} />
                  </div>
                  <input
                    type="text"
                    name="userName"
                    required
                    placeholder="Enter your username"
                    value={formData.userName}
                    onChange={handleChange}
                    onFocus={() => setActiveField('userName')}
                    onBlur={() => setActiveField(null)}
                    className="w-full pl-10 pr-4 py-3 bg-white/5 backdrop-blur-sm rounded-xl focus:outline-none focus:bg-white/10 text-white placeholder-gray-400 transition-all duration-200"
                  />
                </div>
                {errors.userName && (
                  <motion.p 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-red-400 text-xs mt-1 ml-1"
                  >
                    {errors.userName}
                  </motion.p>
                )}
              </motion.div>

              {/* Email Input */}
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
              >
                <label className="block text-sm font-medium text-gray-300 mb-1 ml-1">
                  Email
                </label>
                <div 
                  className={`relative transition-all duration-200 ${activeField === 'email' ? 'ring-2 ring-purple-400/50' : ''}`}
                  style={{ borderRadius: '12px' }}
                >
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaEnvelope className={`text-gray-400 transition-colors ${activeField === 'email' ? 'text-purple-300' : ''}`} />
                  </div>
                  <input
                    type="email"
                    name="email"
                    required
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleChange}
                    onFocus={() => setActiveField('email')}
                    onBlur={() => setActiveField(null)}
                    className="w-full pl-10 pr-4 py-3 bg-white/5 backdrop-blur-sm rounded-xl focus:outline-none focus:bg-white/10 text-white placeholder-gray-400 transition-all duration-200"
                  />
                </div>
                {errors.email && (
                  <motion.p 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-red-400 text-xs mt-1 ml-1"
                  >
                    {errors.email}
                  </motion.p>
                )}
              </motion.div>

              {/* Password Input */}
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 }}
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
                    value={formData.password}
                    onChange={handleChange}
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
                {errors.password && (
                  <motion.p 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-red-400 text-xs mt-1 ml-1"
                  >
                    {errors.password}
                  </motion.p>
                )}
              </motion.div>

              {/* Confirm Password Input */}
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 }}
              >
                <label className="block text-sm font-medium text-gray-300 mb-1 ml-1">
                  Confirm Password
                </label>
                <div 
                  className={`relative transition-all duration-200 ${activeField === 'confirmPassword' ? 'ring-2 ring-purple-400/50' : ''}`}
                  style={{ borderRadius: '12px' }}
                >
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaLock className={`text-gray-400 transition-colors ${activeField === 'confirmPassword' ? 'text-purple-300' : ''}`} />
                  </div>
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    required
                    placeholder="Confirm your password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    onFocus={() => setActiveField('confirmPassword')}
                    onBlur={() => setActiveField(null)}
                    className="w-full pl-10 pr-10 py-3 bg-white/5 backdrop-blur-sm rounded-xl focus:outline-none focus:bg-white/10 text-white placeholder-gray-400 transition-all duration-200"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-purple-300 transition-colors"
                  >
                    {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <motion.p 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-red-400 text-xs mt-1 ml-1"
                  >
                    {errors.confirmPassword}
                  </motion.p>
                )}
              </motion.div>

              {/* Submit Button */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
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
                      Creating Account...
                    </span>
                  ) : (
                    "Sign Up"
                  )}
                </motion.button>
              </motion.div>

              {/* Divider */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.9 }}
                className="flex items-center my-6"
              >
                <hr className="flex-grow border-gray-600/50" />
                <span className="text-gray-400 px-3 text-sm">or sign up with</span>
                <hr className="flex-grow border-gray-600/50" />
              </motion.div>

              {/* Social Login Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.0 }}
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
            </form>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.1 }}
              className="text-center text-gray-400 mt-6 text-sm"
            >
              Already have an account?{" "}
              <button
                onClick={() => navigate("/login")}
                className="text-purple-300 hover:text-purple-200 font-medium focus:outline-none transition-colors"
              >
                Log in
              </button>
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default SignUp;