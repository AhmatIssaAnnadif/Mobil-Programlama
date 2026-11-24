import React from 'react';
import { View, Text, Image, Pressable, StyleSheet } from 'react-native';

export default function UrunKarti({ urun, onPress, onQuickAdd }) {
  const indirimVar = urun.discountPercentage && urun.discountPercentage >= 5;
  const indirimliFiyat = indirimVar
    ? urun.price * (1 - urun.discountPercentage / 100)
    : urun.price;

  return (
    <Pressable
      style={({ pressed }) => [styles.kart, pressed && styles.kartBasilmis]}
      onPress={onPress}
    >
      <View style={styles.gorselAlani}>
        {indirimVar && (
          <View style={styles.indirimRozet}>
            <Text style={styles.indirimYazi}>
              -%{Math.round(urun.discountPercentage)}
            </Text>
          </View>
        )}

        <View style={styles.puanRozet}>
          <Text style={styles.puanYazi}>★ {urun.rating.toFixed(1)}</Text>
        </View>

        <Image
          source={{ uri: urun.thumbnail }}
          style={styles.resim}
          resizeMode="contain"
        />
      </View>

      <View style={styles.icerik}>
        <Text style={styles.kategori} numberOfLines={1}>
          {urun.category}
        </Text>

        <Text style={styles.baslik} numberOfLines={2}>
          {urun.title}
        </Text>

        <View style={styles.fiyatSatiri}>
          <View>
            {indirimVar && (
              <Text style={styles.eskiFiyat}>${urun.price.toFixed(2)}</Text>
            )}
            <Text style={styles.fiyat}>${indirimliFiyat.toFixed(2)}</Text>
          </View>

          {onQuickAdd && (
            <Pressable
              style={({ pressed }) => [
                styles.ekleButon,
                pressed && styles.ekleButonBasilmis,
              ]}
              onPress={(e) => {
                e.stopPropagation?.();
                onQuickAdd(urun);
              }}
              hitSlop={6}
            >
              <Text style={styles.ekleButonYazi}>+</Text>
            </Pressable>
          )}
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  kart: {
    flex: 1,
    backgroundColor: '#ffffff',
    borderRadius: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    overflow: 'hidden',
    shadowColor: '#0f172a',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
  kartBasilmis: {
    transform: [{ scale: 0.985 }],
    opacity: 0.95,
  },
  gorselAlani: {
    height: 135,
    backgroundColor: '#f8fafc',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 12,
    position: 'relative',
  },
  indirimRozet: {
    position: 'absolute',
    top: 8,
    left: 8,
    backgroundColor: '#ef4444',
    paddingHorizontal: 7,
    paddingVertical: 3,
    borderRadius: 6,
    zIndex: 2,
  },
  indirimYazi: {
    color: '#ffffff',
    fontSize: 10,
    fontWeight: '800',
  },
  puanRozet: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: '#ffffff',
    paddingHorizontal: 7,
    paddingVertical: 3,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    zIndex: 2,
  },
  puanYazi: {
    fontSize: 11,
    fontWeight: '700',
    color: '#d97706',
  },
  resim: {
    width: '85%',
    height: '85%',
  },
  icerik: {
    padding: 12,
    flex: 1,
    justifyContent: 'space-between',
  },
  kategori: {
    fontSize: 10,
    fontWeight: '700',
    color: '#64748b',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  baslik: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0f172a',
    lineHeight: 19,
    minHeight: 38,
    marginBottom: 10,
  },
  fiyatSatiri: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  eskiFiyat: {
    fontSize: 11,
    color: '#94a3b8',
    textDecorationLine: 'line-through',
  },
  fiyat: {
    fontSize: 16,
    fontWeight: '800',
    color: '#1d4ed8',
  },
  ekleButon: {
    width: 32,
    height: 32,
    borderRadius: 10,
    backgroundColor: '#1d4ed8',
    justifyContent: 'center',
    alignItems: 'center',
  },
  ekleButonBasilmis: {
    backgroundColor: '#1e40af',
  },
  ekleButonYazi: {
    color: '#ffffff',
    fontSize: 19,
    fontWeight: '700',
    lineHeight: 21,
  },
});