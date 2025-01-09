// Refactored LandingPage.tsx for React Native/Expo
import React, { useState } from "react";
import {
    View,
    Text,
    TextInput,
    Button,
    StyleSheet,
    TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "@/hooks/AuthContext";

export default function LandingPage() {
    const [from, setFrom] = useState("");
    const [to, setTo] = useState("");
    const [date, setDate] = useState("");
    const navigation = useNavigation();
    const { user } = useAuth(); // Get the `user` from the AuthContext


    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Welcome to MyCargonaut</Text>
                <Text style={styles.subtitle}>
                    Find or offer rides and freight-sharing solutions quickly and effortlessly.
                </Text>
            </View>

            <View style={styles.formContainer}>
                <Text style={styles.formTitle}>Quick Search</Text>
                <View style={styles.form}>
                    <Text style={styles.label}>From</Text>
                    <TextInput
                        style={styles.input}
                        value={from}
                        onChangeText={setFrom}
                        placeholder="Enter starting location"
                    />

                    <Text style={styles.label}>To</Text>
                    <TextInput
                        style={styles.input}
                        value={to}
                        onChangeText={setTo}
                        placeholder="Enter destination"
                    />

                    <Text style={styles.label}>Date</Text>
                    <TextInput
                        style={styles.input}
                        value={date}
                        onChangeText={setDate}
                        placeholder="Enter date"
                    />

                </View>
            </View>

            <View style={styles.footer}>
                <TouchableOpacity
                    onPress={() => {
                        if (user) {
                        } else {
                        }
                    }}
                >
                    <Text style={styles.footerLink}>
                        {user ? "Go to Profile" : "Get Started"}
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f8f9fa",
        padding: 20,
    },
    header: {
        alignItems: "center",
        marginBottom: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#333",
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 16,
        color: "#555",
        textAlign: "center",
    },
    formContainer: {
        backgroundColor: "#fff",
        padding: 20,
        borderRadius: 8,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 10,
        width: "100%",
        maxWidth: 400,
    },
    formTitle: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#333",
        marginBottom: 10,
    },
    form: {
        width: "100%",
    },
    label: {
        fontSize: 14,
        color: "#555",
        marginBottom: 5,
    },
    input: {
        height: 40,
        borderColor: "#ccc",
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 15,
        paddingHorizontal: 10,
    },
    footer: {
        marginTop: 20,
    },
    footerLink: {
        color: "#007bff",
        textDecorationLine: "underline",
        fontSize: 16,
    },
});