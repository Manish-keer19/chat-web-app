import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { profileService } from "../Service/profileService";
import { motion } from "framer-motion";
// import toast from "react-hot-toast";
import Navbar from "./Navbar";
import { profileService } from "../Service/profileService";
import { setUser } from "../features/User/UserSlice";
import toast from "react-hot-toast";

// interface UserProfile {
//   id?: string;
//   bio: string;
//   pronoun: string;
//   gender: string;
//   profession: string;
// }

const Profile: React.FC = () => {
  const dispatch = useDispatch();
  // const token = useSelector((state: any) => state.User.token);
  const userData = useSelector((state: any) => state.User.userdata);
  const token = useSelector((state: any) => state.User.token);

  const [profileDetail, setProfileDetail] = useState(userData.profileDetail);

  const [bio, setBio] = useState<string>("");
  const [pronoun, setPronoun] = useState<string>("");
  const [gender, setGender] = useState<string>("");
  const [profession, setProfession] = useState<string>("");
  const [selectedFile, setSelectedFile] = useState<Blob | null>(null);

  const [isEditing, setIsEditing] = useState(false);

  const handleEditProfile = async () => {
    if (!bio || !pronoun || !gender || !profession || !selectedFile) {
      toast.error("Please fill all the fields");
      return;
    }
    const data = {
      bio,
      pronoun,
      gender,
      profession,
    };
    const formData = new FormData();
    formData.append("userAdditionalDetail", JSON.stringify(data));
    if (selectedFile) {
      formData.append("file", selectedFile);
    }

    try {
      const res = await profileService.editProfile(formData, token);
      console.log("res is ", res);
      if (res.success) {
        console.log("Profile updated successfully");
        console.log("res is ", res);
        dispatch(setUser(res.data.userData));
        setProfileDetail(res.data.userData.profileDetail);
        setIsEditing(false);
      }
    } catch (error) {
      console.log("Error in editing profile: ", error);
    }
  };

  const handleFileSelect = (e: any) => {
    const file = e.target.files[0];
    console.log(file);
    setSelectedFile(file);
  };

  return (
    <>
      <Navbar />
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
                <label className="text-purple-300 block text-sm sm:text-base cursor-pointer">
                  <input
                    type="file"
                    id="file"
                    className="hidden"
                    accept="image/*"
                    onChange={(e) => handleFileSelect(e)}
                    disabled={!isEditing}
                  />
                  {selectedFile ? (
                    <img
                      src={URL.createObjectURL(selectedFile)}
                      alt="Profile"
                      className="w-24 h-24 sm:w-32 sm:h-32 rounded-full shadow-lg object-cover border-2 border-purple-500"
                    />
                  ) : (
                    <img
                      src={userData?.profilePic}
                      alt="Profile"
                      className="w-24 h-24 sm:w-32 sm:h-32 rounded-full shadow-lg object-cover border-2 border-purple-500"
                    />
                  )}
                </label>
                <div className="absolute -bottom-2 -right-2 bg-green-500 w-6 h-6 rounded-full border-2 border-white flex items-center justify-center">
                  <span className="text-xs">✓</span>
                </div>
              </div>
              <div className="text-center sm:text-left">
                <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  {userData?.userName}'s Profile
                </h1>
                <p className="text-gray-400 mt-2 text-sm sm:text-base">
                  Manage your profile information
                </p>
              </div>
            </div>

            {/* Profile Form */}
            <div className="space-y-2">
              <label className="text-purple-300 block text-sm sm:text-base">
                Bio
              </label>
              <textarea
                name="bio"
                value={!isEditing ? profileDetail?.bio : bio}
                onChange={(e) => setBio(e.target.value)}
                disabled={!isEditing}
                className="w-full bg-gray-800 bg-opacity-50 rounded-lg p-2 sm:p-3 text-sm sm:text-base text-white border border-purple-500 border-opacity-30 focus:border-purple-400 focus:ring-2 focus:ring-purple-400 transition-all disabled:opacity-50"
                rows={4}
                placeholder="Tell us about yourself..."
              />
            </div>

            {/* Other Fields */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              <div className="space-y-2">
                <label className="text-purple-300 block text-sm sm:text-base">
                  Pronouns
                </label>
                <select
                  name="pronoun"
                  value={!isEditing ? profileDetail?.pronoun : pronoun}
                  onChange={(e) => setPronoun(e.target.value)}
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
                <label className="text-purple-300 block text-sm sm:text-base">
                  Gender
                </label>
                <select
                  name="gender"
                  value={!isEditing ? profileDetail?.gender : gender}
                  onChange={(e) => setGender(e.target.value)}
                  disabled={!isEditing}
                  className="w-full bg-gray-800 bg-opacity-50 rounded-lg p-2 sm:p-3 text-sm sm:text-base text-white border border-purple-500 border-opacity-30 focus:border-purple-400 focus:ring-2 focus:ring-purple-400 transition-all disabled:opacity-50"
                >
                  <option value="">Select gender</option>
                  <option value="male">Male</option>
                  <option value="Non-binary">Non-binary</option>
                  <option value="female">Female</option>
                  <option value="non-binary">Non-binary</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div className="space-y-2 sm:col-span-2">
                <label className="text-purple-300 block text-sm sm:text-base">
                  Profession
                </label>
                <input
                  type="text"
                  name="profession"
                  value={!isEditing ? profileDetail?.profession : profession}
                  onChange={(e) => setProfession(e.target.value)}
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
                    onClick={handleEditProfile}
                    className="w-full sm:w-auto px-6 py-2 bg-purple-600 rounded-lg text-white hover:bg-purple-500 transition-colors duration-300 text-sm sm:text-base"
                  >
                    Save Changes
                  </motion.button>
                </>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default Profile;
