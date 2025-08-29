import { Stack } from "expo-router";
import './globals.css'; // Import global styles

export default function RootLayout() {
  return <Stack >
    <Stack.Screen
      name="(tabs)"
      options={{ headerShown: false }}
      /> 
      <Stack.Screen
        name="movies/[id]"
        options={{ headerShown: false }}
      />
    </Stack >
}
