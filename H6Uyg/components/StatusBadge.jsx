import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function StatusBadge({ status }) {
  const getBackgroundColor = () => {
    switch (status) {
      case 'Bekliyor': return 'orange';
      case 'İşlemde': return 'blue';
      case 'Çözüldü': return 'green';
      default: return 'gray';
    }
  };

  return (
    <View style={[styles.badge, { backgroundColor: getBackgroundColor() }]}>
      <Text style={styles.text}>{status}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: { 
    paddingHorizontal: 10, 
    paddingVertical: 5, 
    borderRadius: 6, 
    alignSelf: 'flex-start', // Empêche le badge de s'étirer sur toute la largeur
    marginTop: 5 
  },
  text: { color: 'white', fontWeight: 'bold', fontSize: 12 }
});