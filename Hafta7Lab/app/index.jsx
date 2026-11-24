
import { Text } from 'react-native';

import Spacer from '../components/Spacer';
import ThemedView from '../components/ThemedView';
import ThemedCard from '../components/ThemedCard';
import ThemedLogo from '../components/ThemedLogo';
import ThemedText from '../components/ThemedText';

export default function Home() {
  return (
    <ThemedView style={{ flex: 1, padding: 20 }}>

      <ThemedLogo />
      <ThemedText title>
        Welcome
      </ThemedText>
      <Spacer />
      <ThemedCard>
        <Text>Merhaba!</Text>
        <Spacer />
        <Text>Temaya uyumlu uygulama.</Text>
      </ThemedCard>

    </ThemedView>
  );
}
