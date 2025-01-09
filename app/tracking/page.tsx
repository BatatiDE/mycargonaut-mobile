// Refactored TrackingPage.tsx for React Native/Expo
import React from "react";
import { View, Text, StyleSheet } from "react-native";

const TrackingPage = () => {
    return (
        <View style={styles.container}>
            <View style={styles.card}>
                <Text style={styles.title}>Track Your Ride/Freight</Text>
                <Text style={styles.subtitle}>Real-time tracking coming soon...</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f8f9fa",
        padding: 20,
    },
    card: {
        backgroundColor: "#fff",
        padding: 20,
        borderRadius: 8,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 10,
        width: "100%",
        maxWidth: 400,
        alignItems: "center",
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#333",
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 16,
        color: "#555",
        textAlign: "center",
    },
});

export default TrackingPage;