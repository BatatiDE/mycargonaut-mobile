// Refactored LocationMap.tsx for React Native/Expo
import React, { useState } from "react";
import MapView, { Marker } from "react-native-maps";
import { View, StyleSheet, Dimensions, Alert } from "react-native";

interface LocationMapProps {
    onLocationChange: (address: string) => void;
    initialRegion?: {
        latitude: number;
        longitude: number;
        latitudeDelta: number;
        longitudeDelta: number;
    };
}

const LocationMap: React.FC<LocationMapProps> = ({
                                                     onLocationChange,
                                                     initialRegion = {
                                                         latitude: 50.586, // Default latitude (e.g., Gießen)
                                                         longitude: 8.678, // Default longitude (e.g., Gießen)
                                                         latitudeDelta: 0.0922,
                                                         longitudeDelta: 0.0421,
                                                     },
                                                 }) => {
    const [marker, setMarker] = useState({
        latitude: initialRegion.latitude,
        longitude: initialRegion.longitude,
    });

    const handleMapPress = (event) => {
        const { latitude, longitude } = event.nativeEvent.coordinate;
        setMarker({ latitude, longitude });
        fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
        )
            .then((response) => response.json())
            .then((data) => {
                const address = data.display_name || "Unknown location";
                onLocationChange(address);
            })
            .catch((error) => {
                console.error("Error fetching location name:", error);
                Alert.alert("Error", "Unable to fetch location details.");
            });
    };

    return (
        <View style={styles.container}>
            <MapView
                style={styles.map}
                initialRegion={initialRegion}
                onPress={handleMapPress}
            >
                <Marker coordinate={marker} />
            </MapView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: Dimensions.get("window").width,
        height: Dimensions.get("window").height / 2,
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
});

export default LocationMap;
