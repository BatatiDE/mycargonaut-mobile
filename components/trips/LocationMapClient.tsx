// Refactored LocationMapClient.tsx for React Native/Expo
import React, { useState } from "react";
import MapView, { Marker } from "react-native-maps";
import {
    View,
    Button,
    StyleSheet,
    Alert,
    Dimensions,
} from "react-native";
import * as Location from "expo-location";

interface LocationMapClientProps {
    latitude: number;
    longitude: number;
    onLocationChange: (lat: number, lng: number) => void;
}

const LocationMapClient: React.FC<LocationMapClientProps> = ({
                                                                 latitude,
                                                                 longitude,
                                                                 onLocationChange,
                                                             }) => {
    const [marker, setMarker] = useState({
        latitude,
        longitude,
    });

    const handleMapPress = async (event) => {
        const { latitude, longitude } = event.nativeEvent.coordinate;
        setMarker({ latitude, longitude });

        try {
            const response = await fetch(
                `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
            );
            if (!response.ok) throw new Error("Failed to fetch address");
            const data = await response.json();
            const address = data.display_name || "Unknown location";
            onLocationChange(address);
        } catch (error) {
            console.error("Error fetching address:", error);
            Alert.alert("Error", "Unable to fetch address.");
        }
    };

    const useCurrentLocation = async () => {
        try {
            const { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== "granted") {
                Alert.alert("Permission Denied", "Location access is required.");
                return;
            }

            const location = await Location.getCurrentPositionAsync({});
            const { latitude, longitude } = location.coords;
            setMarker({ latitude, longitude });

            const response = await fetch(
                `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
            );
            const data = await response.json();
            const address = data.display_name || "Unknown location";
            onLocationChange(address);
        } catch (error) {
            console.error("Error fetching current location:", error);
            Alert.alert("Error", "Unable to fetch current location.");
        }
    };

    return (
        <View style={styles.container}>
            <MapView
                style={styles.map}
                initialRegion={{
                    latitude,
                    longitude,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
                onPress={handleMapPress}
            >
                <Marker coordinate={marker} />
            </MapView>
            <Button title="Use Current Location" onPress={useCurrentLocation} />
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

export default LocationMapClient;
