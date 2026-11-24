
import { Image, useColorScheme } from 'react-native';

// images
import DarkLogo from '../assets/favicon.png'; //dark
import LightLogo from '../assets/android-icon-monochrome.png';

const ThemedLogo = () => {
  const colorScheme = useColorScheme();

  const logo = colorScheme === 'dark' ? DarkLogo : LightLogo;

  return (
    <Image source={logo} />
  );
};

export default ThemedLogo;
