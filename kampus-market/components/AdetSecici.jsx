import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';

export default function AdetSecici({ adet, onArtir, onAzalt }) {
  return (
    <View style={styles.container}>
      <Pressable style={styles.button} onPress={onAzalt} accessibilityLabel="Adet azalt">
        <Text style={styles.btnText}>-</Text>
      </Pressable>
      <Text style={styles.adetText}>{adet}</Text>
      <Pressable style={styles.button} onPress={onArtir} accessibilityLabel="Adet artır">
        <Text style={styles.btnText}>+</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flexDirection: 'row', alignItems: 'center' },
  button: { backgroundColor: '#ddd', padding: 8, borderRadius: 4, width: 32, alignItems: 'center' },
  btnText: { fontSize: 18, fontWeight: 'bold' },
  adetText: { marginHorizontal: 12, fontSize: 16 }
});