// Refactored RatingModal.tsx for React Native/Expo
import React, { useState } from "react";
import {
    Modal,
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Alert,
} from "react-native";

interface RatingModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (rating: number) => void;
}

const RatingModal: React.FC<RatingModalProps> = ({ isOpen, onClose, onSubmit }) => {
    const [rating, setRating] = useState<number>(0);

    const handleSubmit = () => {
        if (rating > 0 && rating <= 5) {
            onSubmit(rating);
            onClose();
        } else {
            Alert.alert("Invalid Rating", "Please select a rating between 1 and 5.");
        }
    };

    return (
        <Modal visible={isOpen} transparent animationType="slide">
            <View style={styles.overlay}>
                <View style={styles.modalContainer}>
                    <Text style={styles.title}>Leave a Review</Text>
                    <Text style={styles.subtitle}>Rate your trip experience:</Text>
                    <View style={styles.ratingContainer}>
                        {[1, 2, 3, 4, 5].map((value) => (
                            <TouchableOpacity
                                key={value}
                                onPress={() => setRating(value)}
                                style={[
                                    styles.ratingButton,
                                    rating === value ? styles.selectedButton : styles.unselectedButton,
                                ]}
                            >
                                <Text style={styles.ratingText}>{value}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity onPress={onClose} style={styles.cancelButton}>
                            <Text style={styles.cancelButtonText}>Cancel</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={handleSubmit} style={styles.submitButton}>
                            <Text style={styles.submitButtonText}>Submit</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    modalContainer: {
        width: "80%",
        backgroundColor: "#fff",
        borderRadius: 10,
        padding: 20,
        shadowColor: "#000",
        shadowOpacity: 0.2,
        shadowRadius: 10,
        elevation: 5,
    },
    title: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 10,
        textAlign: "center",
    },
    subtitle: {
        fontSize: 14,
        color: "#555",
        marginBottom: 20,
        textAlign: "center",
    },
    ratingContainer: {
        flexDirection: "row",
        justifyContent: "center",
        marginBottom: 20,
    },
    ratingButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: "center",
        alignItems: "center",
        marginHorizontal: 5,
    },
    selectedButton: {
        backgroundColor: "#007bff",
    },
    unselectedButton: {
        backgroundColor: "#ccc",
    },
    ratingText: {
        color: "#fff",
        fontWeight: "bold",
    },
    buttonContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    cancelButton: {
        backgroundColor: "#ccc",
        padding: 10,
        borderRadius: 5,
        alignItems: "center",
        flex: 1,
        marginRight: 10,
    },
    cancelButtonText: {
        color: "#333",
    },
    submitButton: {
        backgroundColor: "#007bff",
        padding: 10,
        borderRadius: 5,
        alignItems: "center",
        flex: 1,
    },
    submitButtonText: {
        color: "#fff",
        fontWeight: "bold",
    },
});

export default RatingModal;
