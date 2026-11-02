import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { tickets } from '../../data/tickets';
import StatusBadge from '../../components/StatusBadge';

export default function ArizaDetay() {
  const { id } = useLocalSearchParams();
  const router = useRouter();

  const ticket = tickets.find((t) => t.id === id);

  if (!ticket) {
    return (
      <View style={styles.container}>
        <Text style={styles.error}>Arıza bulunamadı veya geçersiz ID (/ariza/{id})!</Text>
        <Button title="Geri Dön" onPress={() => router.back()} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Başlık: {ticket.title}</Text>
      <Text>Konum: {ticket.location}</Text>
      <StatusBadge status={ticket.status} />
      <View style={{ marginTop: 20 }}>
        <Button title="Geri" onPress={() => router.back()} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center' },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 10 },
  error: { fontSize: 18, color: 'red', marginBottom: 10 }
});