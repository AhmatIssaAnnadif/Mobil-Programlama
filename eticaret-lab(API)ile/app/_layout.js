import React from 'react';
import { Stack } from 'expo-router';
import { SepetProvider } from '../context/SepetContext';

export default function RootLayout() {
  return (
    <SepetProvider>
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: '#ffffff' },
          headerTintColor: '#0f172a',
          headerTitleStyle: { fontWeight: '700', fontSize: 17 },
          headerShadowVisible: true,
        }}
      >
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen
          name="urun/[id]"
          options={{
            title: 'Ürün Detayı',
            headerBackTitle: 'Ürünler',
          }}
        />
        <Stack.Screen
          name="sepet"
          options={{
            title: 'Sepetim',
            headerBackTitle: 'Geri',
          }}
        />
      </Stack>
    </SepetProvider>
  );
}