import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function CourseCard({ course, onPress }) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Text style={styles.title}>{course.name}</Text>
      <Text>Gün / Saat: {course.day} - {course.time}</Text>
      <Text>Sınıf: {course.classroom}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: { padding: 15, backgroundColor: '#f9f9f9', marginBottom: 10, borderRadius: 8, borderWidth: 1, borderColor: '#ddd' },
  title: { fontSize: 18, fontWeight: 'bold', marginBottom: 5 }
});