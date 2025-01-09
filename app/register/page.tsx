// Refactored Register.tsx for React Native/Expo
import React, { useState } from "react";
import {
    View,
    Text,
    TextInput,
    Button,
    StyleSheet,
    Alert,
    TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { registerUser } from "@/hooks/api";
import { getErrorMessage } from "@/hooks/errorHandler";

export default function Register() {
    const navigation = useNavigation();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [birthdate, setBirthdate] = useState("");

    const handleRegister = async () => {
        // Validate user age
        const today = new Date();
        const birthDate = new Date(birthdate);
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
            age -= 1;
        }

        if (age < 18) {
            Alert.alert("Error", "You must be at least 18 years old to register.");
            return;
        }

        try {
            const response = await registerUser({
                email,
                password,
            });

            Alert.alert("Success", "Registration successful!", [
                {
                    text: "OK",
                    onPress: () => navigation.navigate("LoginPage"),
                },
            ]);
        } catch (err) {
            const errorMessage = getErrorMessage(err);
            console.error("Register error:", errorMessage);
            Alert.alert("Error", errorMessage || "Registration failed.");
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.formContainer}>
                <Text style={styles.title}>Create an Account</Text>
                <TextInput
                    style={styles.input}
                    value={email}
                    onChangeText={setEmail}
                    placeholder="Enter your email"
                    keyboardType="email-address"
                />
                <TextInput
                    style={styles.input}
                    value={password}
                    onChangeText={setPassword}
                    placeholder="Enter your password"
                    secureTextEntry
                />
                <TextInput
                    style={styles.input}
                    value={birthdate}
                    onChangeText={setBirthdate}
                    placeholder="Enter your birthdate (YYYY-MM-DD)"
                />

                <Button title="Register" onPress={handleRegister} />

                <Text style={styles.footerText}>
                    Already have an account?{' '}
                    <TouchableOpacity onPress={() => navigation.navigate("LoginPage")}>
                        <Text style={styles.link}>Log in</Text>
                    </TouchableOpacity>
                </Text>
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
    footerText: {
        fontSize: 14,
        textAlign: "center",
        marginTop: 20,
    },
    link: {
        color: "#007bff",
        textDecorationLine: "underline",
    },
});
