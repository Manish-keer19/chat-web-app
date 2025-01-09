import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { FaUser, FaEnvelope, FaLock, FaImage } from 'react-icons/fa';

const SignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    profilePic: null as File | null,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFormData(prev => ({
        ...prev,
        profilePic: file
      }));
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match!');
      return;
    }

    setIsLoading(true);
    try {
      // Add your signup logic here
      toast.success('Account created successfully!');
      navigate('/login');
    } catch (error) {
      toast.error('Failed to create account');
    } finally {
      setIsLoading(false);
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
              Create Account
            </h1>
            <p className="text-gray-400 mt-2">Join our community today</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Profile Picture Upload */}
            <div className="flex justify-center mb-6">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="relative"
              >
                <div className="w-24 h-24 rounded-full border-2 border-purple-500 overflow-hidden">
                  {previewUrl ? (
                    <img
                      src={previewUrl}
                      alt="Profile Preview"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-800 flex items-center justify-center">
                      <FaUser className="w-8 h-8 text-gray-400" />
                    </div>
                  )}
                </div>
                <label
                  htmlFor="profilePic"
                  className="absolute bottom-0 right-0 bg-purple-500 p-2 rounded-full cursor-pointer hover:bg-purple-600 transition-colors"
                >
                  <FaImage className="w-4 h-4" />
                </label>
                <input
                  type="file"
                  id="profilePic"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </motion.div>
            </div>

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
                value={formData.username}
                onChange={handleInputChange}
                className="w-full pl-10 pr-4 py-3 bg-gray-800/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-white placeholder-gray-400"
              />
            </div>

            {/* Email Input */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaEnvelope className="text-gray-400" />
              </div>
              <input
                type="email"
                name="email"
                required
                placeholder="Email address"
                value={formData.email}
                onChange={handleInputChange}
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
                value={formData.password}
                onChange={handleInputChange}
                className="w-full pl-10 pr-4 py-3 bg-gray-800/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-white placeholder-gray-400"
              />
            </div>

            {/* Confirm Password Input */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaLock className="text-gray-400" />
              </div>
              <input
                type="password"
                name="confirmPassword"
                required
                placeholder="Confirm password"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                className="w-full pl-10 pr-4 py-3 bg-gray-800/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-white placeholder-gray-400"
              />
            </div>

            {/* Submit Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={isLoading}
              className="w-full py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg font-semibold hover:from-purple-600 hover:to-pink-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-900"
            >
              {isLoading ? 'Creating Account...' : 'Sign Up'}
            </motion.button>

            {/* Login Link */}
            <p className="text-center text-gray-400">
              Already have an account?{' '}
              <motion.button
                whileHover={{ scale: 1.05 }}
                onClick={() => navigate('/login')}
                className="text-purple-400 hover:text-purple-300 font-medium focus:outline-none"
              >
                Log in
              </motion.button>
            </p>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default SignUp;
