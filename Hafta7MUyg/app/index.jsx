
import ThemedView from '../components/ThemedView';
import ThemedLogo from '../components/ThemedLogo';
import ThemedText from '../components/ThemedText';
import ThemedCard from '../components/ThemedCard';
import Spacer from '../components/Spacer';

export default function Index() {
  return (
    <ThemedView style={{ flex: 1, padding: 20 }}>

      {/* Logo */}
      <ThemedLogo />

      <Spacer height={20} />

      {/* Titre */}
      <ThemedText title style={{ fontSize: 28 }}>
        Günlük Planım
      </ThemedText>

      <Spacer height={10} />

      {/* Description */}
      <ThemedText style={{ fontSize: 16 }}>
        Bugün yapmam gereken işleri aşağıda görebilirim.
      </ThemedText>

      <Spacer height={30} />

      {/* Première tâche */}
      <ThemedCard>
        <ThemedText title style={{ fontSize: 18 }}>
          09:00
        </ThemedText>

        <Spacer height={8} />

        <ThemedText>
          Derse gir
        </ThemedText>
      </ThemedCard>

      <Spacer height={15} />

      {/* Deuxième tâche */}
      <ThemedCard>
        <ThemedText title style={{ fontSize: 18 }}>
          12:30
        </ThemedText>

        <Spacer height={8} />

        <ThemedText>
          Öğle arası ver
        </ThemedText>
      </ThemedCard>

      <Spacer height={15} />

      {/* Troisième tâche */}
      <ThemedCard>
        <ThemedText title style={{ fontSize: 18 }}>
          15:00
        </ThemedText>

        <Spacer height={8} />

        <ThemedText>
          Öğrenci ödevlerini kontrol et
        </ThemedText>
      </ThemedCard>

      <Spacer height={15} />

      {/* Quatrième tâche */}
      <ThemedCard>
        <ThemedText title style={{ fontSize: 18 }}>
          20:00
        </ThemedText>

        <Spacer height={8} />

        <ThemedText>
          Kitap oku
        </ThemedText>
      </ThemedCard>

    </ThemedView>
  );
}
