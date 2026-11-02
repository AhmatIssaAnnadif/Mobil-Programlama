//Exercice 1 — Multiplier les nombres par 3
const sayilar = [5, 10, 15, 20];

const uckati = sayilar.map(sayi => sayi * 3);

console.log(uckati); // [15, 30, 45, 60]

//Exercice 2 — Boutons Pressable avec sélection bleue
//Énoncé : transformer quatre catégories en boutons et afficher la catégorie sélectionnée en bleu.
import { useState } from "react";
import { View, Text, Pressable } from "react-native";

export default function App() {
  const kategoriler = [
    "Bilgisayar",
    "Yazıcı",
    "İnternet",
    "Yazılım"
  ];

  const [kategori, setKategori] = useState("");

  return (
    <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 8 }}>
      {kategoriler.map((item) => (
        <Pressable
          key={item}
          onPress={() => setKategori(item)}
          style={{
            backgroundColor: kategori === item ? "blue" : "#eeeeee",
            padding: 12,
            borderRadius: 8
          }}
        >
          <Text
            style={{
              color: kategori === item ? "white" : "black"
            }}
          >
            {item}
          </Text>
        </Pressable>
      ))}
    </View>
  );
}

//Exercice 3 — Extraire uniquement les titres baslik
const talepler = [
  { id: "TLP-1", baslik: "İnternet yok" },
  { id: "TLP-2", baslik: "Yazıcı arızası" },
  { id: "TLP-3", baslik: "Bilgisayar açılmıyor" }
];

const basliklar = talepler.map(talep => talep.baslik);

console.log(basliklar);

//Exercice 4 — Filtrer les demandes ouvertes et afficher des cartes
//Énoncé : sélectionner les demandes dont durum vaut "Açık", puis les afficher avec map().
const talepler2 = [
  {
    id: "TLP-1",
    baslik: "İnternet yok",
    durum: "Açık"
  },
  {
    id: "TLP-2",
    baslik: "Yazıcı sorunu",
    durum: "İşlemde"
  },
  {
    id: "TLP-3",
    baslik: "Bilgisayar açılmıyor",
    durum: "Açık"
  }
];

const acikTalepler = talepler2.filter(
  talep => talep.durum === "Açık"
);

//Exercice 5 — Modifier le statut d'une seule demande
//Énoncé : mettre à jour le statut d'une demande sans modifier les autres objets.
setTalepler(onceki =>
  onceki.map(talep =>
    talep.id === hedefId
      ? { ...talep, durum: "Kapalı" }
      : talep
  )
);

// hafta 5 icin : Exemple complet : distinguer l'appui court et l'appui long
import React, { useState } from "react";
import { View, Text, Pressable } from "react-native";

export default function App() {
  const [basili, setBasili] = useState(false);

  return (
    <View style={{ padding: 30 }}>
      <Pressable
        onPressIn={() => setBasili(true)}
        onPressOut={() => setBasili(false)}
        onPress={() => console.log("Kısa dokunma")}
        onLongPress={() => console.log("Uzun dokunma")}
        style={{
          padding: 14,
          backgroundColor: basili ? "#C9DDF5" : "#E7EEF7"
        }}
      >
        <Text>Bir kez veya uzun bas</Text>
      </Pressable>
    </View>
  );
}
//hafta 5 ausi 
import React, { useState } from "react";
import { View, TextInput } from "react-native";

export default function App() {
  const [baslik, setBaslik] = useState("");
  const [odak, setOdak] = useState(false);

  return (
    <View style={{ padding: 20 }}>
      <TextInput
        value={baslik}
        onChangeText={setBaslik}
        onFocus={() => setOdak(true)}
        onBlur={() => setOdak(false)}
        placeholder="Arıza başlığı"
        style={{
          borderWidth: 1,
          borderColor: odak ? "#276EB0" : "#A6A6A6",
          padding: 12
        }}
      />
    </View>
  );
}