import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: "Accueil" }} />
      <Stack.Screen name="ariza" options={{ headerShown: false }} />
      <Stack.Screen name="ariza/[id]" options={{ title: "Arıza Detayı" }} />
      <Stack.Screen name="urun/index" options={{ headerShown: false }} />
      <Stack.Screen name="urun/[id]" options={{ title: "Ürün Detayı" }} />
      <Stack.Screen name="ders/index" options={{ headerShown: false }} />
      <Stack.Screen name="ders/[id]" options={{ title: "Ders Detayı" }} />
    </Stack>
  );
}
