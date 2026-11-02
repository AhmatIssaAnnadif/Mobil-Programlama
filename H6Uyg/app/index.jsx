import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons'; // Expo'da dahili olarak gelir

export default function Home() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.greeting}>Hoş Geldiniz </Text>
        <Text style={styles.subtitle}>Lütfen uygulamak istediğiniz modülü seçin</Text>
      </View>

      <View style={styles.menuContainer}>
        {/* Arıza Takip Kartı */}
        <TouchableOpacity 
          style={[styles.card, { backgroundColor: '#FFF3E0', borderColor: '#FFE0B2' }]} 
          onPress={() => router.push('/ariza')}
        >
          <View style={[styles.iconBox, { backgroundColor: '#FF9800' }]}>
            <Ionicons name="construct-outline" size={24} color="#fff" />
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.cardTitle}>Arıza Takip</Text>
            <Text style={styles.cardDesc}>Arıza kayıtlarını listeleyin ve yönetin</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color="#999" />
        </TouchableOpacity>

        {/* Ürün Kataloğu Kartı */}
        <TouchableOpacity 
          style={[styles.card, { backgroundColor: '#E3F2FD', borderColor: '#BBDEFB' }]} 
          onPress={() => router.push('/urun')}
        >
          <View style={[styles.iconBox, { backgroundColor: '#2196F3' }]}>
            <Ionicons name="cart-outline" size={24} color="#fff" />
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.cardTitle}>Mini Ürün Kataloğu</Text>
            <Text style={styles.cardDesc}>Ürünleri ve stok durumlarını inceleyin</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color="#999" />
        </TouchableOpacity>

        {/* Ders Programı Kartı */}
        <TouchableOpacity 
          style={[styles.card, { backgroundColor: '#E8F5E9', borderColor: '#C8E6C9' }]} 
          onPress={() => router.push('/ders')}
        >
          <View style={[styles.iconBox, { backgroundColor: '#4CAF50' }]}>
            <Ionicons name="calendar-outline" size={24} color="#fff" />
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.cardTitle}>Öğrenci Ders Programı</Text>
            <Text style={styles.cardDesc}>Haftalık ders programınızı görüntüleyin</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color="#999" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#F8F9FA', 
    paddingHorizontal: 20, 
    justifyContent: 'center' 
  },
  headerContainer: { 
    marginBottom: 30, 
    alignItems: 'center' 
  },
  greeting: { 
    fontSize: 26, 
    fontWeight: 'bold', 
    color: '#333' 
  },
  subtitle: { 
    fontSize: 14, 
    color: '#666', 
    marginTop: 5 
  },
  menuContainer: { 
    width: '100%' 
  },
  card: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    padding: 16, 
    borderRadius: 16, 
    borderWidth: 1, 
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  iconBox: { 
    width: 48, 
    height: 48, 
    borderRadius: 12, 
    justifyContent: 'center', 
    alignItems: 'center', 
    marginRight: 16 
  },
  textContainer: { 
    flex: 1 
  },
  cardTitle: { 
    fontSize: 16, 
    fontWeight: 'bold', 
    color: '#222' 
  },
  cardDesc: { 
    fontSize: 12, 
    color: '#666', 
    marginTop: 2 
  }
});