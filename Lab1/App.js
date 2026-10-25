import {
  StyleSheet,
  Text,
  View,
  Image,
  Pressable
} from 'react-native';

import Ionicons from '@expo/vector-icons/Ionicons';

export default function App() {

  const profilAc = () => {
    console.log('Profil görüntülendi');
  };

  return (
    <View style={styles.container}>

      <View style={styles.kart}>

        <Image
          source={{
            uri: 'https://reactnative.dev/img/tiny_logo.png'
          }}
          style={styles.profilResmi}
        />

        <Text style={styles.baslik}>
          Mobil Uygulama Geliştirici
        </Text>

        <Text style={styles.aciklama}>
          Expo ve React Native kullanarak mobil uygulamalar geliştiriyorum.
        </Text>

        <View style={styles.bilgiSatiri}>

          <Ionicons
            name="school"
            size={22}
            color="#555"
          />

          <Text style={styles.bilgiYazi}>
            Mobil Programlama
          </Text>

        </View>

        <Pressable
          style={styles.buton}
          onPress={profilAc}
        >

          <Ionicons
            name="arrow-forward"
            size={22}
            color="white"
          />

          <Text style={styles.butonYazi}>
            Profili Görüntüle
          </Text>

        </Pressable>

        <View style={styles.menu}>

          <Pressable
            onPress={() => console.log('Ana Sayfa')}
          >
            <Ionicons
              name="home"
              size={30}
              color="#333"
            />
          </Pressable>

          <Pressable
            onPress={() => console.log('Favoriler')}
          >
            <Ionicons
              name="heart"
              size={30}
              color="red"
            />
          </Pressable>

          <Pressable
            onPress={() => console.log('Ayarlar')}
          >
            <Ionicons
              name="settings"
              size={30}
              color="#333"
            />
          </Pressable>

        </View>

      </View>

    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#eeeeee',
    justifyContent: 'center',
    alignItems: 'center',
  },

  kart: {
    width: 320,
    backgroundColor: 'white',
    padding: 25,
    borderRadius: 15,
    alignItems: 'center',
  },

  profilResmi: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 15,
  },

  baslik: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },

  aciklama: {
    fontSize: 16,
    color: '#666666',
    textAlign: 'center',
    marginBottom: 15,
  },

  bilgiSatiri: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },

  bilgiYazi: {
    marginLeft: 5,
    fontSize: 16,
    color: '#555555',
  },

  buton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2563eb',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    gap: 8,
  },

  butonYazi: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },

  menu: {
    flexDirection: 'row',
    gap: 30,
    marginTop: 25,
  },

});
