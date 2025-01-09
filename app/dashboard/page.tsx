// Refactored DashboardPage.tsx for React Native/Expo
import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    TextInput,
    Button,
    Alert,
    FlatList,
    TouchableOpacity,
    StyleSheet,
    ActivityIndicator,
} from "react-native";
import { tripApi } from "../../hooks/tripApi";
import { useAuth } from "@/hooks/AuthContext";
import StarRating from "../../components/rating/StarRating"; // Custom StarRating component
import RatingModal from "../../components/rating/RatingModal"; // Custom RatingModal component

const DashboardPage = () => {
    const { user } = useAuth();
    const [trips, setTrips] = useState({ added: [], booked: [] });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentTripId, setCurrentTripId] = useState(null);
    const [ratingModalOpen, setRatingModalOpen] = useState(false);
    const [currentTargetUserId, setCurrentTargetUserId] = useState(null);

    const fetchData = async () => {
        try {
            const fetchedTrips = await tripApi.getTrips();
            const addedTrips = fetchedTrips.filter(
                (trip) => String(trip.driverId) === String(user?.id)
            );
            const bookedTrips = fetchedTrips.filter((trip) =>
                trip.bookedUsers.some((booking) => String(booking.userId) === String(user?.id))
            );

            setTrips({ added: addedTrips, booked: bookedTrips });
        } catch (err) {
            console.error("Error fetching trips:", err);
            setError("Failed to load trips. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (user?.id) {
            fetchData();
        }
    }, [user?.id]);

    const handleReviewSubmit = async (rating) => {
        try {
            await tripApi.submitRating({
                voterId: user?.id,
                userId: currentTargetUserId,
                tripId: currentTripId,
                ratingValue: rating,
            });

            Alert.alert("Success", "Rating submitted successfully.");
            setRatingModalOpen(false);
            fetchData();
        } catch (err) {
            console.error("Error submitting rating:", err);
            Alert.alert("Error", "Failed to submit rating. Please try again.");
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
            <Text style={styles.header}>My Dashboard</Text>
            <FlatList
                data={trips.added}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={styles.tripCard}>
                        <Text style={styles.tripText}>{`${item.startPoint} → ${item.destinationPoint}`}</Text>
                        <Button
                            title="Rate Trip"
                            onPress={() => {
                                setCurrentTripId(item.id);
                                setRatingModalOpen(true);
                            }}
                        />
                    </View>
                )}
                ListHeaderComponent={<Text style={styles.listHeader}>Added Trips</Text>}
            />
            <RatingModal
                isOpen={ratingModalOpen}
                onClose={() => setRatingModalOpen(false)}
                onSubmit={handleReviewSubmit}
            />
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
    },
    header: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 10,
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
        marginBottom: 5,
    },
    listHeader: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 10,
    },
});

export default DashboardPage;