import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { courses } from '../../data/courses';

export default function CourseDetailScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();

  const course = courses.find((c) => c.id === id);

  if (!course) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>⚠️ Hata: Böyle bir ders ID'si bulunamadı ({id}).</Text>
        <Button title="Geri Dön" onPress={() => router.back()} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{course.name}</Text>
      <Text style={styles.label}>Gün: {course.day}</Text>
      <Text style={styles.label}>Saat: {course.time}</Text>
      <Text style={styles.label}>Sınıf: {course.classroom}</Text>
      <Text style={styles.label}>Öğretim Elemanı: {course.instructor}</Text>
      
      <View style={styles.btn}>
        <Button title="Geri Dön" onPress={() => router.back()} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center' },
  errorContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  errorText: { fontSize: 16, color: 'red', marginBottom: 15, textAlign: 'center' },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 15, color: '#2980b9' },
  label: { fontSize: 16, marginBottom: 10, color: '#333' },
  btn: { marginTop: 20 }
});