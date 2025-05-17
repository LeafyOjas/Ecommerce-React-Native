import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)" />
      {/* <Stack.Screen name="products/[id]/index" /> */}
    </Stack>
  );
}
