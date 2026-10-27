import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';

export default function ProductCard({ product, onPress }) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Text style={styles.name}>{product.name}</Text>
      <Text style={styles.price}>{product.price} ₺</Text>
      <Text style={styles.category}>Kategori: {product.category}</Text>
      <Text style={[styles.stock, product.stock === 0 ? styles.outOfStock : styles.inStock]}>
        {product.stock === 0 ? 'Stokta yok' : `Stokta (${product.stock})`}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: { backgroundColor: '#fff', padding: 15, borderRadius: 8, marginBottom: 12, borderWidth: 1, borderColor: '#ddd' },
  name: { fontSize: 16, fontWeight: 'bold' },
  price: { fontSize: 15, color: '#27ae60', marginVertical: 4 },
  category: { color: '#555', fontSize: 13 },
  stock: { marginTop: 6, fontWeight: 'bold', fontSize: 12 },
  inStock: { color: 'green' },
  outOfStock: { color: 'red' },
});