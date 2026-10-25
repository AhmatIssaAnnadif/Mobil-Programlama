import {
  StyleSheet,
  Text,
  View,
  Image,
  Pressable,
  ScrollView,
} from "react-native";

import Ionicons from "@expo/vector-icons/Ionicons";

// 1. Ton image locale importée (assure-toi d'avoir mis ton image dans un dossier "assets")
import profilResmi from "./images.jpeg";

export default function App() {
  const butonaBasildi = () => {
    console.log("Isa Annadif Ahmat - Profil başarıyla görüntülendi.");
  };

  const iletisimButonunaBasildi = () => {
    console.log("İletişim butonuna basıldı");
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        {/* Arka plan dekoratif elementleri */}
        <View style={styles.arkaPlanKapsul1} />
        <View style={styles.arkaPlanKapsul2} />

        <View style={styles.kart}>
          {/* Profil Resmi ve Online Rozet */}
          <View style={styles.resimKapsayici}>
            <Image source={profilResmi} style={styles.resim} />
            <View style={styles.onlineBadge} />
          </View>

          {/* İsim ve Unvan */}
          <Text style={styles.baslik}>Isa Annadif Ahmat</Text>

          <Text style={styles.altBaslik}>Yazılım Mühendisliği Öğrencisi</Text>

          {/* Konum */}
          <View style={styles.konum}>
            <Ionicons name="location-sharp" size={16} color="#38bdf8" />
            <Text style={styles.konumYazi}>Karabük, Türkiye</Text>
          </View>

          {/* Biyografi Kutusu */}
          <View style={styles.bioKutu}>
            <Text style={styles.bioYazi}>
              Yazılım geliştirme ve yapay zekaya tutkuyla bağlıyım. Performans
              ve estetiği birleştirerek güçlü ve akıllı uygulamalar
              tasarlıyorum.
            </Text>
          </View>

          {/* Yetenekler / Teknolojiler */}
          <Text style={styles.sectionTitle}>Yetenekler & Teknolojiler</Text>
          <View style={styles.etiketKapsayici}>
            <Text style={styles.etiket}>JavaScript</Text>
            <Text style={styles.etiket}>Node.js</Text>
            <Text style={styles.etiket}>Java</Text>
            <Text style={styles.etiket}>React Native</Text>
            <Text style={styles.etiket}>Python</Text>
            <Text style={styles.etiket}>OpenCV</Text>
            <Text style={styles.etiket}>AI</Text>
          </View>

          {/* 1. Buton: Profili İncele */}
          <Pressable
            style={({ pressed }) => [
              styles.buton,
              styles.birinciButon,
              pressed && { opacity: 0.85, transform: [{ scale: 0.98 }] },
            ]}
            onPress={butonaBasildi}
          >
            <Ionicons name="sparkles" size={18} color="#ffffff" />
            <Text style={styles.butonYazi}>Profili İncele</Text>
          </Pressable>

          {/* Ek Görev: İletişim Butonu */}
          <Pressable
            style={({ pressed }) => [
              styles.buton,
              styles.iletisimButon,
              pressed && { opacity: 0.85, transform: [{ scale: 0.98 }] },
            ]}
            onPress={iletisimButonunaBasildi}
          >
            <Ionicons name="mail-outline" size={18} color="#38bdf8" />
            <Text style={[styles.butonYazi, styles.iletisimYazi]}>
              İletişim Kur
            </Text>
          </Pressable>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#090d16",
    paddingVertical: 40,
  },

  arkaPlanKapsul1: {
    position: "absolute",
    width: 220,
    height: 220,
    borderRadius: 110,
    backgroundColor: "rgba(56, 189, 248, 0.12)",
    top: 50,
    left: 20,
  },
  arkaPlanKapsul2: {
    position: "absolute",
    width: 260,
    height: 260,
    borderRadius: 130,
    backgroundColor: "rgba(99, 102, 241, 0.12)",
    bottom: 30,
    right: 20,
  },

  kart: {
    width: 345,
    backgroundColor: "rgba(15, 23, 42, 0.85)",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
    paddingVertical: 32,
    paddingHorizontal: 22,
    borderRadius: 28,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 16 },
    shadowOpacity: 0.5,
    shadowRadius: 20,
    elevation: 12,
  },

  resimKapsayici: {
    position: "relative",
    marginBottom: 14,
  },

  resim: {
    width: 110,
    height: 110,
    borderRadius: 55,
    borderWidth: 3,
    borderColor: "#38bdf8",
  },

  onlineBadge: {
    position: "absolute",
    bottom: 4,
    right: 4,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: "#22c55e",
    borderWidth: 3,
    borderColor: "#0f172a",
  },

  baslik: {
    fontSize: 24,
    fontWeight: "800",
    color: "#f8fafc",
    letterSpacing: 0.5,
    textAlign: "center",
  },

  altBaslik: {
    fontSize: 14,
    color: "#38bdf8",
    marginTop: 4,
    marginBottom: 10,
    fontWeight: "600",
  },

  konum: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(56, 189, 248, 0.08)",
    paddingVertical: 5,
    paddingHorizontal: 12,
    borderRadius: 20,
    marginBottom: 16,
    gap: 6,
  },

  konumYazi: {
    color: "#94a3b8",
    fontSize: 13,
    fontWeight: "500",
  },

  bioKutu: {
    backgroundColor: "rgba(255, 255, 255, 0.03)",
    borderRadius: 12,
    padding: 12,
    marginBottom: 18,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.05)",
  },

  bioYazi: {
    color: "#cbd5e1",
    fontSize: 12.5,
    textAlign: "center",
    lineHeight: 18,
  },

  sectionTitle: {
    color: "#64748b",
    fontSize: 11,
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: 1,
    marginBottom: 10,
    alignSelf: "flex-start",
  },

  etiketKapsayici: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 6,
    marginBottom: 24,
    justifyContent: "center",
  },

  etiket: {
    fontSize: 11.5,
    color: "#e2e8f0",
    backgroundColor: "rgba(56, 189, 248, 0.1)",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 8,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "rgba(56, 189, 248, 0.2)",
    fontWeight: "500",
  },

  buton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 12,
    gap: 8,
    width: "100%",
    marginBottom: 12,
  },

  birinciButon: {
    backgroundColor: "#0284c7",
    shadowColor: "#0284c7",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },

  iletisimButon: {
    backgroundColor: "transparent",
    borderWidth: 1.5,
    borderColor: "#38bdf8",
    marginBottom: 0,
  },

  butonYazi: {
    color: "#ffffff",
    fontSize: 15,
    fontWeight: "700",
  },

  iletisimYazi: {
    color: "#38bdf8",
  },
});
