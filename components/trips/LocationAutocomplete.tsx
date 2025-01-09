// Refactored LocationAutocomplete.tsx for React Native/Expo
import React, { useState } from "react";
import {
    View,
    TextInput,
    FlatList,
    Text,
    TouchableOpacity,
    StyleSheet,
    ActivityIndicator,
} from "react-native";

interface LocationAutocompleteProps {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
}

interface Suggestion {
    display_name: string;
    lat: string;
    lon: string;
}

const LocationAutocomplete: React.FC<LocationAutocompleteProps> = ({
                                                                       value,
                                                                       onChange,
                                                                       placeholder = "Enter location...",
                                                                   }) => {
    const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const handleInputChange = async (text: string) => {
        onChange(text);

        if (text.length > 2) {
            setIsLoading(true);
            try {
                const response = await fetch(
                    `https://nominatim.openstreetmap.org/search?format=json&q=${text}`
                );
                if (response.ok) {
                    const data = await response.json();
                    setSuggestions(data);
                } else {
                    console.error("Failed to fetch location suggestions");
                }
            } catch (error) {
                console.error("Error fetching location suggestions:", error);
            } finally {
                setIsLoading(false);
            }
        } else {
            setSuggestions([]);
        }
    };

    const handleSuggestionClick = (suggestion: Suggestion) => {
        onChange(suggestion.display_name);
        setSuggestions([]);
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                value={value}
                onChangeText={handleInputChange}
                placeholder={placeholder}
            />
            {isLoading && <ActivityIndicator size="small" color="#007bff" />}
            {suggestions.length > 0 && (
                <FlatList
                    style={styles.suggestionsContainer}
                    data={suggestions}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            onPress={() => handleSuggestionClick(item)}
                            style={styles.suggestionItem}
                        >
                            <Text style={styles.suggestionText}>{item.display_name}</Text>
                        </TouchableOpacity>
                    )}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: "relative",
    },
    input: {
        height: 40,
        borderColor: "#ccc",
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 10,
    },
    suggestionsContainer: {
        maxHeight: 150,
        borderColor: "#ccc",
        borderWidth: 1,
        borderRadius: 5,
        backgroundColor: "#fff",
    },
    suggestionItem: {
        padding: 10,
        borderBottomColor: "#eee",
        borderBottomWidth: 1,
    },
    suggestionText: {
        color: "#333",
    },
});

export default LocationAutocomplete;