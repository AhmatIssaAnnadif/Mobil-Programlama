import React, { useState } from 'react';
import { View, Text, Image, Pressable, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, router } from 'expo-router';
import { urunler } from '../../data/urunler';
import { useSepet } from '../../context/SepetContext';
import AdetSecici from '../../components/AdetSecici';

export default function UrunDetayEkrani() {
  const { id } = useLocalSearchParams();
  const { sepeteEkle } = useSepet();
  const [adet, setAdet] = useState(1);

  const urun = urunler.find((u) => u.id === id);

  if (!urun) {
    return (
      <SafeAreaView style={styles.errorContainer}>
        <Text style={styles.errorText}>Ürün bulunamadı!</Text>
        <Pressable style={styles.backBtn} onPress={() => router.back()}>
          <Text style={styles.backBtnText}>Geri Dön</Text>
        </Pressable>
      </SafeAreaView>
    );
  }

  const stoktaYok = urun.stok === 0;

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'bottom', 'left', 'right']}>
      {/* En-tête supérieur redessiné */}
      <View style={styles.header}>
        <Pressable style={styles.backButton} onPress={() => router.back()}>
          <Text style={styles.backButtonText}>‹ Geri</Text>
        </Pressable>
        <Text style={styles.headerTitle}>Ürün Detayı</Text>
        <View style={{ width: 45 }} />
      </View>

      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        {/* Conteneur d'image modernisé sans bordure rigide */}
        <View style={styles.imageContainer}>
          <Image source={urun.gorsel} style={styles.image} resizeMode="contain" />
        </View>

        {/* Carte des détails du produit */}
        <View style={styles.detailsCard}>
          <Text style={styles.title}>{urun.ad}</Text>
          <Text style={styles.price}>{urun.fiyat} TL</Text>
          
          <View style={styles.divider} />

          <Text style={styles.sectionTitle}>Ürün Açıklaması</Text>
          <Text style={styles.desc}>{urun.aciklama}</Text>

          <View style={styles.stockRow}>
            <View style={[styles.stockDot, { backgroundColor: stoktaYok ? '#dc3545' : '#28a745' }]} />
            <Text style={stoktaYok ? styles.noStockText : styles.stockText}>
              {stoktaYok ? 'Tükendi (Stokta yok)' : `Stokta mevcut (${urun.stok} adet)`}
            </Text>
          </View>

          {!stoktaYok && (
            <View style={styles.selectorWrapper}>
              <Text style={styles.label}>Adet Belirleyin</Text>
              <AdetSecici
                adet={adet}
                onArtir={() => setAdet((prev) => Math.min(prev + 1, urun.stok))}
                onAzalt={() => setAdet((prev) => Math.max(prev - 1, 1))}
              />
            </View>
          )}

          <Pressable
            style={[styles.addBtn, stoktaYok && styles.disabledBtn]}
            disabled={stoktaYok}
            onPress={() => {
              sepeteEkle(urun, adet);
              router.push('/sepet');
            }}
          >
            <Text style={styles.addBtnText}>
              {stoktaYok ? 'Bu Ürün Tükendi' : 'Sepete Ekle'}
            </Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#f4f6f9' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderColor: '#eaeaea',
  },
  backButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: '#f0f2f5',
    borderRadius: 20,
  },
  backButtonText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#007AFF',
  },
  headerTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#1c1e21',
  },
  container: { padding: 16, paddingBottom: 40 },
  imageContainer: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: { ios: 0.04, android: 0.1 }[PlatformOS => 'ios'] || 0.04,
    shadowRadius: 8,
    elevation: 2,
  },
  image: { 
    width: '100%', 
    height: 220, 
  },
  detailsCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },
  title: { fontSize: 24, fontWeight: 'bold', color: '#1c1e21', marginBottom: 6 },
  price: { fontSize: 22, fontWeight: '700', color: '#007AFF', marginBottom: 12 },
  divider: { height: 1, backgroundColor: '#eaeaea', marginVertical: 12 },
  sectionTitle: { fontSize: 13, fontWeight: '600', color: '#8c939f', textTransform: 'uppercase', marginBottom: 6, letterSpacing: 0.5 },
  desc: { fontSize: 15, color: '#4b4f56', marginBottom: 16, lineHeight: 22 },
  stockRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 20 },
  stockDot: { width: 8, height: 8, borderRadius: 4, marginRight: 8 },
  stockText: { fontSize: 14, color: '#28a745', fontWeight: '500' },
  noStockText: { fontSize: 14, color: '#dc3545', fontWeight: '500' },
  selectorWrapper: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'space-between',
    marginBottom: 24,
    paddingTop: 14,
    borderTopWidth: 1,
    borderColor: '#eaeaea'
  },
  label: { fontSize: 16, fontWeight: '600', color: '#1c1e21' },
  addBtn: { backgroundColor: '#007AFF', paddingVertical: 15, borderRadius: 12, alignItems: 'center', shadowColor: '#007AFF', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.2, shadowRadius: 6, elevation: 4 },
  disabledBtn: { backgroundColor: '#e4e6eb', shadowOpacity: 0 },
  addBtnText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  errorContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 16 },
  errorText: { fontSize: 18, color: '#dc3545', marginBottom: 12 },
  backBtn: { backgroundColor: '#007AFF', padding: 10, borderRadius: 6 },
  backBtnText: { color: '#fff', fontWeight: 'bold' }
});