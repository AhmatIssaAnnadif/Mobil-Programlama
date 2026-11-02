import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function ProductCard({ product, onPress }) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Text style={styles.name}>{product.name}</Text>
      <Text>Fiyat: {product.price} TL</Text>
      <Text>Kategori: {product.category}</Text>
      <Text style={[styles.stock, { color: product.stock > 0 ? 'green' : 'red' }]}>
        {product.stock > 0 ? `Stok: ${product.stock}` : 'Stokta yok'}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: { padding: 15, backgroundColor: '#f9f9f9', marginBottom: 10, borderRadius: 8, borderWidth: 1, borderColor: '#ddd' },
  name: { fontSize: 18, fontWeight: 'bold', marginBottom: 5 },
  stock: { fontWeight: 'bold', marginTop: 5 }
});