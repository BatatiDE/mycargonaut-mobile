// Refactored AuthContext.tsx for React Native/Expo
import React, {
    createContext,
    useContext,
    useState,
    useEffect,
    ReactNode,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage"; // AsyncStorage for token and user
import { useNavigation } from "@react-navigation/native"; // Replace Next.js router
import { authApi, profileApi } from "@/hooks/api"; // Adjust the import to your project structure

interface User {
    id: string;
    email: string;
    name?: string;
    role?: string;
}

interface AuthContextType {
    token: string | null;
    user: User | null;
    setToken: (token: string | null) => void;
    setUser: (user: User | null) => void;
    login: (email: string, password: string) => Promise<void>;
    logout: () => void;
    refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [token, setToken] = useState<string | null>(null);
    const [user, setUser] = useState<User | null>(null);
    const navigation = useNavigation(); // Replace Next.js router

    // Load token and user from AsyncStorage on app start
    useEffect(() => {
        const loadAuthData = async () => {
            try {
                const storedToken = await AsyncStorage.getItem("authToken");
                const storedUser = await AsyncStorage.getItem("authUser");

                if (storedToken) setToken(storedToken);
                if (storedUser) setUser(JSON.parse(storedUser));
            } catch (error) {
                console.error("Failed to load auth data from storage:", error);
            }
        };

        loadAuthData();
    }, []);

    // Login function
    const login = async (email: string, password: string) => {
        const { token, user } = await authApi.login({ email, password }); // Use authApi.login
        setToken(token);
        setUser(user);

        await AsyncStorage.setItem("authToken", token);
        await AsyncStorage.setItem("authUser", JSON.stringify(user));
    };

    // Logout function
    const logout = async () => {
        setToken(null);
        setUser(null);
        await AsyncStorage.removeItem("authToken");
        await AsyncStorage.removeItem("authUser");
        navigation.navigate("Login"); // Redirect to the login screen
    };

    // Refresh user profile
    const refreshUser = async () => {
        try {
            const updatedUser = await profileApi.fetchProfile();
            setUser(updatedUser);
            await AsyncStorage.setItem("authUser", JSON.stringify(updatedUser));
        } catch (error) {
            console.error("Failed to refresh user data:", error);
        }
    };

    return (
        <AuthContext.Provider
            value={{
                token,
                user,
                setToken,
                setUser,
                login,
                logout,
                refreshUser,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};
