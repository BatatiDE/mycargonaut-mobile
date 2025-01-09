// Refactored ProfilePage.tsx for React Native/Expo
import React from "react";
import { View, StyleSheet } from "react-native";
import AuthGuard from "@/hooks/AuthGuard";
import ProfileForm from "./ProfileForm";

export default function ProfilePage() {
    return (
        <AuthGuard>
            <View style={styles.container}>
                <ProfileForm />
            </View>
        </AuthGuard>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f8f9fa",
    },
});
