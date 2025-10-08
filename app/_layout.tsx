import { Stack } from "expo-router";
import "../global.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider, useAuth } from "@/context/AuthContext";
import { useEffect } from "react";
import { View, Text } from "react-native";
import { SplashScreen } from "expo-router";

const queryClient = new QueryClient();

export default function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <SplashScreenController />
        <RootNavigator />
      </AuthProvider>
    </QueryClientProvider>
  );
}

// Inline SplashScreenController
function SplashScreenController() {
  const { authState } = useAuth();
  const { authenticated } = authState || {};

  useEffect(() => {
    if (authenticated !== null) {
      SplashScreen.hideAsync();
    }
  }, [authenticated]);

  // Keep splash visible until auth loads
  if (authenticated === null) {
    return null;
  }

  return null;
}

// Inner component for auth guards
function RootNavigator() {
  const { authState } = useAuth();
  const authenticated = authState?.authenticated; // Now: boolean | null (no undefined)

  // Loading state: Show until auth loads (handles null/undefined)
  if (authenticated === null || authenticated === undefined) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Loading...</Text>
      </View>
    );
  }

  // Now authenticated is narrowed to boolean by TS
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Protected guard={!authenticated}>
        <Stack.Screen name="CreateAccount" />
      </Stack.Protected>

      <Stack.Protected guard={authenticated}>
        <Stack.Screen name="(tabs)" />
      </Stack.Protected>
    </Stack>
  );
}
