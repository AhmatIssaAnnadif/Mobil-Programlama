import React from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  Pressable,
  StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useSepet } from '../context/SepetContext';

export default function SepetSayfasi() {
  const router = useRouter();
  const {
    sepet,
    urunSil,
    adetArtir,
    adetAzalt,
    toplamTutar,
    toplamAdet,
  } = useSepet();

  function sepetUrunuGoster({ item }) {
    const satirToplami = item.price * item.adet;

    return (
      <View style={styles.kart}>
        <View style={styles.resimKutu}>
          <Image
            source={{ uri: item.thumbnail }}
            style={styles.resim}
            resizeMode="contain"
          />
        </View>

        <View style={styles.bilgiler}>
          <View style={styles.ustSatir}>
            <Text style={styles.urunAdi} numberOfLines={2}>
              {item.title}
            </Text>
            <Pressable
              onPress={() => urunSil(item.id)}
              hitSlop={6}
              style={styles.silButon}
            >
              <Text style={styles.sil}>Sil</Text>
            </Pressable>
          </View>

          <Text style={styles.birimFiyat}>
            Birim: ${item.price.toFixed(2)}
          </Text>

          <View style={styles.altSatir}>
            <View style={styles.adetAlani}>
              <Pressable
                style={({ pressed }) => [
                  styles.adetButon,
                  pressed && styles.adetButonBasilmis,
                ]}
                onPress={() => adetAzalt(item.id)}
              >
                <Text style={styles.adetButonYazi}>−</Text>
              </Pressable>

              <Text style={styles.adet}>{item.adet}</Text>

              <Pressable
                style={({ pressed }) => [
                  styles.adetButon,
                  pressed && styles.adetButonBasilmis,
                ]}
                onPress={() => adetArtir(item.id)}
              >
                <Text style={styles.adetButonYazi}>+</Text>
              </Pressable>
            </View>

            <Text style={styles.satirToplam}>
              ${satirToplami.toFixed(2)}
            </Text>
          </View>
        </View>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['bottom', 'left', 'right']}>
      <View style={styles.ozetBand}>
        <Text style={styles.ozetBaslik}>Sepet Özeti</Text>
        <View style={styles.adetRozet}>
          <Text style={styles.adetRozetYazi}>{toplamAdet} Ürün</Text>
        </View>
      </View>

      {sepet.length === 0 ? (
        <View style={styles.bosSepet}>
          <View style={styles.bosKart}>
            <Text style={styles.bosBaslik}>Sepetiniz şu an boş</Text>
            <Text style={styles.bosYazi}>
              Beğendiğiniz ürünleri inceleyip sepete ekleyebilirsiniz.
            </Text>
            <Pressable
              style={({ pressed }) => [
                styles.alisverisButon,
                pressed && styles.butonBasilmis,
              ]}
              onPress={() => router.navigate('/')}
            >
              <Text style={styles.butonYazi}>Alışverişe Başla</Text>
            </Pressable>
          </View>
        </View>
      ) : (
        <>
          <FlatList
            data={sepet}
            keyExtractor={(item) => item.id.toString()}
            renderItem={sepetUrunuGoster}
            contentContainerStyle={styles.liste}
            showsVerticalScrollIndicator={false}
          />

          <View style={styles.altAlan}>
            <View style={styles.toplamSatir}>
              <Text style={styles.toplamEtiket}>Genel Toplam</Text>
              <Text style={styles.toplam}>${toplamTutar.toFixed(2)}</Text>
            </View>

            <Pressable
              style={({ pressed }) => [
                styles.alisverisButon,
                pressed && styles.butonBasilmis,
              ]}
              onPress={() => router.navigate('/')}
            >
              <Text style={styles.butonYazi}>Alışverişe Devam Et</Text>
            </Pressable>
          </View>
        </>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f1f5f9',
  },
  ozetBand: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  ozetBaslik: {
    fontSize: 15,
    fontWeight: '700',
    color: '#334155',
  },
  adetRozet: {
    backgroundColor: '#eff6ff',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
  },
  adetRozetYazi: {
    fontSize: 13,
    fontWeight: '700',
    color: '#1d4ed8',
  },
  liste: {
    padding: 16,
    paddingBottom: 20,
  },
  kart: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    borderRadius: 14,
    padding: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    shadowColor: '#0f172a',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
  },
  resimKutu: {
    width: 82,
    height: 82,
    borderRadius: 10,
    backgroundColor: '#f8fafc',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    padding: 6,
  },
  resim: {
    width: '100%',
    height: '100%',
  },
  bilgiler: {
    flex: 1,
    justifyContent: 'space-between',
  },
  ustSatir: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: 8,
  },
  urunAdi: {
    flex: 1,
    fontSize: 15,
    fontWeight: '700',
    color: '#0f172a',
    lineHeight: 20,
  },
  silButon: {
    backgroundColor: '#fef2f2',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  sil: {
    color: '#dc2626',
    fontWeight: '700',
    fontSize: 12,
  },
  birimFiyat: {
    fontSize: 13,
    color: '#64748b',
    marginTop: 4,
    marginBottom: 8,
  },
  altSatir: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  adetAlani: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8fafc',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    padding: 2,
  },
  adetButon: {
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 6,
  },
  adetButonBasilmis: {
    backgroundColor: '#e2e8f0',
  },
  adetButonYazi: {
    fontSize: 17,
    fontWeight: '700',
    color: '#0f172a',
  },
  adet: {
    fontSize: 15,
    fontWeight: '700',
    color: '#0f172a',
    minWidth: 28,
    textAlign: 'center',
  },
  satirToplam: {
    fontSize: 16,
    fontWeight: '800',
    color: '#1d4ed8',
  },
  altAlan: {
    padding: 16,
    backgroundColor: '#ffffff',
    borderTopWidth: 1,
    borderTopColor: '#e2e8f0',
  },
  toplamSatir: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },
  toplamEtiket: {
    fontSize: 15,
    fontWeight: '600',
    color: '#475569',
  },
  toplam: {
    fontSize: 22,
    fontWeight: '800',
    color: '#0f172a',
  },
  alisverisButon: {
    backgroundColor: '#1d4ed8',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    shadowColor: '#1d4ed8',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 2,
  },
  butonBasilmis: {
    backgroundColor: '#1e40af',
  },
  butonYazi: {
    color: '#ffffff',
    fontWeight: '700',
    fontSize: 15,
  },
  bosSepet: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  bosKart: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  bosBaslik: {
    fontSize: 18,
    fontWeight: '700',
    color: '#0f172a',
    marginBottom: 8,
  },
  bosYazi: {
    fontSize: 14,
    color: '#64748b',
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 20,
  },
});