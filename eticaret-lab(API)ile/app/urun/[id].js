import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  Pressable,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { useSepet } from '../../context/SepetContext';

export default function UrunDetay() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { sepeteEkle } = useSepet();

  const [urun, setUrun] = useState(null);
  const [yukleniyor, setYukleniyor] = useState(true);
  const [hata, setHata] = useState('');

  useEffect(() => {
    let aktif = true;

    async function urunGetir() {
      try {
        setYukleniyor(true);
        setHata('');
        setUrun(null);

        const cevap = await fetch(`https://dummyjson.com/products/${id}`);
        if (!cevap.ok) {
          throw new Error('Ürün bulunamadı.');
        }

        const veri = await cevap.json();
        if (aktif) {
          setUrun(veri);
        }
      } catch (error) {
        if (aktif) {
          setHata(error.message);
        }
      } finally {
        if (aktif) {
          setYukleniyor(false);
        }
      }
    }

    if (id) {
      urunGetir();
    }

    return () => {
      aktif = false;
    };
  }, [id]);

  const indirimliFiyat =
    urun && urun.discountPercentage
      ? urun.price * (1 - urun.discountPercentage / 100)
      : urun?.price;

  return (
    <>
      <Stack.Screen
        options={{
          title: urun ? urun.title : 'Ürün Detayı',
        }}
      />
      <SafeAreaView style={styles.container} edges={['bottom', 'left', 'right']}>
        {yukleniyor ? (
          <ActivityIndicator
            size="large"
            color="#1d4ed8"
            style={styles.yukleme}
          />
        ) : hata ? (
          <View style={styles.mesajAlani}>
            <Text style={styles.hata}>{hata}</Text>
          </View>
        ) : urun ? (
          <ScrollView contentContainerStyle={styles.icerik}>
            <View style={styles.gorselKutu}>
              <Image
                source={{ uri: urun.thumbnail }}
                style={styles.resim}
                resizeMode="contain"
              />
            </View>

            <View style={styles.kart}>
              <View style={styles.etiketSatiri}>
                <View style={styles.kategoriRozet}>
                  <Text style={styles.kategoriYazi}>{urun.category}</Text>
                </View>
                <View style={styles.puanRozet}>
                  <Text style={styles.puanYazi}>★ {urun.rating}</Text>
                </View>
              </View>

              <Text style={styles.baslik}>{urun.title}</Text>

              <View style={styles.fiyatKutu}>
                {urun.discountPercentage > 0 ? (
                  <>
                    <View style={styles.indirimSatiri}>
                      <Text style={styles.indirimliFiyat}>
                        ${indirimliFiyat.toFixed(2)}
                      </Text>
                      <View style={styles.indirimRozet}>
                        <Text style={styles.indirimRozetYazi}>
                          -%{urun.discountPercentage.toFixed(0)} İndirim
                        </Text>
                      </View>
                    </View>
                    <Text style={styles.eskiFiyat}>
                      Liste Fiyatı: ${urun.price.toFixed(2)}
                    </Text>
                  </>
                ) : (
                  <Text style={styles.indirimliFiyat}>
                    ${urun.price.toFixed(2)}
                  </Text>
                )}
              </View>

              <View style={styles.ayirici} />

              <Text style={styles.aciklamaBaslik}>Ürün Açıklaması</Text>
              <Text style={styles.aciklama}>{urun.description}</Text>

              <Pressable
                style={({ pressed }) => [
                  styles.buton,
                  pressed && styles.butonBasilmis,
                ]}
                onPress={() => {
                  sepeteEkle(urun);
                  router.push('/sepet');
                }}
              >
                <Text style={styles.butonYazi}>Sepete Ekle</Text>
              </Pressable>
            </View>
          </ScrollView>
        ) : (
          <View style={styles.mesajAlani}>
            <Text style={styles.hata}>Ürün bilgisi bulunamadı.</Text>
          </View>
        )}
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f1f5f9',
  },
  yukleme: {
    flex: 1,
    justifyContent: 'center',
  },
  mesajAlani: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  icerik: {
    padding: 16,
    paddingBottom: 32,
  },
  gorselKutu: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    alignItems: 'center',
    shadowColor: '#0f172a',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  resim: {
    width: '100%',
    height: 220,
  },
  kart: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 18,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    shadowColor: '#0f172a',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  etiketSatiri: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  kategoriRozet: {
    backgroundColor: '#eff6ff',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
  },
  kategoriYazi: {
    fontSize: 12,
    fontWeight: '700',
    color: '#1d4ed8',
    textTransform: 'capitalize',
  },
  puanRozet: {
    backgroundColor: '#fefce8',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: '#fef08a',
  },
  puanYazi: {
    fontSize: 13,
    fontWeight: '700',
    color: '#a16207',
  },
  baslik: {
    fontSize: 22,
    fontWeight: '800',
    color: '#0f172a',
    lineHeight: 28,
    marginBottom: 14,
  },
  fiyatKutu: {
    backgroundColor: '#f8fafc',
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  indirimSatiri: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 10,
  },
  indirimliFiyat: {
    fontSize: 24,
    fontWeight: '800',
    color: '#1d4ed8',
  },
  indirimRozet: {
    backgroundColor: '#dcfce7',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  indirimRozetYazi: {
    fontSize: 12,
    fontWeight: '700',
    color: '#15803d',
  },
  eskiFiyat: {
    fontSize: 13,
    color: '#64748b',
    textDecorationLine: 'line-through',
    marginTop: 6,
  },
  ayirici: {
    height: 1,
    backgroundColor: '#e2e8f0',
    marginVertical: 16,
  },
  aciklamaBaslik: {
    fontSize: 15,
    fontWeight: '700',
    color: '#0f172a',
    marginBottom: 6,
  },
  aciklama: {
    fontSize: 15,
    lineHeight: 23,
    color: '#475569',
    marginBottom: 22,
  },
  buton: {
    backgroundColor: '#1d4ed8',
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#1d4ed8',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.22,
    shadowRadius: 8,
    elevation: 3,
  },
  butonBasilmis: {
    backgroundColor: '#1e40af',
  },
  butonYazi: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
  hata: {
    fontSize: 15,
    fontWeight: '600',
    color: '#dc2626',
    textAlign: 'center',
  },
});