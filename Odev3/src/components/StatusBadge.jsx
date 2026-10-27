import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function StatusBadge({ status }) {
  let backgroundColor = '#ccc';
  if (status === 'Bekliyor') backgroundColor = '#f39c12'; // Orange
  else if (status === 'İşlemde') backgroundColor = '#3498db'; // Bleu
  else if (status === 'Çözüldü') backgroundColor = '#2ecc71'; // Vert

  return (
    <View style={[styles.badge, { backgroundColor }]}>
      <Text style={styles.text}>{status}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 6, alignSelf: 'flex-start' },
  text: { color: '#fff', fontWeight: 'bold', fontSize: 12 },
});