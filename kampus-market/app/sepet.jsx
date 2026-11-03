import React from 'react';
import { View, Text, FlatList, Pressable, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { useSepet } from '../context/SepetContext';
import AdetSecici from '../components/AdetSecici';
import SepetOzeti from '../components/SepetOzeti';

export default function SepetEkrani() {
  const { sepet, adetArtir, adetAzalt, urunKaldir, sepetiBosalt } = useSepet();

  const toplamAdet = sepet.reduce((toplam, s) => toplam + s.adet, 0);
  const toplamTutar = sepet.reduce((toplam, s) => toplam + s.fiyat * s.adet, 0);

  if (sepet.length === 0) {
    return (
      <SafeAreaView style={styles.safeArea} edges={['top', 'bottom', 'left', 'right']}>
        <View style={styles.header}>
          <Pressable style={styles.backButton} onPress={() => router.push('/')}>
            <Text style={styles.backButtonText}>‹ Alışverişe Dön</Text>
          </Pressable>
          <Text style={styles.headerTitle}>Sepetim</Text>
          <View style={{ width: 45 }} />
        </View>

        <View style={styles.emptyContainer}>
          <Text style={styles.emptyIcon}>🛒</Text>
          <Text style={styles.emptyTitle}>Sepetiniz Boş</Text>
          <Text style={styles.emptyText}>Henüz sepetinize hiç ürün eklemediniz.</Text>
          <Pressable style={styles.shopBtn} onPress={() => router.push('/')}>
            <Text style={styles.shopBtnText}>Ürünleri Keşfet</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'bottom', 'left', 'right']}>
      {/* En-tête supérieur propre */}
      <View style={styles.header}>
        <Pressable style={styles.backButton} onPress={() => router.push('/')}>
          <Text style={styles.backButtonText}>‹ Alışveriş</Text>
        </Pressable>
        <Text style={styles.headerTitle}>Sepetim ({toplamAdet})</Text>
        <View style={{ width: 45 }} />
      </View>

      <View style={styles.container}>
        <FlatList
          data={sepet}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <View style={styles.itemCard}>
              {/* Informations du produit */}
              <View style={styles.itemInfo}>
                <Text style={styles.itemTitle} numberOfLines={1}>{item.ad}</Text>
                <Text style={styles.itemPrice}>{item.fiyat} TL / adet</Text>
                <Text style={styles.itemSubtotal}>
                  Toplam: <Text style={styles.subtotalBold}>{item.fiyat * item.adet} TL</Text>
                </Text>
              </View>

              {/* Contrôles de quantité et suppression alignés proprement */}
              <View style={styles.rightSection}>
                <Pressable onPress={() => urunKaldir(item.id)} style={styles.trashBtn}>
                  <Text style={styles.trashText}>🗑️</Text>
                </Pressable>
                
                <View style={styles.counterWrapper}>
                  <Pressable style={styles.countBtn} onPress={() => adetAzalt(item.id)}>
                    <Text style={styles.countBtnText}>-</Text>
                  </Pressable>
                  <Text style={styles.countText}>{item.adet}</Text>
                  <Pressable style={styles.countBtn} onPress={() => adetArtir(item.id)}>
                    <Text style={styles.countBtnText}>+</Text>
                  </Pressable>
                </View>
              </View>
            </View>
          )}
        />

        {/* Résumé du panier et bouton pour vider */}
        <View style={styles.footer}>
          <SepetOzeti toplamAdet={toplamAdet} toplamTutar={toplamTutar} />
          
          <Pressable style={styles.clearBtn} onPress={sepetiBosalt}>
            <Text style={styles.clearBtnText}>Sepeti Boşalt</Text>
          </Pressable>
        </View>
      </View>
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
  container: { flex: 1, padding: 16 },
  listContainer: { paddingBottom: 16 },
  itemCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#eaeaea',
  },
  itemInfo: { flex: 1, marginRight: 12 },
  itemTitle: { fontSize: 16, fontWeight: 'bold', color: '#1c1e21', marginBottom: 4 },
  itemPrice: { fontSize: 13, color: '#8c939f', marginBottom: 6 },
  itemSubtotal: { fontSize: 14, color: '#4b4f56' },
  subtotalBold: { fontWeight: '700', color: '#007AFF' },
  
  rightSection: {
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    height: 70,
  },
  trashBtn: {
    padding: 2,
  },
  trashText: {
    fontSize: 16,
  },
  counterWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f4f6f9',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e1e4e8',
    overflow: 'hidden',
  },
  countBtn: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    backgroundColor: '#fff',
  },
  countBtnText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#007AFF',
  },
  countText: {
    paddingHorizontal: 10,
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1c1e21',
  },

  footer: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#eaeaea',
  },
  clearBtn: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#dc3545',
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 12,
  },
  clearBtnText: { color: '#dc3545', fontWeight: 'bold', fontSize: 14 },
  emptyContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  emptyIcon: { fontSize: 50, marginBottom: 12 },
  emptyTitle: { fontSize: 20, fontWeight: 'bold', color: '#1c1e21', marginBottom: 6 },
  emptyText: { fontSize: 14, color: '#6c757d', textAlign: 'center', marginBottom: 20 },
  shopBtn: { backgroundColor: '#007AFF', paddingVertical: 12, paddingHorizontal: 24, borderRadius: 12 },
  shopBtnText: { color: '#fff', fontWeight: 'bold', fontSize: 15 }
});