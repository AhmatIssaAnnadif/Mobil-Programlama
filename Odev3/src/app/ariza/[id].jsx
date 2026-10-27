import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { tickets } from '../../data/tickets';
import StatusBadge from '../../components/StatusBadge';

export default function ArizaDetailScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();

  const ticket = tickets.find((t) => t.id === id);

  // Gestion de l'erreur si l'ID n'existe pas (ex: /ariza/999)
  if (!ticket) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>⚠️ Arıza introuvable ou ID invalide ({id}).</Text>
        <Button title="Retour" onPress={() => router.back()} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{ticket.title}</Text>
      <Text style={styles.label}>Emplacement : {ticket.location}</Text>
      <View style={styles.statusContainer}>
        <Text style={styles.label}>Statut : </Text>
        <StatusBadge status={ticket.status} />
      </View>
      <View style={styles.buttonContainer}>
        <Button title="Retour à la liste" onPress={() => router.back()} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center' },
  errorContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  errorText: { fontSize: 18, color: 'red', marginBottom: 20, textAlign: 'center' },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 15 },
  label: { fontSize: 16, marginBottom: 10 },
  statusContainer: { flexDirection: 'row', alignItems: 'center', marginBottom: 20 },
  buttonContainer: { marginTop: 20 }
});