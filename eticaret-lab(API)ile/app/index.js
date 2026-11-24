import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  Pressable,
  TextInput,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import UrunKarti from '../components/UrunKarti';
import { useSepet } from '../context/SepetContext';

const KATEGORILER = [
  { id: 'all', etiket: 'Tümü' },
  { id: 'beauty', etiket: 'Kozmetik' },
  { id: 'fragrances', etiket: 'Parfüm' },
  { id: 'furniture', etiket: 'Mobilya' },
  { id: 'groceries', etiket: 'Market' },
];

export default function AnaSayfa() {
  const router = useRouter();
  const { toplamAdet, sepeteEkle } = useSepet();

  const [urunler, setUrunler] = useState([]);
  const [aramaMetni, setAramaMetni] = useState('');
  const [seciliKategori, setSeciliKategori] = useState('all');
  const [yukleniyor, setYukleniyor] = useState(true);
  const [hata, setHata] = useState('');

  async function urunleriGetir(sorgu = '', kategori = 'all') {
    try {
      setYukleniyor(true);
      setHata('');

      let url = 'https://dummyjson.com/products?limit=20';
      if (sorgu.trim()) {
        url = `https://dummyjson.com/products/search?q=${encodeURIComponent(sorgu.trim())}`;
      } else if (kategori !== 'all') {
        url = `https://dummyjson.com/products/category/${kategori}`;
      }

      const cevap = await fetch(url);
      if (!cevap.ok) {
        throw new Error('Ürünler alınamadı.');
      }

      const veri = await cevap.json();
      setUrunler(veri.products);
    } catch (error) {
      setHata(error.message);
    } finally {
      setYukleniyor(false);
    }
  }

  useEffect(() => {
    const gecikme = setTimeout(() => {
      urunleriGetir(aramaMetni, seciliKategori);
    }, 300);

    return () => clearTimeout(gecikme);
  }, [aramaMetni, seciliKategori]);

  function kategoriSec(katId) {
    setAramaMetni('');
    setSeciliKategori(katId);
  }

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom', 'left', 'right']}>
      {/* Üst Başlık ve Sepet */}
      <View style={styles.ustPanel}>
        <View style={styles.baslikSatiri}>
          <View>
            <Text style={styles.karsilama}>Hoş Geldiniz </Text>
            <Text style={styles.magazaBaslik}>Tech & Style Store</Text>
          </View>

          <Pressable
            style={({ pressed }) => [
              styles.sepetButon,
              pressed && styles.sepetButonBasilmis,
            ]}
            onPress={() => router.push('/sepet')}
          >
            <Text style={styles.sepetIkon}>🛒</Text>
            <Text style={styles.butonYazi}>Sepetim</Text>
            <View style={styles.sayacRozet}>
              <Text style={styles.sayacYazi}>{toplamAdet}</Text>
            </View>
          </Pressable>
        </View>

        {/* Arama Çubuğu */}
        <View style={styles.aramaKutu}>
          <Text style={styles.aramaIkon}>🔍</Text>
          <TextInput
            style={styles.aramaInput}
            placeholder="Ürün, marka veya kategori ara..."
            placeholderTextColor="#94a3b8"
            value={aramaMetni}
            onChangeText={(text) => {
              setAramaMetni(text);
              if (text.trim().length > 0 && seciliKategori !== 'all') {
                setSeciliKategori('all');
              }
            }}
          />
          {aramaMetni.length > 0 && (
            <Pressable
              onPress={() => setAramaMetni('')}
              hitSlop={8}
              style={styles.temizleButon}
            >
              <Text style={styles.temizleYazi}>✕</Text>
            </Pressable>
          )}
        </View>

        {/* Kategori Filtreleri */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.kategoriListe}
        >
          {KATEGORILER.map((kat) => {
            const aktif = seciliKategori === kat.id && aramaMetni.trim() === '';
            return (
              <Pressable
                key={kat.id}
                onPress={() => kategoriSec(kat.id)}
                style={[styles.kategoriChip, aktif && styles.kategoriChipAktif]}
              >
                <Text
                  style={[
                    styles.kategoriChipYazi,
                    aktif && styles.kategoriChipYaziAktif,
                  ]}
                >
                  {kat.etiket}
                </Text>
              </Pressable>
            );
          })}
        </ScrollView>
      </View>

      {yukleniyor ? (
        <ActivityIndicator
          size="large"
          color="#1d4ed8"
          style={styles.yukleme}
        />
      ) : hata ? (
        <View style={styles.mesajAlani}>
          <Text style={styles.hata}>{hata}</Text>
          <Pressable
            style={styles.tekrarButon}
            onPress={() => urunleriGetir(aramaMetni, seciliKategori)}
          >
            <Text style={styles.butonYazi}>Tekrar Dene</Text>
          </Pressable>
        </View>
      ) : (
        <FlatList
          data={urunler}
          numColumns={2}
          keyExtractor={(item) => item.id.toString()}
          columnWrapperStyle={styles.sutunSatiri}
          contentContainerStyle={styles.liste}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={
            <View style={styles.banner}>
              <View style={styles.bannerIcerik}>
                <View style={styles.bannerEtiket}>
                  <Text style={styles.bannerEtiketYazi}>SEZON FIRSATI</Text>
                </View>
                <Text style={styles.bannerBaslik}>
                  Seçili Ürünlerde %20&apos;ye Varan İndirim
                </Text>
                <Text style={styles.bannerAlt}>
                  {urunler.length} ürün listeleniyor
                </Text>
              </View>
            </View>
          }
          ListEmptyComponent={
            <View style={styles.bosAlani}>
              <Text style={styles.bosMesaj}>Gösterilecek ürün bulunamadı.</Text>
            </View>
          }
          renderItem={({ item }) => (
            <View style={styles.kartSarmalayici}>
              <UrunKarti
                urun={item}
                onPress={() => router.push(`/urun/${item.id}`)}
                onQuickAdd={(secilenUrun) => sepeteEkle(secilenUrun)}
              />
            </View>
          )}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f1f5f9',
  },
  ustPanel: {
    backgroundColor: '#ffffff',
    paddingTop: 8,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  baslikSatiri: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  karsilama: {
    fontSize: 12,
    fontWeight: '600',
    color: '#64748b',
  },
  magazaBaslik: {
    fontSize: 21,
    fontWeight: '800',
    color: '#0f172a',
    letterSpacing: -0.4,
  },
  sepetButon: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#10368f',
    paddingHorizontal: 12,
    paddingVertical: 9,
    borderRadius: 12,
    gap: 6,
  },
  sepetButonBasilmis: {
    backgroundColor: '#1e293b',
  },
  sepetIkon: {
    fontSize: 14,
  },
  butonYazi: {
    color: '#ffffff',
    fontWeight: '700',
    fontSize: 13,
  },
  sayacRozet: {
    backgroundColor: '#2563eb',
    minWidth: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 5,
  },
  sayacYazi: {
    color: '#ffffff',
    fontSize: 11,
    fontWeight: '800',
  },
  aramaKutu: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8fafc',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 12,
    marginHorizontal: 16,
    paddingHorizontal: 12,
    height: 42,
    marginBottom: 10,
  },
  aramaIkon: {
    fontSize: 14,
    marginRight: 8,
  },
  aramaInput: {
    flex: 1,
    fontSize: 14,
    color: '#0f172a',
    paddingVertical: 0,
  },
  temizleButon: {
    paddingLeft: 8,
  },
  temizleYazi: {
    fontSize: 14,
    color: '#64748b',
    fontWeight: '700',
  },
  kategoriListe: {
    paddingHorizontal: 16,
    gap: 8,
  },
  kategoriChip: {
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 999,
    backgroundColor: '#f1f5f9',
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  kategoriChipAktif: {
    backgroundColor: '#1d4ed8',
    borderColor: '#1d4ed8',
  },
  kategoriChipYazi: {
    fontSize: 12,
    fontWeight: '700',
    color: '#475569',
  },
  kategoriChipYaziAktif: {
    color: '#ffffff',
  },
  liste: {
    padding: 14,
    paddingBottom: 24,
  },
  sutunSatiri: {
    justifyContent: 'space-between',
    gap: 12,
  },
  kartSarmalayici: {
    flex: 1,
    maxWidth: '48.5%',
  },
  banner: {
    backgroundColor: '#1e3a8a',
    borderRadius: 16,
    padding: 16,
    marginBottom: 14,
    shadowColor: '#1e3a8a',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.18,
    shadowRadius: 8,
    elevation: 3,
  },
  bannerIcerik: {
    gap: 4,
  },
  bannerEtiket: {
    alignSelf: 'flex-start',
    backgroundColor: '#3b82f6',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    marginBottom: 4,
  },
  bannerEtiketYazi: {
    color: '#ffffff',
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 0.6,
  },
  bannerBaslik: {
    color: '#ffffff',
    fontSize: 17,
    fontWeight: '800',
    lineHeight: 22,
  },
  bannerAlt: {
    color: '#bfdbfe',
    fontSize: 12,
    fontWeight: '500',
    marginTop: 2,
  },
  yukleme: {
    flex: 1,
    justifyContent: 'center',
  },
  mesajAlani: {
    alignItems: 'center',
    marginTop: 40,
    padding: 20,
  },
  bosAlani: {
    paddingVertical: 48,
    alignItems: 'center',
  },
  hata: {
    color: '#dc2626',
    fontWeight: '600',
    marginBottom: 16,
    textAlign: 'center',
  },
  bosMesaj: {
    textAlign: 'center',
    color: '#64748b',
    fontSize: 15,
  },
  tekrarButon: {
    backgroundColor: '#1d4ed8',
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 10,
  },
});