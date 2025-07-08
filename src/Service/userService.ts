import toast from "react-hot-toast";
import axiosInstance from "./axiosInstance";

class UserService {
  public async getUsersData(token: any) {
    try {
      console.log("tokne in userservice", token);
      const res = await axiosInstance.get("/user/get-all-usersdata", {
        headers: { Authorization: `Bearer ${token}` },
      });

      console.log("res.data in user data", res.data);
      if (res.data && res.data.success) {
        toast.success("Users data fetched successfully");
        return res.data;
      }
    } catch (error) {
      toast.error("could not get the user data");
      console.log(error);
      console.log("could not get the user data", error);
      return null;
    }
  }
  public async getUserMessages(token: any, userId: any) {
    try {
      const res = await axiosInstance.get(`/message/get-messages/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log("res.data in user messages", res.data);
      if (res.data && res.data.success) {
        // console.log("res.data in user messages", res.data);
        // toast.success("User messages fetched successfully");
        // toast.success("User messages fetched successfully");
        return res.data;
      }
    } catch (error) {
      toast.error("could not get the user messages");
      toast.error("could not get the user messages");
      console.log(error);
      console.log("could not get the user messages", error);
      return null;
    }
  }

  public async SendMedia(token: any, data: any) {
    const toastId = toast.loading("Sending media...");
    try {
      const res = await axiosInstance.post(
        `/message/create-message-with-media-without-message`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (res.data && res.data.success) {
        toast.success("Media sent successfully");
        toast.dismiss(toastId);
        console.log("res.data in send media", res.data);
        toast.success("Media sent successfully");
        return res.data;
      }
    } catch (error) {
      toast.error("could not send the media");
      toast.dismiss(toastId);
      toast.error("could not send the media");
      console.log(error);
      console.log("could not send the media", error);
      return null;
    }
  }

  public async getOauthUserData(token: any,userId:String) {
    
    const toastId = toast.loading("Getting oauth user data...");
    try {
      const res = await axiosInstance.get(`/user/get-oauth-user-data/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log("res.data in oauth user data", res.data);
      if (res.data && res.data.success) {
        toast.success("Oauth user data fetched successfully");
        toast.dismiss(toastId);
        return res.data;
      } else {
        toast.error("could not get the oauth user data");
        toast.dismiss(toastId);
        return null;
      }
    } catch (error) {
      toast.error("could not get the oauth user data");
      toast.dismiss(toastId);
      console.log(error);
      console.log("could not get the oauth user data", error);
      return null;
    }

  }
}

export const userService = new UserService();
