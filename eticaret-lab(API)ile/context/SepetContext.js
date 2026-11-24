import React, { createContext, useContext, useState } from 'react';

const SepetContext = createContext(null);

export function SepetProvider({ children }) {
  const [sepet, setSepet] = useState([]);

  function sepeteEkle(urun) {
    setSepet((eskiSepet) => {
      const mevcutUrun = eskiSepet.find((item) => item.id === urun.id);

      if (mevcutUrun) {
        return eskiSepet.map((item) =>
          item.id === urun.id ? { ...item, adet: item.adet + 1 } : item
        );
      }

      return [...eskiSepet, { ...urun, adet: 1 }];
    });
  }

  function urunSil(id) {
    setSepet((eskiSepet) => eskiSepet.filter((item) => item.id !== id));
  }

  function adetArtir(id) {
    setSepet((eskiSepet) =>
      eskiSepet.map((item) =>
        item.id === id ? { ...item, adet: item.adet + 1 } : item
      )
    );
  }

  function adetAzalt(id) {
    setSepet((eskiSepet) =>
      eskiSepet.map((item) =>
        item.id === id ? { ...item, adet: Math.max(1, item.adet - 1) } : item
      )
    );
  }

  const toplamTutar = sepet.reduce(
    (toplam, item) => toplam + item.price * item.adet,
    0
  );

  const toplamAdet = sepet.reduce((toplam, item) => toplam + item.adet, 0);

  return (
    <SepetContext.Provider
      value={{
        sepet,
        sepeteEkle,
        urunSil,
        adetArtir,
        adetAzalt,
        toplamTutar,
        toplamAdet,
      }}
    >
      {children}
    </SepetContext.Provider>
  );
}

export function useSepet() {
  const context = useContext(SepetContext);
  if (!context) {
    throw new Error('useSepet, SepetProvider içinde kullanılmalıdır.');
  }
  return context;
}