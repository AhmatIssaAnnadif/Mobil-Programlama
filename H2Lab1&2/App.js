import {
  View,
  Text,
  Image,
  Pressable,
  StyleSheet,
  ScrollView,
} from "react-native";

function ProfileHeader() {
  return (
    <View style={styles.header}>
      <Image
        source={require("./assets/images.jpeg")}
        style={styles.profileImage}
      />

      <Text style={styles.name}>Ayşe Yılmaz</Text>
      <Text style={styles.department}>Yazılım Mühendisliği</Text>
      <Text style={styles.university}>Karabük Üniversitesi</Text>
    </View>
  );
}

function ContactInfo() {
  return (
    <View style={styles.infoBox}>
      <Text>ayse@example.com</Text>
      <Text>05xx xxx xx xx</Text>
      <Text>Karabük</Text>
    </View>
  );
}

function Interests() {
  return (
    <View style={styles.interestsContainer}>
      <View style={styles.tag}>
        <Text>React Native</Text>
      </View>
      <View style={styles.tag}>
        <Text>JavaScript</Text>
      </View>
      <View style={styles.tag}>
        <Text>AI</Text>
      </View>
    </View>
  );
}

function ProfileButtons() {
  return (
    <View style={styles.buttonContainer}>
      <Pressable style={styles.button}>
        <Text style={styles.buttonText}>Mesaj Gönder</Text>
      </Pressable>

      <Pressable style={styles.button}>
        <Text style={styles.buttonText}>Profili Paylaş</Text>
      </Pressable>
    </View>
  );
}

export default function ProfileScreen() {
  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.title}>Dijital Profil</Text>

        <ProfileHeader />

        <Text style={styles.bio}>
          Mobil uygulama geliştirme ve yapay zekâ ile ilgileniyorum.
        </Text>

        <ContactInfo />

        <Text style={styles.sectionTitle}>İlgi Alanlarım</Text>

        <Interests />

        <ProfileButtons />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 20,
    backgroundColor: "#F3F4F6",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  header: {
    alignItems: "center",
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 16,
  },
  name: {
    fontSize: 26,
    fontWeight: "bold",
  },
  department: {
    fontSize: 18,
    marginTop: 6,
  },
  university: {
    fontSize: 15,
    marginTop: 4,
  },
  bio: {
    fontSize: 14,
    textAlign: "center",
    marginTop: 16,
  },
  infoBox: {
    width: "100%",
    padding: 16,
    marginTop: 20,
    borderWidth: 1,
    borderRadius: 12,
    gap: 8,
    backgroundColor: "#FFFFFF",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 10,
  },
  interestsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 8,
  },
  tag: {
    padding: 8,
    borderRadius: 12,
    backgroundColor: "#DDEAFE",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
    marginTop: 20,
  },
  button: {
    padding: 12,
    borderRadius: 10,
    backgroundColor: "#2563EB",
  },
  buttonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
  },
});
