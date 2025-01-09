// Refactored ErrorBoundary.tsx for React Native/Expo
import React, { Component, ReactNode } from "react";
import { View, Text, StyleSheet } from "react-native";

interface Props {
    children: ReactNode;
}

interface State {
    hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
    state: State = { hasError: false };

    static getDerivedStateFromError(): State {
        return { hasError: true };
    }

    render(): ReactNode {
        if (this.state.hasError) {
            return (
                <View style={styles.container}>
                    <Text style={styles.title}>Something went wrong.</Text>
                    <Text style={styles.message}>Please refresh the app or contact support.</Text>
                </View>
            );
        }
        return this.props.children;
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f8d7da",
        padding: 20,
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#721c24",
        marginBottom: 10,
    },
    message: {
        fontSize: 16,
        color: "#721c24",
        textAlign: "center",
    },
});

export default ErrorBoundary;
