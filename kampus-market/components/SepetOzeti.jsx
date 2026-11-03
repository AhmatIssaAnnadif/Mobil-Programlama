import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function SepetOzeti({ toplamAdet, toplamTutar }) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Toplam Adet: {toplamAdet}</Text>
      <Text style={styles.textBold}>Toplam Tutar: {toplamTutar} TL</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, backgroundColor: '#f5f5f5', borderTopWidth: 1, borderColor: '#ccc' },
  text: { fontSize: 16 },
  textBold: { fontSize: 18, fontWeight: 'bold', marginTop: 4 }
});