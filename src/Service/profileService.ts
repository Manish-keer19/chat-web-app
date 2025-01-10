import toast from "react-hot-toast";
import axiosInstance from "./axiosInstance";

// interface UserProfile {
//     id?: string;
//     bio: string;
//     pronoun: string;
//     gender: string;
//     profession: string;
// }

class ProfileService {
  public async editProfile(profiledata: any, token: string) {
    const toasId = toast.loading("Updating Profile...");
    try {
      const res = await axiosInstance.post(
        "/profile/add-profile",
        profiledata,
        {
          headers: {
           Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Response from profile", res);

      if (res.data.success) {
        toast.success("Profile Updated Successfully", { id: toasId });
        return res.data;
      }
    } catch (error) {
      toast.error("Could not update profile", { id: toasId });
      console.log(error);
      throw error;
    }
  }
}

export const profileService = new ProfileService();
