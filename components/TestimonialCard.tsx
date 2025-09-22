import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors } from '@/constants/colors';

interface TestimonialCardProps {
  title: string;
  content: string;
}

export const TestimonialCard: React.FC<TestimonialCardProps> = ({ title, content }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.content}>{content}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: 256,
    backgroundColor: Colors.secondary,
    borderRadius: 16,
    padding: 20,
    marginHorizontal: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.textPrimary,
    marginBottom: 8,
  },
  content: {
    fontSize: 14,
    color: Colors.textSecondary,
    lineHeight: 20,
  },
});