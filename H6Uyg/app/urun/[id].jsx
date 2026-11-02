import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { products } from "../../data/products";

export default function UrunDetay() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const product = products.find((p) => p.id === id);

  if (!product) {
    return (
      <View style={styles.container}>
        <Text style={styles.error}>Ürün bulunamadı!</Text>
        <Button title="Geri Dön" onPress={() => router.back()} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{product.name}</Text>
      <Text>Fiyat: {product.price} TL</Text>
      <Text>Kategori: {product.category}</Text>
      <Text>Açıklama: {product.description}</Text>
      <Text
        style={{
          color: product.stock > 0 ? "green" : "red",
          fontWeight: "bold",
        }}
      >
        {product.stock > 0 ? "Stokta" : "Stokta yok"}
      </Text>
      <View style={{ marginTop: 20 }}>
        <Button title="Geri Dön" onPress={() => router.back()} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: "center" },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 10 },
  error: { fontSize: 18, color: "red", marginBottom: 10 },
});
