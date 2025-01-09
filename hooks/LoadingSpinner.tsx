// Refactored LoadingSpinner.tsx for React Native/Expo
import React from "react";
import { View, ActivityIndicator, StyleSheet } from "react-native";

const LoadingSpinner = () => (
    <View style={styles.container}>
        <ActivityIndicator size="large" color="#007bff" />
    </View>
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f8f9fa", // Optional: Background color
    },
});

export default LoadingSpinner;
