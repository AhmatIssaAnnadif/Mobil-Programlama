import React, { useState } from 'react';

import {
  View,
  Text,
  TextInput,
  Pressable,
  Switch,
  ScrollView,
  Alert,
  StyleSheet,
  StatusBar
} from 'react-native';

import {
  SafeAreaProvider,
  SafeAreaView
} from 'react-native-safe-area-context';

// TEKNİK DESTEK EKRANI
function TeknikDestekEkrani() {

  // 1. FORM DURUMLARI
  const [adSoyad, setAdSoyad] = useState('');
  const [birim, setBirim] = useState('');
  const [baslik, setBaslik] = useState('');
  const [aciklama, setAciklama] = useState('');

  const [kategori, setKategori] = useState('');
  const [oncelik, setOncelik] = useState('Orta');
  const [acil, setAcil] = useState(false);

  const [sonTalep, setSonTalep] = useState(null);

  // 2. SEÇENEKLER
  const kategoriler = [
    'Bilgisayar',
    'Yazıcı',
    'İnternet',
    'Yazılım'
  ];

  const oncelikler = [
    'Düşük',
    'Orta',
    'Yüksek'
  ];

  // 3. FORM TEMİZLEME
  const formuTemizle = () => {
    setAdSoyad('');
    setBirim('');
    setBaslik('');
    setAciklama('');
    setKategori('');
    setOncelik('Orta');
    setAcil(false);
  };

  // 4. TALEP OLUŞTURMA
  const talepOlustur = () => {

    if (
      !adSoyad.trim() ||
      !birim.trim() ||
      !baslik.trim()
    ) {
      Alert.alert(
        'Eksik Bilgi',
        'Lütfen zorunlu alanları doldurunuz.'
      );
      return;
    }

    if (aciklama.trim().length < 10) {
      Alert.alert(
        'Geçersiz Açıklama',
        'Arıza açıklaması en az 10 karakter olmalıdır.'
      );
      return;
    }

    if (!kategori) {
      Alert.alert(
        'Kategori Eksik',
        'Lütfen bir arıza kategorisi seçiniz.'
      );
      return;
    }

    const yeniTalep = {
      id: 'TLP-' + Date.now(),
      adSoyad: adSoyad.trim(),
      birim: birim.trim(),
      baslik: baslik.trim(),
      aciklama: aciklama.trim(),
      kategori: kategori,
      oncelik: oncelik,
      acil: acil,
      durum: 'Açık',
      tarih: new Date().toLocaleString('tr-TR')
    };

    setSonTalep(yeniTalep);

    formuTemizle();

    Alert.alert(
      'İşlem Başarılı',
      'Teknik destek talebiniz oluşturuldu.'
    );
  };

  // 5. EKRAN ARAYÜZÜ
  return (
    <SafeAreaView style={styles.container}>

      <StatusBar
        barStyle="dark-content"
        backgroundColor="#f1f5f9"
      />

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
      >

        {/* UYGULAMA BAŞLIĞI */}
        <View style={styles.header}>

          <Text style={styles.title}>
            Teknik Destek Sistemi
          </Text>

          <Text style={styles.subtitle}>
            Yeni Arıza Bildirimi
          </Text>

          <Text style={styles.description}>
            Teknik sorunlarınız için destek
            talebi oluşturabilirsiniz.
          </Text>

        </View>

        {/* KULLANICI BİLGİLERİ */}
        <Text style={styles.sectionTitle}>
          Kullanıcı Bilgileri
        </Text>

        <Text style={styles.label}>
          Ad Soyad *
        </Text>

        <TextInput
          style={styles.input}
          placeholder="Adınızı ve soyadınızı giriniz"
          placeholderTextColor="#94a3b8"
          value={adSoyad}
          onChangeText={setAdSoyad}
          autoCapitalize="words"
        />

        <Text style={styles.label}>
          Birim *
        </Text>

        <TextInput
          style={styles.input}
          placeholder="Örn: Öğrenci İşleri"
          placeholderTextColor="#94a3b8"
          value={birim}
          onChangeText={setBirim}
        />

        {/* ARIZA BİLGİLERİ */}
        <Text style={styles.sectionTitle}>
          Arıza Bilgileri
        </Text>

        <Text style={styles.label}>
          Arıza Başlığı *
        </Text>

        <TextInput
          style={styles.input}
          placeholder="Örn: Bilgisayar açılmıyor"
          placeholderTextColor="#94a3b8"
          value={baslik}
          onChangeText={setBaslik}
        />

        <Text style={styles.label}>
          Arıza Açıklaması *
        </Text>

        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Yaşadığınız sorunu açıklayınız"
          placeholderTextColor="#94a3b8"
          value={aciklama}
          onChangeText={setAciklama}
          multiline={true}
          textAlignVertical="top"
        />

        {/* KATEGORİ SEÇİMİ */}
        <Text style={styles.label}>
          Arıza Kategorisi *
        </Text>

        <View style={styles.optionsContainer}>

          {kategoriler.map((item) => (
            <Pressable
              key={item}
              onPress={() => setKategori(item)}
              style={[
                styles.optionButton,
                kategori === item &&
                  styles.selectedOption
              ]}
            >
              <Text
                style={[
                  styles.optionText,
                  kategori === item &&
                    styles.selectedOptionText
                ]}
              >
                {item}
              </Text>
            </Pressable>
          ))}

        </View>

        {/* ÖNCELİK SEÇİMİ */}
        <Text style={styles.label}>
          Öncelik Seviyesi
        </Text>

        <View style={styles.optionsContainer}>

          {oncelikler.map((item) => (
            <Pressable
              key={item}
              onPress={() => setOncelik(item)}
              style={[
                styles.optionButton,
                oncelik === item &&
                  styles.selectedOption
              ]}
            >
              <Text
                style={[
                  styles.optionText,
                  oncelik === item &&
                    styles.selectedOptionText
                ]}
              >
                {item}
              </Text>
            </Pressable>
          ))}

        </View>

        {/* ACİL MÜDAHALE */}
        <View style={styles.switchContainer}>

          <View style={styles.switchLabelArea}>

            <Text style={styles.switchText}>
              Acil Müdahale Talebi
            </Text>

            <Text style={styles.switchHint}>
              Sorun acil müdahale gerektiriyorsa
              etkinleştiriniz.
            </Text>

          </View>

          <Switch
            value={acil}
            onValueChange={setAcil}
            trackColor={{
              false: '#cbd5e1',
              true: '#93c5fd'
            }}
            thumbColor={
              acil ? '#2563eb' : '#f8fafc'
            }
          />

        </View>

        {/* TALEP OLUŞTUR BUTONU */}
        <Pressable
          style={styles.submitButton}
          onPress={talepOlustur}
        >
          <Text style={styles.submitButtonText}>
            Talep Oluştur
          </Text>
        </Pressable>

        {/* FORM TEMİZLEME BUTONU */}
        <Pressable
          style={styles.clearButton}
          onPress={formuTemizle}
        >
          <Text style={styles.clearButtonText}>
            Formu Temizle
          </Text>
        </Pressable>

        {/* SON TALEP KARTI */}
        {sonTalep !== null && (

          <View style={styles.resultCard}>

            <Text style={styles.resultTitle}>
              Talebiniz Oluşturuldu
            </Text>

            <Text style={styles.resultLabel}>
              Talep Numarası
            </Text>
            <Text style={styles.resultValue}>
              {sonTalep.id}
            </Text>

            <Text style={styles.resultLabel}>
              Talep Sahibi
            </Text>
            <Text style={styles.resultValue}>
              {sonTalep.adSoyad}
            </Text>

            <Text style={styles.resultLabel}>
              Birim
            </Text>
            <Text style={styles.resultValue}>
              {sonTalep.birim}
            </Text>

            <Text style={styles.resultLabel}>
              Arıza Başlığı
            </Text>
            <Text style={styles.resultValue}>
              {sonTalep.baslik}
            </Text>

            <Text style={styles.resultLabel}>
              Açıklama
            </Text>
            <Text style={styles.resultValue}>
              {sonTalep.aciklama}
            </Text>

            <Text style={styles.resultLabel}>
              Kategori
            </Text>
            <Text style={styles.resultValue}>
              {sonTalep.kategori}
            </Text>

            <Text style={styles.resultLabel}>
              Öncelik
            </Text>
            <Text style={styles.resultValue}>
              {sonTalep.oncelik}
            </Text>

            <Text style={styles.resultLabel}>
              Acil Müdahale
            </Text>
            <Text style={styles.resultValue}>
              {sonTalep.acil ? 'Evet' : 'Hayır'}
            </Text>

            <Text style={styles.resultLabel}>
              Talep Durumu
            </Text>
            <Text style={styles.resultValue}>
              {sonTalep.durum}
            </Text>

            <Text style={styles.resultLabel}>
              Oluşturulma Tarihi
            </Text>
            <Text style={styles.resultValue}>
              {sonTalep.tarih}
            </Text>

          </View>

        )}

        <Text style={styles.footer}>
          Üniversite Bilgi İşlem - Teknik Destek
        </Text>

      </ScrollView>
    </SafeAreaView>
  );
}

// 6. KÖK BİLEŞEN
export default function App() {
  return (
    <SafeAreaProvider>
      <TeknikDestekEkrani />
    </SafeAreaProvider>
  );
}

// 7. STİLLER
const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#f1f5f9'
  },

  scroll: {
    flex: 1
  },

  content: {
    padding: 20,
    paddingBottom: 45
  },

  header: {
    marginBottom: 12
  },

  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#0f172a'
  },

  subtitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2563eb',
    marginTop: 8
  },

  description: {
    fontSize: 14,
    color: '#64748b',
    marginTop: 8,
    lineHeight: 21
  },

  sectionTitle: {
    fontSize: 19,
    fontWeight: 'bold',
    color: '#1e293b',
    marginTop: 24,
    marginBottom: 10
  },

  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#334155',
    marginTop: 12,
    marginBottom: 6
  },

  input: {
    borderWidth: 1,
    borderColor: '#cbd5e1',
    borderRadius: 10,
    backgroundColor: '#ffffff',
    padding: 13,
    fontSize: 15,
    color: '#0f172a'
  },

  textArea: {
    minHeight: 110
  },

  optionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 8
  },

  optionButton: {
    paddingVertical: 10,
    paddingHorizontal: 14,
    backgroundColor: '#e2e8f0',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#cbd5e1'
  },

  selectedOption: {
    backgroundColor: '#2563eb',
    borderColor: '#2563eb'
  },

  optionText: {
    color: '#334155',
    fontSize: 14,
    fontWeight: '500'
  },

  selectedOptionText: {
    color: '#ffffff'
  },

  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 22,
    padding: 14,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    gap: 10
  },

  switchLabelArea: {
    flex: 1
  },

  switchText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#334155'
  },

  switchHint: {
    fontSize: 12,
    color: '#64748b',
    marginTop: 4
  },

  submitButton: {
    backgroundColor: '#2563eb',
    padding: 16,
    borderRadius: 10,
    marginTop: 25,
    alignItems: 'center'
  },

  submitButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold'
  },

  clearButton: {
    backgroundColor: '#ffffff',
    padding: 14,
    borderRadius: 10,
    marginTop: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#cbd5e1'
  },

  clearButtonText: {
    color: '#475569',
    fontSize: 15,
    fontWeight: '600'
  },

  resultCard: {
    backgroundColor: '#dcfce7',
    borderWidth: 1,
    borderColor: '#86efac',
    padding: 18,
    borderRadius: 12,
    marginTop: 25
  },

  resultTitle: {
    fontSize: 19,
    fontWeight: 'bold',
    color: '#166534',
    marginBottom: 12
  },

  resultLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#166534',
    marginTop: 10
  },

  resultValue: {
    fontSize: 15,
    color: '#14532d',
    marginTop: 3
  },

  footer: {
    textAlign: 'center',
    fontSize: 12,
    color: '#94a3b8',
    marginTop: 30
  }

});
