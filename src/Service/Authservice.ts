import toast from "react-hot-toast";
import axiosInstance from "./axiosInstance";

class AuthService {
  public async login(data: any) {
    const toastId = toast.loading("Logging in...");
    try {
      console.log("Data in login is ", data);

      const res = await axiosInstance.post("/auth/login", data);
      console.log("Response data in login is ", res.data); // Corrected to log response data

      if (res.data && res.data.success) {
        toast.success("Login successful");
        toast.dismiss(toastId);

        console.log("Login successful: ", res.data);
        return res.data; // Return response data if login is successful
      }
      throw new Error("Login failed"); // Throw an error if no success field in response
    } catch (error) {
      toast.error("Login failed");
      toast.dismiss(toastId);
      console.log("Error in login: ", error);
      throw error; // Optional: re-throw error for further handling in UI
    }
  }

  public async signUp(data: any) {
    const toastId = toast.loading("Signing up...");
    try {
      const res = await axiosInstance.post("/auth/signup", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("Response data in signup: ", res.data);

      if (res.data && res.data.success) {
        toast.success("Sign-up successful");
        toast.dismiss(toastId);
        return res.data; // Return response data if sign-up is successful
      }
      throw new Error("Sign-up failed"); // Throw an error if no success field in response
    } catch (error) {
      toast.error("Sign-up failed");
      toast.dismiss(toastId);
      console.log("Error in signup: ", error);
      throw error; // Optional: re-throw error for further handling in UI
    }
  }

  public async getOauth2UserData() {
    const toastId = toast.loading("Getting oauth2 user data...");
    try {
      const res = await axiosInstance.get("/oauth2/success", {
        withCredentials: true,
      });
      console.log("res.data in oauth2 user data", res.data);
      if (res.data && res.data.success) {
        toast.success("Oauth2 user data fetched successfully");
        toast.dismiss(toastId);
        return res.data;
      } else {
        toast.dismiss(toastId);
        toast.error("could not get the oauth2 user data");
        return null;
      }
    } catch (error) {
      toast.dismiss(toastId);
      toast.error("could not get the oauth2 user data");
    }
  }
}

export const authService = new AuthService();
