// Refactored Navbar.tsx for React Native/Expo
import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../hooks/AuthContext";

const Navbar = () => {
    const { user, logout } = useAuth(); // Access the authenticated user and logout
    const [isMenuOpen, setMenuOpen] = useState(false);
    const navigation = useNavigation();

    const navItems = [
        { name: "Home", path: "Home" },
        { name: "Trips", path: "Trips" },
        { name: "Tracking", path: "Tracking" },
        { name: "Profile", path: "Profile" },
    ];

    return (
        <View style={styles.navbar}>
            {/* Logo */}
            <TouchableOpacity onPress={() => navigation.navigate("Home")}>
                <Text style={styles.logo}>MyCargonaut</Text>
            </TouchableOpacity>

            {/* Toggle Menu for Mobile */}
            <TouchableOpacity
                style={styles.menuButton}
                onPress={() => setMenuOpen(!isMenuOpen)}
            >
                <Text style={styles.menuIcon}>☰</Text>
            </TouchableOpacity>

            {/* Navigation Links */}
            {isMenuOpen && (
                <View style={styles.menuItems}>
                    {navItems.map((item) => (
                        <TouchableOpacity
                            key={item.name}
                            onPress={() => navigation.navigate(item.path)}
                        >
                            <Text style={styles.menuItem}>{item.name}</Text>
                        </TouchableOpacity>
                    ))}

                    {/* Dashboard Button - Conditional Rendering */}
                    {user && (
                        <TouchableOpacity
                            onPress={() => navigation.navigate("Dashboard")}
                        >
                            <Text style={styles.menuItem}>Dashboard</Text>
                        </TouchableOpacity>
                    )}

                    {/* Authentication Links */}
                    {user ? (
                        <>
                            <Text style={styles.welcomeMessage}>
                                Welcome, {user.name || user.email}
                            </Text>
                            <TouchableOpacity
                                onPress={logout}
                                style={styles.logoutButton}
                            >
                                <Text style={styles.logoutText}>Logout</Text>
                            </TouchableOpacity>
                        </>
                    ) : (
                        <>
                            <TouchableOpacity
                                onPress={() => navigation.navigate("Login")}
                            >
                                <Text style={styles.menuItem}>Login</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => navigation.navigate("Register")}
                            >
                                <Text style={styles.menuItem}>Register</Text>
                            </TouchableOpacity>
                        </>
                    )}
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    navbar: {
        backgroundColor: "#007bff",
        padding: 10,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    logo: {
        color: "#fff",
        fontSize: 20,
        fontWeight: "bold",
    },
    menuButton: {
        padding: 10,
    },
    menuIcon: {
        color: "#fff",
        fontSize: 20,
    },
    menuItems: {
        backgroundColor: "#007bff",
        paddingVertical: 10,
    },
    menuItem: {
        color: "#fff",
        fontSize: 16,
        paddingVertical: 5,
        textAlign: "center",
    },
    welcomeMessage: {
        color: "#fff",
        fontSize: 16,
        paddingVertical: 5,
        textAlign: "center",
    },
    logoutButton: {
        backgroundColor: "#ff4d4f",
        padding: 10,
        marginVertical: 5,
        borderRadius: 5,
    },
    logoutText: {
        color: "#fff",
        textAlign: "center",
    },
});

export default Navbar;
