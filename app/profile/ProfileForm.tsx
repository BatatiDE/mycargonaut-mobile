// Refactored ProfileForm.tsx for React Native/Expo
import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    TextInput,
    Button,
    StyleSheet,
    Alert,
    ActivityIndicator,
} from "react-native";
import { profileApi } from "@/hooks/api"; // API functions
import { getErrorMessage } from "@/hooks/errorHandler";
import { useAuth } from "@/hooks/AuthContext";

export default function ProfileForm() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const { refreshUser } = useAuth();

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const userData = await profileApi.fetchProfile();
                setName(userData.name || "");
                setEmail(userData.email || "");
                setPhone(userData.phone || "");
            } catch (err) {
                const errorMessage = getErrorMessage(err);
                console.error("Error fetching profile:", errorMessage);
                Alert.alert("Error", errorMessage);
            } finally {
                setIsLoading(false);
            }
        };

        fetchUserProfile();
    }, []);

    const handleSaveChanges = async () => {
        try {
            await profileApi.updateProfile({ name, phone });
            Alert.alert("Success", "Profile updated successfully.");

            // Refresh user data in AuthContext
            await refreshUser();
        } catch (err) {
            const errorMessage = getErrorMessage(err);
            Alert.alert("Error", errorMessage);
        }
    };

    if (isLoading) {
        return (
            <View style={styles.loaderContainer}>
                <ActivityIndicator size="large" color="#007bff" />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Edit Profile</Text>
            <TextInput
                style={styles.input}
                value={name}
                onChangeText={setName}
                placeholder="Enter your name"
            />
            <TextInput
                style={styles.input}
                value={email}
                editable={false} // Email is not editable
                placeholder="Email"
            />
            <TextInput
                style={styles.input}
                value={phone}
                onChangeText={setPhone}
                placeholder="Enter your phone"
            />
            <Button title="Save Changes" onPress={handleSaveChanges} />
        </View>
    );
}

const styles = StyleSheet.create({
    loaderContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f8f9fa",
    },
    container: {
        backgroundColor: "#fff",
        padding: 20,
        borderRadius: 8,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 10,
        width: "100%",
        maxWidth: 400,
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#333",
        textAlign: "center",
        marginBottom: 20,
    },
    input: {
        height: 40,
        borderColor: "#ccc",
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 15,
        paddingHorizontal: 10,
    },
});
