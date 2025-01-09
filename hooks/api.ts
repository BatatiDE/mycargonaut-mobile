import AsyncStorage from '@react-native-async-storage/async-storage';
const API_BASE_URL = "http://localhost:8080/api"; // Replace it later with config

interface FetchOptions {
    method?: string;
    headers?: Record<string, string>;
    body?: string;
}

/**
 * Helper to retrieve the token from AsyncStorage
 */
const getToken = async () => {
    try {
        const token = await AsyncStorage.getItem("token");
        return token;
    } catch (err) {
        console.error("Error retrieving token:", err);
        return null;
    }
};

/**
 * Helper to store the token in AsyncStorage
 */
const setToken = async (token: string) => {
    try {
        await AsyncStorage.setItem("token", token);
    } catch (err) {
        console.error("Error storing token:", err);
    }
};

/**
 * Helper to remove the token from AsyncStorage
 */
const removeToken = async () => {
    try {
        await AsyncStorage.removeItem("token");
    } catch (err) {
        console.error("Error removing token:", err);
    }
};

/**
 * Fetch data from the API
 * @param endpoint - The API endpoint
 * @param options - Fetch options (method, headers, body)
 */
export const fetchData = async (endpoint: string, options: FetchOptions = {}) => {
    try {
        const token = await getToken();

        const response = await fetch(`${API_BASE_URL}/${endpoint}`, {
            ...options,
            headers: {
                "Content-Type": "application/json",
                Authorization: token ? `Bearer ${token}` : "",
                ...(options.headers || {}),
            },
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
        }

        return response.json();
    } catch (error) {
        console.error("API fetch error:", error);
        throw error;
    }
};

/**
 * API Function: Login User
 * @param email - User email
 * @param password - User password
 */
export const login = async (email: string, password: string) => {
    const response = await fetchData("/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
    });

    if (response.token) {
        await setToken(response.token); // Save token to AsyncStorage
    }

    return response;
};

/**
 * API Function: Logout User
 */
export const logoutUser = async () => {
    await removeToken(); // Remove token from AsyncStorage
};

/**
 * API Function: Get User Profile
 */
export const getUserProfile = async () => {
    return await fetchData("/profile");
};

/**
 * API Function: Register User
 * @param userData - User details for registration
 */
export const registerUser = async (userData: Record<string, any>) => {
    return await fetchData("/register", {
        method: "POST",
        body: JSON.stringify(userData),
    });
};

