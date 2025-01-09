import React from "react";
import {NavigationContainer, NavigationIndependentTree} from "@react-navigation/native";
import { AuthProvider } from "@/hooks/AuthContext";
import Navbar from "@/hooks/Navbar";
import { createStackNavigator } from "@react-navigation/stack";
import LandingPage from "@/app/page";
import Register from "@/app/register/page";
import DashboardPage from "@/app/dashboard/page";
import TripsPage from "@/app/trips/page";
import TrackingPage from "@/app/tracking/page";
import ProfilePage from "@/app/profile/page";
import LoginPage from "@/app/login/page";

const Stack = createStackNavigator();

export default function RootLayout() {
  return (
      <AuthProvider>
        <NavigationIndependentTree>

        <NavigationContainer>
          <Navbar />
          <Stack.Navigator initialRouteName="LandingPage">
            <Stack.Screen
                name="LandingPage"
                component={LandingPage}
                options={{ headerShown: false }}
            />
            <Stack.Screen name="Dashboard" component={DashboardPage} />
            <Stack.Screen name="Trips" component={TripsPage} />
            <Stack.Screen name="Tracking" component={TrackingPage} />
            <Stack.Screen name="Profile" component={ProfilePage} />
            <Stack.Screen name="Login" component={LoginPage} />
            <Stack.Screen name="Register" component={Register} />
          </Stack.Navigator>
        </NavigationContainer>
        </NavigationIndependentTree>

      </AuthProvider>
  );
}
