import React from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { AuthProvider, useAuth } from './src/contexts/AuthContext';
import LoginScreen from './src/screens/LoginScreen';

function AppContent() {
  const { user } = useAuth();

  if (!user) {
    return <LoginScreen />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#000000" />
      <View style={styles.content}>
        <Text style={styles.title}>Welcome to CodeMaster 90!</Text>
        <Text style={styles.subtitle}>
          Signed in as: {user.displayName || user.email}
        </Text>
        <Text style={styles.note}>
          Main app screens will be implemented here
        </Text>
      </View>
    </SafeAreaView>
  );
}

function App(): React.JSX.Element {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#e50914',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#ffffff',
    marginBottom: 20,
    textAlign: 'center',
  },
  note: {
    fontSize: 14,
    color: '#999999',
    textAlign: 'center',
    marginTop: 40,
  },
});

export default App;

// Made with Bob
