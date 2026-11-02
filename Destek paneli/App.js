import React, { useState } from 'react';
import {
  View,
  Text,
  Pressable,
  FlatList,
  StyleSheet,
  StatusBar,
  useWindowDimensions
} from 'react-native';
import {
  SafeAreaProvider,
  SafeAreaView
} from 'react-native-safe-area-context';
import Ionicons from '@expo/vector-icons/Ionicons';

const baslangicTalepleri = [
  {
    id: 'TLP-1001',
    baslik: 'Bilgisayar açılmıyor',
    kategori: 'Bilgisayar',
    birim: 'Öğrenci İşleri',
    oncelik: 'Yüksek',
    durum: 'Açık'
  },
  {
    id: 'TLP-1002',
    baslik: 'Yazıcı bağlantı sorunu',
    kategori: 'Yazıcı',
    birim: 'Personel Daire Başkanlığı',
    oncelik: 'Orta',
    durum: 'İşlemde'
  },
  {
    id: 'TLP-1003',
    baslik: 'İnternet bağlantısı kesildi',
    kategori: 'İnternet',
    birim: 'Kütüphane',
    oncelik: 'Yüksek',
    durum: 'Açık'
  },
  {
    id: 'TLP-1004',
    baslik: 'Ofis yazılımı hata veriyor',
    kategori: 'Yazılım',
    birim: 'Muhasebe',
    oncelik: 'Düşük',
    durum: 'Tamamlandı'
  },
  {
    id: 'TLP-1005',
    baslik: 'Bilgisayar çok yavaş',
    kategori: 'Bilgisayar',
    birim: 'Mühendislik Fakültesi',
    oncelik: 'Orta',
    durum: 'İşlemde'
  },
  {
    id: 'TLP-1006',
    baslik: 'Yazıcı kağıt sıkıştırıyor',
    kategori: 'Yazıcı',
    birim: 'Rektörlük',
    oncelik: 'Düşük',
    durum: 'Tamamlandı'
  }
];

const filtreler = ['Tümü', 'Açık', 'İşlemde', 'Tamamlandı'];

const oncelikRengi = (oncelik) => {
  if (oncelik === 'Yüksek') return '#f87171';
  if (oncelik === 'Orta') return '#fbbf24';
  return '#4ade80';
};

const durumRengi = (durum) => {
  if (durum === 'Açık') return '#f87171';
  if (durum === 'İşlemde') return '#38bdf8';
  return '#4ade80';
};

function OzetKarti({ baslik, sayi, renk, genislik }) {
  return (
    <View style={[styles.summaryCard, { width: genislik }]}>
      <View style={[styles.summaryIndicator, { backgroundColor: renk }]} />
      <Text style={[styles.summaryNumber, { color: renk }]}>{sayi}</Text>
      <Text style={styles.summaryLabel}>{baslik}</Text>
    </View>
  );
}

function TalepKarti({ talep, onDurumDegistir }) {
  const tamamlandi = talep.durum === 'Tamamlandı';

  return (
    <View style={styles.ticketCard}>
      <View style={styles.ticketTop}>
        <Text style={styles.ticketId}>{talep.id}</Text>
        <View style={[styles.priorityBadge, { backgroundColor: oncelikRengi(talep.oncelik) + '20' }]}>
          <Text style={[styles.priorityText, { color: oncelikRengi(talep.oncelik) }]}>
            {talep.oncelik}
          </Text>
        </View>
      </View>

      <Text style={styles.ticketTitle}>{talep.baslik}</Text>

      <View style={styles.detailRow}>
        <Ionicons name="folder-outline" size={14} color="#94a3b8" />
        <Text style={styles.ticketDetail}>{talep.kategori} • {talep.birim}</Text>
      </View>

      <View style={styles.ticketBottom}>
        <View style={[styles.statusBadge, { backgroundColor: durumRengi(talep.durum) + '20' }]}>
          <Text style={[styles.statusText, { color: durumRengi(talep.durum) }]}>
            {talep.durum}
          </Text>
        </View>

        {!tamamlandi && (
          <Pressable 
            style={({ pressed }) => [styles.actionButton, pressed && { opacity: 0.8 }]}
            onPress={() => onDurumDegistir(talep.id)}
          >
            <Text style={styles.actionText}>
              {talep.durum === 'Açık' ? 'İşleme Al' : 'Tamamla'}
            </Text>
            <Ionicons name="arrow-forward" size={14} color="#ffffff" />
          </Pressable>
        )}

        {tamamlandi && (
          <View style={styles.completedContainer}>
            <Ionicons name="checkmark-circle" size={16} color="#4ade80" />
            <Text style={styles.completedText}>Tamamlandı</Text>
          </View>
        )}
      </View>
    </View>
  );
}

export default function App() {
  const [talepler, setTalepler] = useState(baslangicTalepleri);
  const [aktifFiltre, setAktifFiltre] = useState('Tümü');

  const { width } = useWindowDimensions();
  const sutunSayisi = width >= 600 ? 4 : 2;
  const kartGenisligi = (width - 40 - (sutunSayisi - 1) * 10) / sutunSayisi;

  const toplam = talepler.length;
  const acik = talepler.filter(item => item.durum === 'Açık').length;
  const islemde = talepler.filter(item => item.durum === 'İşlemde').length;
  const tamamlanan = talepler.filter(item => item.durum === 'Tamamlandı').length;

  const filtreliTalepler = talepler.filter(item => {
    if (aktifFiltre === 'Tümü') return true;
    return item.durum === aktifFiltre;
  });

  const durumDegistir = (id) => {
    setTalepler(oncekiTalepler =>
      oncekiTalepler.map(item => {
        if (item.id !== id) return item;
        let yeniDurum = item.durum;
        if (item.durum === 'Açık') yeniDurum = 'İşlemde';
        else if (item.durum === 'İşlemde') yeniDurum = 'Tamamlandı';
        return { ...item, durum: yeniDurum };
      })
    );
  };

  const listeBasligi = (
    <View>
      <View style={styles.header}>
        <View style={styles.headerTopRow}>
          <Ionicons name="construct" size={22} color="#38bdf8" />
          <Text style={styles.headerLabel}>BİLGİ İŞLEM MERKEZİ</Text>
        </View>
        <Text style={styles.title}>Destek Paneli</Text>
        <Text style={styles.subtitle}>Arıza ve talep yönetim sistemi</Text>
      </View>

      <View style={styles.summaryGrid}>
        <OzetKarti baslik="Toplam" sayi={toplam} renk="#38bdf8" genislik={kartGenisligi} />
        <OzetKarti baslik="Açık" sayi={acik} renk="#f87171" genislik={kartGenisligi} />
        <OzetKarti baslik="İşlemde" sayi={islemde} renk="#fbbf24" genislik={kartGenisligi} />
        <OzetKarti baslik="Biten" sayi={tamamlanan} renk="#4ade80" genislik={kartGenisligi} />
      </View>

      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Talep Listesi</Text>
        <Text style={styles.sectionCount}>{filtreliTalepler.length} kayıt</Text>
      </View>

      <View style={styles.filterContainer}>
        {filtreler.map(filtre => (
          <Pressable
            key={filtre}
            onPress={() => setAktifFiltre(filtre)}
            style={[
              styles.filterButton,
              aktifFiltre === filtre && styles.activeFilter
            ]}
          >
            <Text style={[styles.filterText, aktifFiltre === filtre && styles.activeFilterText]}>
              {filtre}
            </Text>
          </Pressable>
        ))}
      </View>
    </View>
  );

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor="#090d16" />
        <FlatList
          data={filtreliTalepler}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <TalepKarti talep={item} onDurumDegistir={durumDegistir} />
          )}
          ListHeaderComponent={listeBasligi}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Ionicons name="folder-open-outline" size={40} color="#64748b" />
              <Text style={styles.emptyTitle}>Kayıt Bulunamadı</Text>
              <Text style={styles.emptyText}>Bu filtreye ait aktif talep bulunmuyor.</Text>
            </View>
          }
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#090d16'
  },
  listContent: {
    paddingHorizontal: 20,
    paddingBottom: 40,
    flexGrow: 1
  },
  header: {
    backgroundColor: 'rgba(30, 41, 59, 0.7)',
    borderRadius: 20,
    padding: 20,
    marginTop: 10,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)'
  },
  headerTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 6
  },
  headerLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: '#38bdf8',
    letterSpacing: 1
  },
  title: {
    fontSize: 26,
    fontWeight: '800',
    color: '#f8fafc'
  },
  subtitle: {
    fontSize: 13,
    color: '#94a3b8',
    marginTop: 4
  },
  summaryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginBottom: 24
  },
  summaryCard: {
    backgroundColor: 'rgba(30, 41, 59, 0.6)',
    borderRadius: 16,
    padding: 14,
    minHeight: 100,
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.05)'
  },
  summaryIndicator: {
    width: 24,
    height: 3,
    borderRadius: 2,
    marginBottom: 8
  },
  summaryNumber: {
    fontSize: 26,
    fontWeight: '800'
  },
  summaryLabel: {
    color: '#94a3b8',
    fontSize: 12,
    marginTop: 4,
    fontWeight: '600'
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#f8fafc'
  },
  sectionCount: {
    fontSize: 12,
    color: '#94a3b8',
    fontWeight: '600'
  },
  filterContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 20
  },
  filterButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.05)'
  },
  activeFilter: {
    backgroundColor: '#0284c7',
    borderColor: '#38bdf8'
  },
  filterText: {
    color: '#94a3b8',
    fontSize: 13,
    fontWeight: '600'
  },
  activeFilterText: {
    color: '#ffffff'
  },
  ticketCard: {
    backgroundColor: 'rgba(30, 41, 59, 0.7)',
    padding: 18,
    borderRadius: 18,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)'
  },
  ticketTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  ticketId: {
    color: '#64748b',
    fontSize: 12,
    fontWeight: '600'
  },
  priorityBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20
  },
  priorityText: {
    fontSize: 11,
    fontWeight: '700'
  },
  ticketTitle: {
    color: '#f8fafc',
    fontSize: 16,
    fontWeight: '700',
    marginTop: 10
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 6
  },
  ticketDetail: {
    color: '#94a3b8',
    fontSize: 12.5
  },
  ticketBottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 16,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.05)',
    paddingTop: 12
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8
  },
  statusText: {
    fontSize: 11.5,
    fontWeight: '700'
  },
  actionButton: {
    backgroundColor: '#0284c7',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 10,
    gap: 6
  },
  actionText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '700'
  },
  completedContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6
  },
  completedText: {
    fontSize: 12,
    color: '#4ade80',
    fontWeight: '600'
  },
  emptyContainer: {
    alignItems: 'center',
    padding: 40,
    backgroundColor: 'rgba(30, 41, 59, 0.4)',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.05)',
    marginTop: 10
  },
  emptyTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#f8fafc',
    marginTop: 10
  },
  emptyText: {
    fontSize: 12.5,
    color: '#94a3b8',
    marginTop: 4,
    textAlign: 'center'
  }
});