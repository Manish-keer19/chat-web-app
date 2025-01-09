import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { profileService } from '../Service/profileService';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import Navbar from './Navbar';

interface UserProfile {
    id?: string;
    bio: string;
    pronoun: string;
    gender: string;
    profession: string;
}

const Profile: React.FC = () => {
    const token = useSelector((state: any) => state.User.token);
    const userData = useSelector((state: any) => state.User.userdata);
    
    const [profile, setProfile] = useState<UserProfile>({
        bio: '',
        pronoun: '',
        gender: '',
        profession: ''
    });

    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        fetchProfile();
    }, []);

    const fetchProfile = async () => {
        try {
            const data = await profileService.getProfile(token);
            setProfile(data);
        } catch (error) {
            console.error('Error fetching profile:', error);
            toast.error('Failed to load profile');
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setProfile(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (profile.id) {
                await profileService.updateProfile(profile, token);
                toast.success('Profile updated successfully!');
            } else {
                await profileService.addProfile(profile, token);
                toast.success('Profile created successfully!');
            }
            setIsEditing(false);
        } catch (error) {
            console.error('Error saving profile:', error);
            toast.error('Failed to save profile');
        }
    };

    return (
        <>
      
            <Navbar/>
        <div className="min-h-screen bg-gradient-to-br from-purple-900 via-gray-900 to-black text-white p-4 sm:p-6 md:p-8">
            <div className="max-w-4xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-opacity-20 backdrop-blur-xl bg-gray-900 rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 shadow-[0_0_40px_rgba(139,92,246,0.2)] border border-opacity-30 border-purple-500"
                >
                    {/* Profile Header */}
                    <div className="flex flex-col sm:flex-row items-center sm:space-x-6 mb-6 sm:mb-8">
                        <div className="relative mb-4 sm:mb-0">
                            <img
                                src={userData?.profilePic}
                                alt="Profile"
                                className="w-24 h-24 sm:w-32 sm:h-32 rounded-full shadow-lg object-cover border-2 border-purple-500"
                            />
                            <div className="absolute -bottom-2 -right-2 bg-green-500 w-6 h-6 rounded-full border-2 border-white flex items-center justify-center">
                                <span className="text-xs">✓</span>
                            </div>
                        </div>
                        <div className="text-center sm:text-left">
                            <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                                {userData?.userName}'s Profile
                            </h1>
                            <p className="text-gray-400 mt-2 text-sm sm:text-base">Manage your profile information</p>
                        </div>
                    </div>

                    {/* Profile Form */}
                    <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                        {/* Bio Section */}
                        <div className="space-y-2">
                            <label className="text-purple-300 block text-sm sm:text-base">Bio</label>
                            <textarea
                                name="bio"
                                value={profile.bio}
                                onChange={handleInputChange}
                                disabled={!isEditing}
                                className="w-full bg-gray-800 bg-opacity-50 rounded-lg p-2 sm:p-3 text-sm sm:text-base text-white border border-purple-500 border-opacity-30 focus:border-purple-400 focus:ring-2 focus:ring-purple-400 transition-all disabled:opacity-50"
                                rows={4}
                                placeholder="Tell us about yourself..."
                            />
                        </div>

                        {/* Other Fields */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                            <div className="space-y-2">
                                <label className="text-purple-300 block text-sm sm:text-base">Pronouns</label>
                                <select
                                    name="pronoun"
                                    value={profile.pronoun}
                                    onChange={handleInputChange}
                                    disabled={!isEditing}
                                    className="w-full bg-gray-800 bg-opacity-50 rounded-lg p-2 sm:p-3 text-sm sm:text-base text-white border border-purple-500 border-opacity-30 focus:border-purple-400 focus:ring-2 focus:ring-purple-400 transition-all disabled:opacity-50"
                                >
                                    <option value="">Select pronouns</option>
                                    <option value="he/him">He/Him</option>
                                    <option value="she/her">She/Her</option>
                                    <option value="they/them">They/Them</option>
                                    <option value="other">Other</option>
                                </select>
                            </div>

                            <div className="space-y-2">
                                <label className="text-purple-300 block text-sm sm:text-base">Gender</label>
                                <select
                                    name="gender"
                                    value={profile.gender}
                                    onChange={handleInputChange}
                                    disabled={!isEditing}
                                    className="w-full bg-gray-800 bg-opacity-50 rounded-lg p-2 sm:p-3 text-sm sm:text-base text-white border border-purple-500 border-opacity-30 focus:border-purple-400 focus:ring-2 focus:ring-purple-400 transition-all disabled:opacity-50"
                                >
                                    <option value="">Select gender</option>
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                    <option value="non-binary">Non-binary</option>
                                    <option value="other">Other</option>
                                </select>
                            </div>

                            <div className="space-y-2 sm:col-span-2">
                                <label className="text-purple-300 block text-sm sm:text-base">Profession</label>
                                <input
                                    type="text"
                                    name="profession"
                                    value={profile.profession}
                                    onChange={handleInputChange}
                                    disabled={!isEditing}
                                    className="w-full bg-gray-800 bg-opacity-50 rounded-lg p-2 sm:p-3 text-sm sm:text-base text-white border border-purple-500 border-opacity-30 focus:border-purple-400 focus:ring-2 focus:ring-purple-400 transition-all disabled:opacity-50"
                                    placeholder="What do you do?"
                                />
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-4 mt-6 sm:mt-8">
                            {!isEditing ? (
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    type="button"
                                    onClick={() => setIsEditing(true)}
                                    className="w-full sm:w-auto px-6 py-2 bg-purple-600 rounded-lg text-white hover:bg-purple-500 transition-colors duration-300 text-sm sm:text-base"
                                >
                                    Edit Profile
                                </motion.button>
                            ) : (
                                <>
                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        type="button"
                                        onClick={() => setIsEditing(false)}
                                        className="w-full sm:w-auto px-6 py-2 bg-gray-600 rounded-lg text-white hover:bg-gray-500 transition-colors duration-300 text-sm sm:text-base"
                                    >
                                        Cancel
                                    </motion.button>
                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        type="submit"
                                        className="w-full sm:w-auto px-6 py-2 bg-purple-600 rounded-lg text-white hover:bg-purple-500 transition-colors duration-300 text-sm sm:text-base"
                                    >
                                        Save Changes
                                    </motion.button>
                                </>
                            )}
                        </div>
                    </form>
                </motion.div>
            </div>
        </div>
        </>
    );
};

export default Profile;
