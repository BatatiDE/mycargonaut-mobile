// Refactored StarRating.tsx for React Native/Expo
import React from "react";
import { View, Text, StyleSheet } from "react-native";

interface StarRatingProps {
    rating: number; // Average rating value
    maxStars?: number; // Maximum number of stars to display (default: 5)
}

const StarRating: React.FC<StarRatingProps> = ({ rating, maxStars = 5 }) => {
    const fullStars = Math.floor(rating); // Full stars
    const halfStar = rating % 1 >= 0.5; // Check if half star is needed
    const emptyStars = maxStars - fullStars - (halfStar ? 1 : 0);

    return (
        <View style={styles.container}>
            {/* Full Stars */}
            {Array.from({ length: fullStars }).map((_, index) => (
                <Text key={`full-${index}`} style={styles.fullStar}>★</Text>
            ))}

            {/* Half Star */}
            {halfStar && <Text style={styles.fullStar}>★</Text>}

            {/* Empty Stars */}
            {Array.from({ length: emptyStars }).map((_, index) => (
                <Text key={`empty-${index}`} style={styles.emptyStar}>★</Text>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
    },
    fullStar: {
        color: "#FFD700", // Yellow for full stars
        fontSize: 18,
        marginHorizontal: 2,
    },
    emptyStar: {
        color: "#D3D3D3", // Light gray for empty stars
        fontSize: 18,
        marginHorizontal: 2,
    },
});

export default StarRating;
