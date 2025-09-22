import React, { ReactNode } from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  errorMessage: string | null;
}

export default class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, errorMessage: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    console.log('[ErrorBoundary] getDerivedStateFromError', error?.message);
    return { hasError: true, errorMessage: error?.message ?? 'Bilinmeyen hata' };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.log('[ErrorBoundary] componentDidCatch', error?.message, info?.componentStack);
  }

  render() {
    if (this.state.hasError) {
      return (
        <View style={styles.container} testID="error-boundary">
          <Text style={styles.title}>Bir şeyler ters gitti</Text>
          <Text style={styles.message}>{this.state.errorMessage ?? 'Beklenmeyen bir hata oluştu.'}</Text>
        </View>
      );
    }
    return this.props.children as React.ReactElement;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 8,
  },
  message: {
    fontSize: 14,
    textAlign: 'center',
  },
});
