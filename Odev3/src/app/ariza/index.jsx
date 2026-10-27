import React from 'react';
import { View, FlatList, StyleSheet, Text } from 'react-native';
import { useRouter } from 'expo-router';
import { tickets } from '../../data/tickets';
import TicketCard from '../../components/TicketCard';

export default function ArizaListesiScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Liste des Arizalar (Pannes)</Text>
      <FlatList
        data={tickets}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TicketCard 
            ticket={item} 
            onPress={() => router.push(`/ariza/${item.id}`)} 
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f9f9f9' },
  header: { fontSize: 20, fontWeight: 'bold', marginBottom: 15 },
});