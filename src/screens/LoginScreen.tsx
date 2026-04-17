import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Alert,
  ScrollView,
} from 'react-native';
import { useAuth } from '../contexts/AuthContext';

export default function LoginScreen() {
  const { signInWithGoogle } = useAuth();
  const [loading, setLoading] = useState(false);

  const handleGoogleSignIn = async () => {
    setLoading(true);
    try {
      await signInWithGoogle();
    } catch (error: any) {
      Alert.alert('Sign In Error', error.message || 'Failed to sign in with Google');
    } finally {
      setLoading(false);
    }
  };

  const topics = [
    'Arrays', 'Hashing', 'Two Pointers', 'Sliding Window', 'Stack',
    'Binary Search', 'Linked List', 'Trees', 'Heap', 'Graphs',
    'Dynamic Programming', 'Tries', 'Backtracking', 'Scalability',
    'Load Balancing', 'Caching', 'Microservices', 'CAP Theorem',
    'Sharding', 'Message Queues', 'CDN', 'Networking', 'TCP/IP',
    'Operating Systems', 'Concurrency', 'Threads', 'Databases',
    'REST APIs', 'Docker', 'Recursion', 'BFS/DFS', 'Sorting',
    'Greedy', 'Bit Manipulation', 'Algorithms', 'Design Patterns',
  ];

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        {/* Word Cloud Background */}
        <View style={styles.wordCloudContainer}>
          {topics.map((topic, index) => (
            <Text
              key={index}
              style={[
                styles.wordCloudItem,
                {
                  fontSize: 12 + Math.random() * 16,
                  opacity: 0.3 + Math.random() * 0.4,
                  top: `${Math.random() * 80}%`,
                  left: `${Math.random() * 80}%`,
                },
              ]}>
              {topic}
            </Text>
          ))}
        </View>

        {/* Login Content */}
        <View style={styles.loginContent}>
          <Text style={styles.title}>CodeMaster 90</Text>
          <Text style={styles.subtitle}>
            Your Complete Interview Preparation Journey
          </Text>

          <TouchableOpacity
            style={styles.googleButton}
            onPress={handleGoogleSignIn}
            disabled={loading}>
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <>
                <View style={styles.googleIcon}>
                  <Text style={styles.googleIconText}>G</Text>
                </View>
                <Text style={styles.googleButtonText}>Sign in with Google</Text>
              </>
            )}
          </TouchableOpacity>

          <Text style={styles.note}>
            Your data will be securely stored in Firebase and synced across all
            your devices.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  wordCloudContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    overflow: 'hidden',
  },
  wordCloudItem: {
    position: 'absolute',
    color: '#e50914',
    fontWeight: 'bold',
  },
  loginContent: {
    width: '100%',
    maxWidth: 400,
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    padding: 40,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#e50914',
  },
  title: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#e50914',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#ffffff',
    marginBottom: 40,
    textAlign: 'center',
  },
  googleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#e50914',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 5,
    width: '100%',
    marginBottom: 20,
  },
  googleIcon: {
    width: 24,
    height: 24,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  googleIconText: {
    color: '#e50914',
    fontWeight: 'bold',
    fontSize: 16,
  },
  googleButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  note: {
    fontSize: 12,
    color: '#999999',
    textAlign: 'center',
    lineHeight: 18,
  },
});

// Made with Bob
