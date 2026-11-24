import { createContext, useContext, useState } from "react";

const SepetContext = createContext(null);

export function SepetProvider({ children }) {
  const [sepet, setSepet] = useState([]);

  function sepeteEkle(urun) {
    setSepet((onceki) => {
      const varMi = onceki.some((s) => s.id === urun.id);

      return varMi
        ? onceki.map((s) => (s.id === urun.id ? { ...s, adet: s.adet + 1 } : s))
        : [...onceki, { ...urun, adet: 1 }];
    });
  }

  return (
    <SepetContext.Provider value={{ sepet, sepeteEkle }}>
      {children}
    </SepetContext.Provider>
  );
}

export function useSepet() {
  const deger = useContext(SepetContext);

  if (deger === null) {
    throw new Error("useSepet, SepetProvider içinde kullanılmalı");
  }

  return deger;
}
