
import React, { useState } from "react";

import {
  View,
  Text,
  Pressable,
  FlatList,
  StyleSheet,
} from "react-native";

const baslangicTalepleri = [
  {
    id: "1",
    baslik: "Klima arızası",
    aciklama: "Klima soğuk hava üflemiyor.",
    kategori: "Klima",
    durum: "Bekliyor",
  },
  {
    id: "2",
    baslik: "Bilgisayar açılmıyor",
    aciklama: "Bilgisayar güç düğmesine basınca açılmıyor.",
    kategori: "Bilgisayar",
    durum: "İşlemde",
  },
  {
    id: "3",
    baslik: "Yazıcı çalışmıyor",
    aciklama: "Yazıcı kağıt almıyor.",
    kategori: "Yazıcı",
    durum: "Tamamlandı",
  },
  {
    id: "4",
    baslik: "İnternet bağlantısı",
    aciklama: "Ofiste internet bağlantısı kesiliyor.",
    kategori: "İnternet",
    durum: "Bekliyor",
  },
];

const filtreler = [
  "Tümü",
  "Bekliyor",
  "İşlemde",
  "Tamamlandı",
];

export default function App() {
  const [talepler, setTalepler] = useState(
    baslangicTalepleri
  );

  const [aktifFiltre, setAktifFiltre] = useState("Tümü");

  // Seçilen duruma göre listeyi filtrele
  const filtreliTalepler = talepler.filter((item) => {
    return (
      aktifFiltre === "Tümü" ||
      item.durum === aktifFiltre
    );
  });

  // Bir talebin durumunu değiştir
  const durumDegistir = (id) => {
    setTalepler((onceki) =>
      onceki.map((item) => {
        if (item.id !== id) {
          return item;
        }

        let yeniDurum;

        if (item.durum === "Bekliyor") {
          yeniDurum = "İşlemde";
        } else if (item.durum === "İşlemde") {
          yeniDurum = "Tamamlandı";
        } else {
          yeniDurum = "Bekliyor";
        }

        return {
          ...item,
          durum: yeniDurum,
        };
      })
    );
  };

  const durumRengi = (durum) => {
    if (durum === "Bekliyor") {
      return "#D97706";
    }

    if (durum === "İşlemde") {
      return "#2563EB";
    }

    return "#16A34A";
  };

  const renderTalep = ({ item }) => (
    <View style={styles.kart}>
      <Text style={styles.kartBaslik}>
        {item.baslik}
      </Text>

      <Text style={styles.aciklama}>
        {item.aciklama}
      </Text>

      <Text style={styles.kategori}>
        Kategori: {item.kategori}
      </Text>

      <View style={styles.altSatir}>
        <Text
          style={[
            styles.durum,
            { color: durumRengi(item.durum) },
          ]}
        >
          {item.durum}
        </Text>

        <Pressable
          style={styles.durumButonu}
          onPress={() => durumDegistir(item.id)}
        >
          <Text style={styles.durumButonuYazi}>
            Durumu Değiştir
          </Text>
        </Pressable>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.baslik}>
        Teknik Destek Talepleri
      </Text>

      <Text style={styles.toplam}>
        Toplam talep: {talepler.length}
      </Text>

      {/* Filtre butonları */}
      <View style={styles.filtreler}>
        {filtreler.map((filtre) => {
          const aktif = aktifFiltre === filtre;

          return (
            <Pressable
              key={filtre}
              onPress={() => setAktifFiltre(filtre)}
              style={[
                styles.filtreButonu,
                aktif && styles.aktifFiltre,
              ]}
            >
              <Text
                style={[
                  styles.filtreYazi,
                  aktif && styles.aktifFiltreYazi,
                ]}
              >
                {filtre}
              </Text>
            </Pressable>
          );
        })}
      </View>

      <Text style={styles.sonucBaslik}>
        Gösterilen talepler: {filtreliTalepler.length}
      </Text>

      {/* Filtrelenmiş talepler */}
      <FlatList
        data={filtreliTalepler}
        keyExtractor={(item) => item.id}
        renderItem={renderTalep}
        contentContainerStyle={styles.liste}
        ListEmptyComponent={
          <Text style={styles.bosMesaj}>
            Bu durumda talep bulunamadı.
          </Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F3F4F6",
    paddingTop: 55,
    paddingHorizontal: 16,
  },

  baslik: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#111827",
    marginBottom: 8,
  },

  toplam: {
    fontSize: 14,
    color: "#6B7280",
    marginBottom: 18,
  },

  filtreler: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 18,
  },

  filtreButonu: {
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 20,
    backgroundColor: "#E5E7EB",
  },

  aktifFiltre: {
    backgroundColor: "#2563EB",
  },

  filtreYazi: {
    color: "#374151",
    fontSize: 13,
    fontWeight: "600",
  },

  aktifFiltreYazi: {
    color: "#FFFFFF",
  },

  sonucBaslik: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 12,
    color: "#374151",
  },

  liste: {
    paddingBottom: 24,
  },

  kart: {
    backgroundColor: "#FFFFFF",
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },

  kartBaslik: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#111827",
    marginBottom: 8,
  },

  aciklama: {
    fontSize: 14,
    color: "#4B5563",
    marginBottom: 8,
  },

  kategori: {
    fontSize: 13,
    color: "#6B7280",
    marginBottom: 12,
  },

  altSatir: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
    gap: 10,
  },

  durum: {
    fontSize: 14,
    fontWeight: "bold",
  },

  durumButonu: {
    backgroundColor: "#E5E7EB",
    paddingVertical: 9,
    paddingHorizontal: 12,
    borderRadius: 8,
  },

  durumButonuYazi: {
    fontSize: 12,
    color: "#1F2937",
    fontWeight: "600",
  },

  bosMesaj: {
    textAlign: "center",
    color: "#6B7280",
    marginTop: 30,
  },
});
