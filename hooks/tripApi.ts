// Refactored tripApi.ts for React Native/Expo
import { fetchData } from "./api"; // Ensure fetchData is properly defined

/**
 * Fetch all trips
 */
export const getTrips = async () => {
    return await fetchData("trips");
};

/**
 * Fetch a single trip by ID
 * @param tripId - The ID of the trip
 */
export const getTripById = async (tripId: string) => {
    return await fetchData(`trips/${tripId}`);
};

/**
 * Create a new trip
 * @param tripData - The data for the new trip
 */
export const createTrip = async (tripData: Record<string, any>) => {
    return await fetchData("trips", {
        method: "POST",
        body: JSON.stringify(tripData),
    });
};

/**
 * Update an existing trip by ID
 * @param tripId - The ID of the trip to update
 * @param tripData - The updated trip data
 */
export const updateTrip = async (tripId: string, tripData: Record<string, any>) => {
    return await fetchData(`trips/${tripId}`, {
        method: "PUT",
        body: JSON.stringify(tripData),
    });
};

/**
 * Delete a trip by ID
 * @param tripId - The ID of the trip to delete
 */
export const deleteTrip = async (tripId: string) => {
    return await fetchData(`trips/${tripId}`, {
        method: "DELETE",
    });
};
