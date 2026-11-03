import React from 'react';
import { View, Text, Image, Pressable, StyleSheet } from 'react-native';

export default function UrunKarti({ urun, onDetay, onSepeteEkle }) {
  const stoktaYok = urun.stok === 0;

  return (
    <View style={styles.card}>
      <Pressable onPress={onDetay} style={styles.detailsClick}>
        <Image source={urun.gorsel} style={styles.image} resizeMode="contain" />
        <View style={styles.info}>
          <Text style={styles.title} numberOfLines={1}>{urun.ad}</Text>
          <Text style={styles.price}>{urun.fiyat} TL</Text>
          <View style={styles.stockContainer}>
            <View style={[styles.dot, { backgroundColor: stoktaYok ? '#dc3545' : '#28a745' }]} />
            <Text style={stoktaYok ? styles.noStock : styles.stock}>
              {stoktaYok ? 'Stokta Yok' : `Stok: ${urun.stok}`}
            </Text>
          </View>
        </View>
      </Pressable>

      <Pressable
        style={[styles.addBtn, stoktaYok && styles.disabledBtn]}
        onPress={onSepeteEkle}
        disabled={stoktaYok}
      >
        <Text style={styles.addBtnText}>{stoktaYok ? 'Tükendi' : ' Sepete Ekle'}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { 
    padding: 14, 
    marginVertical: 8, 
    backgroundColor: '#fff', 
    borderRadius: 16, 
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#f0f0f0'
  },
  detailsClick: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  image: { width: 75, height: 75, borderRadius: 12, backgroundColor: '#f9f9f9' },
  info: { marginLeft: 14, flex: 1, justifyContent: 'center' },
  title: { fontSize: 16, fontWeight: 'bold', color: '#1c1e21', marginBottom: 4 },
  price: { fontSize: 15, fontWeight: '700', color: '#007AFF', marginBottom: 6 },
  stockContainer: { flexDirection: 'row', alignItems: 'center' },
  dot: { width: 6, height: 6, borderRadius: 3, marginRight: 6 },
  stock: { fontSize: 13, color: '#28a745', fontWeight: '500' },
  noStock: { fontSize: 13, color: '#dc3545', fontWeight: '500' },
  addBtn: { 
    backgroundColor: '#007AFF', 
    paddingVertical: 12, 
    borderRadius: 10, 
    alignItems: 'center',
    shadowColor: '#007AFF',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 2
  },
  disabledBtn: { backgroundColor: '#e4e6eb', shadowOpacity: 0 },
  addBtnText: { color: '#fff', fontWeight: 'bold', fontSize: 14 }
});