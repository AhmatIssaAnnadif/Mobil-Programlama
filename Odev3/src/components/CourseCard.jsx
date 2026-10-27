
import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

export default function CourseCard({ course, onPress }) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Text style={styles.name}>{course.name}</Text>
      <Text style={styles.info}>📅 {course.day} | ⏰ {course.time}</Text>
      <Text style={styles.info}>🏫 {course.classroom}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: { backgroundColor: '#fff', padding: 15, borderRadius: 8, marginBottom: 12, borderWidth: 1, borderColor: '#ddd' },
  name: { fontSize: 16, fontWeight: 'bold', color: '#2c3e50', marginBottom: 5 },
  info: { color: '#555', fontSize: 13, marginBottom: 2 },
});