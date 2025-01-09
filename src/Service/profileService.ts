import axios from 'axios';

const BASE_URL = 'http://localhost:8080/profile';

interface UserProfile {
    id?: string;
    bio: string;
    pronoun: string;
    gender: string;
    profession: string;
}

export const profileService = {
    addProfile: async (profileData: UserProfile, token: string) => {
        try {
            const response = await axios.post(`${BASE_URL}/add-profile`, profileData, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    updateProfile: async (profileData: UserProfile, token: string) => {
        try {
            const response = await axios.put(`${BASE_URL}/update`, profileData, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    getProfile: async (token: string) => {
        try {
            const response = await axios.get(`${BASE_URL}/get`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    deleteProfile: async (token: string) => {
        try {
            const response = await axios.delete(`${BASE_URL}/delete`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            return response.data;
        } catch (error) {
            throw error;
        }
    }
};
