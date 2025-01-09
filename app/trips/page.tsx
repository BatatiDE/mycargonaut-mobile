// Refactored TripsPage.tsx for React Native/Expo
import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    TextInput,
    FlatList,
    StyleSheet,
    TouchableOpacity,
    ActivityIndicator,
    Alert,
} from "react-native";
import { tripApi } from "@/hooks/tripApi";
import { useAuth } from "@/hooks/AuthContext";
import StarRating from "@/components/rating/StarRating";

const TripsPage = () => {
    const [trips, setTrips] = useState([]);
    const [destinations, setDestinations] = useState([]);
    const [tripFilter, setTripFilter] = useState("");
    const [destinationFilter, setDestinationFilter] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { user } = useAuth();

    useEffect(() => {
        const fetchTrips = async () => {
            try {
                const fetchedTrips = await tripApi.getTrips();
                const tripsWithProgress = fetchedTrips.map((trip) => ({
                    ...trip,
                    progress:
                        trip.status === "ONGOING"
                            ? Math.floor(Math.random() * 100)
                            : 0,
                }));

                setTrips(tripsWithProgress);

                const fetchedDestinations = [
                    ...new Set(fetchedTrips.map((trip) => trip.destinationPoint)),
                ];
                setDestinations(fetchedDestinations);
            } catch (err) {
                console.error("Error fetching trips:", err);
                setError("Could not load trips. Please try again later.");
            } finally {
                setLoading(false);
            }
        };

        fetchTrips();
    }, []);

    const handleBooking = async (tripId) => {
        if (!tripId) {
            Alert.alert("Error", "Invalid trip ID.");
            return;
        }

        try {
            const response = await tripApi.bookTrip(tripId);
            if (response.success) {
                Alert.alert("Success", "Trip booked successfully!");
                setTrips((prevTrips) =>
                    prevTrips.map((trip) =>
                        trip.id === tripId
                            ? {
                                ...trip,
                                availableSpace: trip.availableSpace - 1,
                            }
                            : trip
                    )
                );
            } else {
                Alert.alert("Error", response.message);
            }
        } catch (error) {
            console.error("Error booking trip:", error);
            Alert.alert("Error", "Failed to book the trip. Please try again later.");
        }
    };

    if (loading) {
        return (
            <View style={styles.loaderContainer}>
                <ActivityIndicator size="large" color="#007bff" />
            </View>
        );
    }

    if (error) {
        return (
            <View style={styles.errorContainer}>
                <Text style={styles.errorText}>{error}</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <View style={styles.section}>
                <Text style={styles.header}>Deliveries</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Filter Deliveries"
                    onChangeText={setDestinationFilter}
                />
                <FlatList
                    data={destinations.filter((dest) =>
                        dest.toLowerCase().includes(destinationFilter.toLowerCase())
                    )}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => <Text style={styles.item}>{item}</Text>}
                />
            </View>

            <View style={styles.section}>
                <Text style={styles.header}>Available Trips</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Filter Trips"
                    onChangeText={setTripFilter}
                />
                <FlatList
                    data={trips.filter((trip) =>
                        trip.startPoint.toLowerCase().includes(tripFilter.toLowerCase())
                    )}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <View style={styles.tripCard}>
                            <Text style={styles.tripText}>{
                                `${item.startPoint} → ${item.destinationPoint}`
                            }</Text>
                            <Text style={styles.tripDetails}>{
                                `Date: ${item.date} | Time: ${item.time}`
                            }</Text>
                            <StarRating rating={item.driverRating || 0} />
                            <TouchableOpacity
                                style={styles.bookButton}
                                onPress={() => handleBooking(item.id)}
                            >
                                <Text style={styles.bookButtonText}>Book Trip</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    loaderContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    errorContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    errorText: {
        color: "red",
        fontSize: 16,
    },
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: "#f8f9fa",
    },
    section: {
        marginBottom: 20,
    },
    header: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 10,
    },
    input: {
        height: 40,
        borderColor: "#ccc",
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 15,
        paddingHorizontal: 10,
    },
    tripCard: {
        padding: 15,
        marginBottom: 10,
        backgroundColor: "#fff",
        borderRadius: 8,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 5,
    },
    tripText: {
        fontSize: 16,
        fontWeight: "bold",
    },
    tripDetails: {
        fontSize: 14,
        color: "#555",
        marginBottom: 10,
    },
    bookButton: {
        backgroundColor: "#007bff",
        borderRadius: 5,
        padding: 10,
        alignItems: "center",
    },
    bookButtonText: {
        color: "#fff",
        fontWeight: "bold",
    },
    item: {
        padding: 10,
        borderBottomColor: "#ccc",
        borderBottomWidth: 1,
    },
});

export default TripsPage;
