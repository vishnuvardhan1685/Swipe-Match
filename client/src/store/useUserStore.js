import toast from "react-hot-toast";
import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import { useAuthStore } from "./useAuthStore";

export const useUserStore = create((set) => ({
    loading: false,

    updateProfile: async (data) => {
        try {
            set({ loading: true });
            const res = await axiosInstance.put("/users/update",data);
            useAuthStore.getState().setAuthUser(res.data.user);
            toast.success("Profile updated successfully");
        } catch (error) {
            const message =
                error.response?.data?.message ||
                error.message ||
                "Something went wrong";
            toast.error(message);
        } finally {
            set({ loading: false });
        }
    }
}))