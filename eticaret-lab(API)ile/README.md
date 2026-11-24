# E-Ticaret Mobil Uygulamas API ile (React Native & Expo Router)

Bu proje, Mobil Programlama laboratuvarı kapsamında **React Native**, **Expo** ve **Expo Router** kullanılarak JavaScript (`.js`) ile geliştirilmiş üç sayfalı bir e-ticaret mobil uygulamasıdır.

## Özellikler

- **Ürün Listeleme (`app/index.js`):** DummyJSON REST API üzerinden gerçek zamanlı ürün verilerini çeker, yüklenme ve hata durumlarını yönetir.
- **Canlı Ürün Arama:** Arama çubuğu aracılığıyla API üzerinde dinamik ürün araması yapar.
- **Dinamik Ürün Detayı (`app/urun/[id].js`):** Seçilen ürünün ID parametresine göre detay bilgilerini, puanını ve indirimli fiyat hesaplamasını gösterir.
- **Sepet Yönetimi (`app/sepet.js` & `context/SepetContext.js`):** Context API ve özel `useSepet` hook'u ile sayfalar arası ortak sepet durumu yönetilir; ürün ekleme, silme, adet artırma/azaltma ve toplam tutar hesaplama işlemleri yapılır.

## Kullanılan Teknolojiler

- React Native & Expo
- Expo Router (Dosya tabanlı yönlendirme)
- React Hooks (`useState`, `useEffect`, `useContext`)
- DummyJSON Products API

