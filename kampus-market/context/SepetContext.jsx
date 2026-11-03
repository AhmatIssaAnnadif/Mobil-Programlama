import React, { createContext, useContext, useState } from 'react';

const SepetContext = createContext();

export function SepetProvider({ children }) {
  const [sepet, setSepet] = useState([]);

  const sepeteEkle = (urun, adet = 1) => {
    if (urun.stok <= 0) return;

    setSepet((oncekiSepet) => {
      const mevcutIndex = oncekiSepet.findIndex((item) => item.id === urun.id);
      if (mevcutIndex > -1) {
        const yeniSepet = [...oncekiSepet];
        const yeniAdet = yeniSepet[mevcutIndex].adet + adet;
        yeniSepet[mevcutIndex].adet = Math.min(yeniAdet, urun.stok);
        return yeniSepet;
      } else {
        return [...oncekiSepet, { ...urun, adet: Math.min(adet, urun.stok) }];
      }
    });
  };

  const adetArtir = (id) => {
    setSepet((oncekiSepet) =>
      oncekiSepet.map((item) => {
        if (item.id === id) {
          if (item.adet < item.stok) {
            return { ...item, adet: item.adet + 1 };
          }
        }
        return item;
      })
    );
  };

  const adetAzalt = (id) => {
    setSepet((oncekiSepet) =>
      oncekiSepet.map((item) => {
        if (item.id === id && item.adet > 1) {
          return { ...item, adet: item.adet - 1 };
        }
        return item;
      })
    );
  };

  const urunKaldir = (id) => {
    setSepet((oncekiSepet) => oncekiSepet.filter((item) => item.id !== id));
  };

  const sepetiBosalt = () => {
    setSepet([]);
  };

  return (
    <SepetContext.Provider
      value={{ sepet, sepeteEkle, adetArtir, adetAzalt, urunKaldir, sepetiBosalt }}
    >
      {children}
    </SepetContext.Provider>
  );
}

export function useSepet() {
  const context = useContext(SepetContext);
  if (!context) {
    throw new Error('useSepet, SepetProvider içinde kullanılmalıdır!');
  }
  return context;
}