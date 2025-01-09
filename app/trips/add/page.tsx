// Refactored AddTripPage.tsx for React Native/Expo
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
import { tripApi } from "@/hooks/tripApi";
import { useAuth } from "@/hooks/AuthContext";
import LocationAutocomplete from "@/components/trips/LocationAutocomplete";
import LocationMap from "@/components/trips/LocationMap";

export default function AddTripPage() {
    const { user } = useAuth();
    const [form, setForm] = useState({
        driverId: user?.id || null,
        startPoint: "",
        destinationPoint: "",
        date: "",
        time: "",
        availableSpace: 0,
        latitude: 50.586, // Default latitude (Gießen)
        longitude: 8.678, // Default longitude (Gießen)
    });
    const [showMap, setShowMap] = useState(false);
    const [mapField, setMapField] = useState(null);

    const handleChange = (name, value) => {
        setForm((prevForm) => ({ ...prevForm, [name]: value }));
    };

    const handleSubmit = async () => {
        if (!form.driverId) {
            Alert.alert("Error", "Driver ID not available. Please log in.");
            return;
        }

        try {
            const payload = { ...form, driverId: Number(form.driverId) };
            await tripApi.addTrip(payload);
            Alert.alert("Success", "Trip added successfully!", [
                { text: "OK", onPress: () => console.log("Navigate to dashboard") },
            ]);
        } catch {
            Alert.alert("Error", "Failed to add trip. Please try again.");
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Add a New Trip</Text>

            <LocationAutocomplete
                value={form.startPoint}
                onChange={(value) => handleChange("startPoint", value)}
                placeholder="Start Point"
            />
            <TouchableOpacity
                onPress={() => {
                    setShowMap(!showMap);
                    setMapField("startPoint");
                }}
                style={styles.mapButton}
            >
                <Text>{showMap && mapField === "startPoint" ? "Hide Map" : "Show Map"}</Text>
            </TouchableOpacity>

            <LocationAutocomplete
                value={form.destinationPoint}
                onChange={(value) => handleChange("destinationPoint", value)}
                placeholder="Destination"
            />
            <TouchableOpacity
                onPress={() => {
                    setShowMap(!showMap);
                    setMapField("destinationPoint");
                }}
                style={styles.mapButton}
            >
                <Text>{showMap && mapField === "destinationPoint" ? "Hide Map" : "Show Map"}</Text>
            </TouchableOpacity>

            {showMap && mapField && (
                <LocationMap
                    onLocationChange={(address) => handleChange(mapField, address)}
                />
            )}

            <TextInput
                style={styles.input}
                value={form.date}
                onChangeText={(value) => handleChange("date", value)}
                placeholder="Enter Date"
            />
            <TextInput
                style={styles.input}
                value={form.time}
                onChangeText={(value) => handleChange("time", value)}
                placeholder="Enter Time"
            />
            <TextInput
                style={styles.input}
                value={String(form.availableSpace)}
                keyboardType="numeric"
                onChangeText={(value) => handleChange("availableSpace", Number(value))}
                placeholder="Available Space"
            />

            <Button title="Add Trip" onPress={handleSubmit} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: "#f8f9fa",
    },
    header: {
        fontSize: 24,
        fontWeight: "bold",
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
    mapButton: {
        backgroundColor: "#ccc",
        padding: 10,
        borderRadius: 5,
        alignItems: "center",
        marginBottom: 15,
    },
});
