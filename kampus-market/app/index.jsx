import React, { useState } from 'react';
import { View, TextInput, FlatList, Text, Pressable, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { urunler } from '../data/urunler';
import UrunKarti from '../components/UrunKarti';
import { useSepet } from '../context/SepetContext';

export default function UrunlerEkrani() {
  const [aramaMetni, setAramaMetni] = useState('');
  const { sepeteEkle, sepet } = useSepet();

  const filtreliUrunler = urunler.filter((urun) =>
    urun.ad.toLowerCase().includes(aramaMetni.toLowerCase())
  );

  const toplamPanierAdet = sepet.reduce((sum, item) => sum + item.adet, 0);

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'bottom', 'left', 'right']}>
      <View style={styles.container}>
        
        {/* En-tête de l'application */}
        <View style={styles.topHeader}>
          <View>
            <Text style={styles.headerSubtitle}>Hoş Geldiniz </Text>
            <Text style={styles.headerTitle}>Kampüs Market</Text>
          </View>
          <Pressable style={styles.cartButton} onPress={() => router.push('/sepet')}>
            <Text style={styles.cartBtnText}> Sepet ({toplamPanierAdet})</Text>
          </Pressable>
        </View>

        {/* Barre de recherche moderne */}
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Ürün adı ile arayın..."
            placeholderTextColor="#8c939f"
            value={aramaMetni}
            onChangeText={setAramaMetni}
          />
        </View>

        {/* Liste des produits */}
        <FlatList
          data={filtreliUrunler}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <UrunKarti
              urun={item}
              onDetay={() => router.push({ pathname: '/urun/[id]', params: { id: item.id } })}
              onSepeteEkle={() => sepeteEkle(item, 1)}
            />
          )}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}> Aramanıza uygun ürün bulunamadı.</Text>
            </View>
          }
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#f4f6f9' },
  container: { flex: 1, paddingHorizontal: 16 },
  topHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 14,
  },
  headerSubtitle: {
    fontSize: 13,
    color: '#6c757d',
    fontWeight: '600',
    marginBottom: 2,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: '#1c1e21',
  },
  searchContainer: {
    marginBottom: 12,
  },
  searchInput: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#e1e4e8',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 15,
    color: '#1c1e21',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.03,
    shadowRadius: 4,
    elevation: 2,
  },
  cartButton: {
    backgroundColor: '#28a745',
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 20,
    shadowColor: '#28a745',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  cartBtnText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 13,
  },
  listContainer: {
    paddingBottom: 24,
  },
  emptyContainer: {
    alignItems: 'center',
    marginTop: 60,
  },
  emptyText: {
    textAlign: 'center',
    color: '#6c757d',
    fontSize: 15,
    fontWeight: '500',
  },
});