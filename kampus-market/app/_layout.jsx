import { Stack } from 'expo-router';
import { SepetProvider } from '../context/SepetContext';

export default function RootLayout() {
  return (
    <SepetProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="urun/[id]" />
        <Stack.Screen name="sepet" options={{ headerShown: false, title: 'Sepetim' }} />
      </Stack>
    </SepetProvider>
  );
}