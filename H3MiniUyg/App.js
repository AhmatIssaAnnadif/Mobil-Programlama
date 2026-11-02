
import {
  StyleSheet,
  Text,
  View,
  Image,
  Pressable,
} from 'react-native';

import Ionicons from '@expo/vector-icons/Ionicons';

export default function App() {
  const butonaBasildi = () => {
    console.log('Profil görüntülendi');
  };

  const iletisimButonunaBasildi = () => {
    console.log('İletişim butonuna basıldı');
  };

  return (
    <View style={styles.container}>
      <View style={styles.kart}>
        <Image
          source={{
            uri: 'https://reactnative.dev/img/tiny_logo.png',
          }}
          style={styles.resim}
        />

        <Text style={styles.baslik}>
          Ahmet Yılmaz
        </Text>

        <Text style={styles.altBaslik}>
          Yazılım Mühendisliği Öğrencisi
        </Text>

        <View style={styles.konum}>
          <Ionicons
            name="location"
            size={20}
            color="#555"
          />
          <Text style={styles.konumYazi}>
            Karabük
          </Text>
        </View>

        <Pressable
          style={styles.buton}
          onPress={butonaBasildi}
        >
          <Ionicons
            name="person"
            size={20}
            color="white"
          />
          <Text style={styles.butonYazi}>
            Profili Gör
          </Text>
        </Pressable>

        <Pressable
          style={styles.iletisimButonu}
          onPress={iletisimButonunaBasildi}
        >
          <Ionicons
            name="mail"
            size={20}
            color="white"
          />
          <Text style={styles.butonYazi}>
            İletişim
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#eeeeee',
  },

  kart: {
    width: 300,
    backgroundColor: 'white',
    padding: 25,
    borderRadius: 15,
    alignItems: 'center',
  },

  resim: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 15,
  },

  baslik: {
    fontSize: 24,
    fontWeight: 'bold',
  },

  altBaslik: {
    fontSize: 16,
    color: '#666',
    marginTop: 5,
    marginBottom: 15,
  },

  konum: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },

  konumYazi: {
    marginLeft: 5,
    fontSize: 16,
  },

  buton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2563eb',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    gap: 8,
  },

  iletisimButonu: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#16a34a',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    gap: 8,
    marginTop: 12,
  },

  butonYazi: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
