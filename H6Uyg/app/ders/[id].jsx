import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { courses } from '../../data/courses';

export default function DersDetay() {
  const { id } = useLocalSearchParams();
  const router = useRouter();

  const course = courses.find((c) => c.id === id);

  if (!course) {
    return (
      <View style={styles.container}>
        <Text style={styles.error}>Hata: Aradığınız ders bulunamadı ({id})!</Text>
        <Button title="Geri Dön" onPress={() => router.back()} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{course.name}</Text>
      <Text>Gün: {course.day}</Text>
      <Text>Saat: {course.time}</Text>
      <Text>Sınıf: {course.classroom}</Text>
      <Text>Öğretim Elemanı: {course.instructor}</Text>
      <View style={{ marginTop: 20 }}>
        <Button title="Geri Dön" onPress={() => router.back()} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center' },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 15 },
  error: { fontSize: 18, color: 'red', marginBottom: 15 }
});