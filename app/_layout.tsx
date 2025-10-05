import { Stack } from "expo-router";

export default function RootLayout() {
  return <Stack 
    screenOptions={{
        headerShown: false, // ✅ hides the top "index" bar everywhere
      }}
  />;
}
