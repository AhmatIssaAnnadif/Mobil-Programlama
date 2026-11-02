
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  ScrollView,
  StyleSheet,
} from "react-native";

export default function HomeScreen() {
  // États des champs de saisie
  const [gelir, setGelir] = useState("");
  const [kira, setKira] = useState("");
  const [ulasim, setUlasim] = useState("");
  const [yemek, setYemek] = useState("");
  const [diger, setDiger] = useState("");

  // États des résultats
  const [toplamGider, setToplamGider] = useState(null);
  const [kalanButce, setKalanButce] = useState(null);
  const [harcamaOrani, setHarcamaOrani] = useState(null);
  const [butceDurumu, setButceDurumu] = useState("");

  // Calcul du budget
  const hesapla = () => {
    // Le revenu est obligatoire
    if (gelir.trim() === "") {
      setButceDurumu("Lütfen gelir bilgisi giriniz.");
      return;
    }

    // Conversion des chaînes en nombres
    const g = parseFloat(gelir);
    const k = kira.trim() === "" ? 0 : parseFloat(kira);
    const u = ulasim.trim() === "" ? 0 : parseFloat(ulasim);
    const y = yemek.trim() === "" ? 0 : parseFloat(yemek);
    const d = diger.trim() === "" ? 0 : parseFloat(diger);

    // Validation du revenu
    if (!Number.isFinite(g) || g <= 0) {
      setButceDurumu("Geçerli bir gelir tutarı giriniz.");
      return;
    }

    // Validation des dépenses
    if (![k, u, y, d].every(Number.isFinite)) {
      setButceDurumu("Geçerli gider tutarları giriniz.");
      return;
    }

    if (k < 0 || u < 0 || y < 0 || d < 0) {
      setButceDurumu("Giderler negatif olamaz.");
      return;
    }

    // Calculs
    const toplam = k + u + y + d;
    const kalan = g - toplam;
    const oran = (toplam / g) * 100;

    // Enregistrement des résultats
    setToplamGider(toplam);
    setKalanButce(kalan);
    setHarcamaOrani(oran);

    // Détermination de l'état du budget
    if (oran <= 50) {
      setButceDurumu("Bütçeniz dengeli görünüyor.");
    } else if (oran <= 75) {
      setButceDurumu("Harcamalarınızı takip etmeye devam edin.");
    } else if (oran <= 100) {
      setButceDurumu("Bütçenizin büyük bölümünü kullanıyorsunuz.");
    } else {
      setButceDurumu("Giderleriniz gelirinizi aşıyor.");
    }
  };

  // Réinitialisation du formulaire et des résultats
  const temizle = () => {
    setGelir("");
    setKira("");
    setUlasim("");
    setYemek("");
    setDiger("");

    setToplamGider(null);
    setKalanButce(null);
    setHarcamaOrani(null);
    setButceDurumu("");
  };

  // Affichage de l'écran
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>
        Kişisel Bütçe Hesaplayıcı
      </Text>

      <Text style={styles.subtitle}>
        Gelir ve gider bilgilerinizi giriniz.
      </Text>

      {/* Champ du revenu */}
      <Text style={styles.label}>Aylık Gelir (TL)</Text>
      <TextInput
        style={styles.input}
        placeholder="Örn: 30000"
        keyboardType="decimal-pad"
        value={gelir}
        onChangeText={setGelir}
      />

      {/* Champ du loyer */}
      <Text style={styles.label}>Kira (TL)</Text>
      <TextInput
        style={styles.input}
        placeholder="Örn: 12000"
        keyboardType="decimal-pad"
        value={kira}
        onChangeText={setKira}
      />

      {/* Champ du transport */}
      <Text style={styles.label}>Ulaşım (TL)</Text>
      <TextInput
        style={styles.input}
        placeholder="Örn: 2500"
        keyboardType="decimal-pad"
        value={ulasim}
        onChangeText={setUlasim}
      />

      {/* Champ de l'alimentation */}
      <Text style={styles.label}>Yemek (TL)</Text>
      <TextInput
        style={styles.input}
        placeholder="Örn: 6000"
        keyboardType="decimal-pad"
        value={yemek}
        onChangeText={setYemek}
      />

      {/* Champ des autres dépenses */}
      <Text style={styles.label}>Diğer Giderler (TL)</Text>
      <TextInput
        style={styles.input}
        placeholder="Örn: 3000"
        keyboardType="decimal-pad"
        value={diger}
        onChangeText={setDiger}
      />

      {/* Boutons */}
      <View style={styles.buttonContainer}>
        <Pressable
          style={styles.calculateButton}
          onPress={hesapla}
        >
          <Text style={styles.buttonText}>Hesapla</Text>
        </Pressable>

        <Pressable
          style={styles.clearButton}
          onPress={temizle}
        >
          <Text style={styles.buttonText}>Temizle</Text>
        </Pressable>
      </View>

      {/* Résultats : affichés après un calcul valide */}
      {toplamGider !== null && (
        <View style={styles.resultCard}>
          <Text style={styles.resultTitle}>
            Bütçe Özeti
          </Text>

          <Text style={styles.resultText}>
            Toplam Gider:{" "}
            {toplamGider.toLocaleString("tr-TR")} TL
          </Text>

          <Text style={styles.resultText}>
            Kalan Bütçe:{" "}
            {kalanButce.toLocaleString("tr-TR")} TL
          </Text>

          <Text style={styles.resultText}>
            Kullanılan Bütçe: %{harcamaOrani.toFixed(1)}
          </Text>

          {/* Alerte si le budget est négatif */}
          {kalanButce < 0 && (
            <Text style={styles.warningText}>
              Bütçe Açığı:{" "}
              {Math.abs(kalanButce).toLocaleString("tr-TR")} TL
            </Text>
          )}

          <Text style={styles.statusText}>
            {butceDurumu}
          </Text>
        </View>
      )}

      {/* Message d'erreur ou de situation */}
      {toplamGider === null && butceDurumu !== "" && (
        <Text style={styles.statusText}>
          {butceDurumu}
        </Text>
      )}
    </ScrollView>
  );
}

// Styles de l'application
const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: "#F5F5F5",
  },

  title: {
    fontSize: 26,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 30,
    marginBottom: 10,
  },

  subtitle: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 25,
    color: "#555555",
  },

  label: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 6,
    marginTop: 12,
  },

  input: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#CCCCCC",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },

  buttonContainer: {
    flexDirection: "row",
    gap: 12,
    marginTop: 25,
    marginBottom: 20,
  },

  calculateButton: {
    flex: 1,
    backgroundColor: "#2563EB",
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
  },

  clearButton: {
    flex: 1,
    backgroundColor: "#6B7280",
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
  },

  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },

  resultCard: {
    backgroundColor: "#FFFFFF",
    padding: 18,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#DDDDDD",
    marginTop: 10,
    marginBottom: 30,
  },

  resultTitle: {
    fontSize: 21,
    fontWeight: "bold",
    marginBottom: 15,
  },

  resultText: {
    fontSize: 16,
    marginBottom: 10,
  },

  warningText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#DC2626",
    marginTop: 8,
  },

  statusText: {
    fontSize: 16,
    fontWeight: "600",
    marginTop: 15,
    lineHeight: 24,
  },
});
