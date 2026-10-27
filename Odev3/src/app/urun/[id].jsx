import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { products } from '../../data/products';

export default function UrunDetailScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();

  const product = products.find((p) => p.id === id);

  if (!product) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Ürün bulunamadı !</Text>
        <Button title="Geri Dön" onPress={() => router.back()} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{product.name}</Text>
      <Text style={styles.price}>Fiyat: {product.price} ₺</Text>
      <Text style={styles.category}>Kategori: {product.category}</Text>
      <Text style={[styles.stock, product.stock === 0 ? styles.outOfStock : styles.inStock]}>
        {product.stock === 0 ? 'Stokta yok' : `Stokta (Adet: ${product.stock})`}
      </Text>
      <Text style={styles.desc}>Açıklama: {product.description}</Text>
      
      <Button title="Ürün Listesine Dön" onPress={() => router.back()} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center' },
  errorContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  errorText: { fontSize: 18, color: 'red', marginBottom: 15 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 10 },
  price: { fontSize: 18, color: '#27ae60', marginBottom: 8 },
  category: { fontSize: 15, color: '#555', marginBottom: 8 },
  stock: { fontSize: 15, fontWeight: 'bold', marginBottom: 12 },
  inStock: { color: 'green' },
  outOfStock: { color: 'red' },
  desc: { fontSize: 14, color: '#333', marginBottom: 20 },
});