// Refactored AuthGuard.tsx for React Native/Expo
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { ActivityIndicator, View, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const AuthGuard: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const navigation = useNavigation();

    useEffect(() => {
        const checkAuthentication = async () => {
            try {
                const token = await AsyncStorage.getItem("authToken");
                if (token) {
                    setIsAuthenticated(true);
                } else {
                    navigation.navigate("Login");
                }
            } catch (error) {
                console.error("Error checking authentication:", error);
            } finally {
                setIsLoading(false);
            }
        };

        checkAuthentication();
    }, [navigation]);

    if (isLoading) {
        return (
            <View style={styles.loaderContainer}>
                <ActivityIndicator size="large" color="#007bff" />
            </View>
        );
    }

    if (!isAuthenticated) {
        return null; // Ensure no content renders before redirect
    }

    return <>{children}</>;
};

const styles = StyleSheet.create({
    loaderContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f8f9fa",
    },
});

export default AuthGuard;
