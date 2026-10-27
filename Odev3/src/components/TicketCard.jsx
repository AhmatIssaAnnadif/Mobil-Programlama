import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import StatusBadge from './StatusBadge';

export default function TicketCard({ ticket, onPress }) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Text style={styles.title}>{ticket.title}</Text>
      <Text style={styles.location}>📍 {ticket.location}</Text>
      <StatusBadge status={ticket.status} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: { backgroundColor: '#fff', padding: 15, borderRadius: 8, marginBottom: 10, borderWidth: 1, borderColor: '#ddd' },
  title: { fontSize: 16, fontWeight: 'bold', marginBottom: 5 },
  location: { color: '#666', marginBottom: 8 },
});