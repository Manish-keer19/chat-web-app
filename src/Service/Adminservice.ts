// src/Service/AdminService.ts
import toast from "react-hot-toast";
import axiosInstance from "./axiosInstance";

class AdminService {
    public async getAllUsers(token: string, adminId: string) {
        try {
            const res = await axiosInstance.get("/admin/users", {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "X-User-Id": adminId
                }
            });

            if (res.data && res.data.success) {
                return res.data.data;
            }
            throw new Error("Failed to fetch users");
        } catch (error) {
            toast.error("Could not get users data");
            console.error("Error fetching users:", error);
            throw error;
        }
    }

    public async getUserMessages(token: string, userId: string, adminId: string) {
        try {
            const res = await axiosInstance.get(`/admin/users/${userId}/messages`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "X-User-Id": adminId
                }
            });

            if (res.data && res.data.success) {
                return res.data.data;
            }
            throw new Error("Failed to fetch user messages");
        } catch (error) {
            toast.error("Could not get user messages");
            console.error("Error fetching messages:", error);
            throw error;
        }
    }

    public async deleteUser(token: string, userId: string, adminId: string) {
        const toastId = toast.loading("Deleting user...");
        try {
            const res = await axiosInstance.delete(`/admin/users/${userId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "X-User-Id": adminId
                }
            });

            if (res.data && res.data.success) {
                toast.success("User deleted successfully", { id: toastId });
                return true;
            }
            throw new Error("Failed to delete user");
        } catch (error) {
            toast.error("Could not delete user", { id: toastId });
            console.error("Error deleting user:", error);
            throw error;
        }
    }

  

    async getUserDetails(token: string, userId: string,adminId: string) {
        try {
            const res = await axiosInstance.get(`/admin/users/${userId}`, {
               headers: {
                    Authorization: `Bearer ${token}`,
                    "X-User-Id": adminId
                },
            });

            if (res.data && res.data.success) {
                return res.data.data;
            }
            throw new Error("Failed to fetch user details");
        } catch (error) {
            toast.error("Could not get user details");
            console.error("Error fetching user details:", error);
            throw error;
        }
    }
}

export const adminService = new AdminService();