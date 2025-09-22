import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface Props {
  children: React.ReactNode;
}

interface State {
  hasError: boolean;
  errorMessage: string;
}

export default class ErrorBoundary extends React.Component<Props, State> {
  state: State = { hasError: false, errorMessage: '' };

  static getDerivedStateFromError(error: unknown): State {
    const message = typeof error === 'object' && error !== null && 'message' in error ? String((error as any).message) : 'Bilinmeyen hata';
    return { hasError: true, errorMessage: message };
  }

  componentDidCatch(error: unknown, info: unknown) {
    console.log('[ErrorBoundary] Caught error', { error, info });
  }

  render() {
    if (this.state.hasError) {
      return (
        <View style={styles.container} testID="error-boundary">
          <Text style={styles.title}>Bir şeyler ters gitti</Text>
          <Text style={styles.subtitle}>Lütfen geri dönüp tekrar deneyin.</Text>
          <Text style={styles.details}>{this.state.errorMessage}</Text>
        </View>
      );
    }
    return this.props.children;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fef7f8',
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 8,
    color: '#171112',
  },
  subtitle: {
    fontSize: 14,
    color: '#87646a',
    marginBottom: 12,
    textAlign: 'center',
  },
  details: {
    fontSize: 12,
    color: '#9e868c',
    textAlign: 'center',
  },
});
