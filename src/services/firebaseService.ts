import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Save user data to Firestore
export async function saveUserData(userId: string, data: any): Promise<void> {
  try {
    await firestore()
      .collection('users')
      .doc(userId)
      .set(data, { merge: true });
  } catch (error) {
    console.error('Error saving data:', error);
    throw error;
  }
}

// Get user data from Firestore
export async function getUserData(userId: string): Promise<any | null> {
  try {
    const docSnapshot = await firestore()
      .collection('users')
      .doc(userId)
      .get();
    
    if (docSnapshot.exists()) {
      return docSnapshot.data();
    } else {
      return null;
    }
  } catch (error) {
    console.error('Error getting data:', error);
    throw error;
  }
}

// Subscribe to real-time updates
export function subscribeToUserData(
  userId: string,
  callback: (data: any) => void
): () => void {
  const unsubscribe = firestore()
    .collection('users')
    .doc(userId)
    .onSnapshot(
      (documentSnapshot) => {
        if (documentSnapshot.exists()) {
          callback(documentSnapshot.data());
        }
      },
      (error) => {
        console.error('Error in subscription:', error);
      }
    );
  
  return unsubscribe;
}

// Migrate AsyncStorage data to Firestore
export async function migrateAsyncStorageToFirestore(userId: string): Promise<any> {
  const storageKeys = {
    day: 'prep-planner-day',
    completed: 'prep-planner-completed',
    notesByDay: 'prep-planner-notes-by-day',
    codeByDay: 'prep-planner-code-by-day',
    watchedResources: 'prep-planner-watched-resources',
    calendarFilter: 'prep-planner-calendar-filter',
    completedDays: 'prep-planner-completed-days',
  };

  try {
    const [
      day,
      completed,
      notesByDay,
      codeByDay,
      watchedResources,
      calendarFilter,
      completedDays,
    ] = await Promise.all([
      AsyncStorage.getItem(storageKeys.day),
      AsyncStorage.getItem(storageKeys.completed),
      AsyncStorage.getItem(storageKeys.notesByDay),
      AsyncStorage.getItem(storageKeys.codeByDay),
      AsyncStorage.getItem(storageKeys.watchedResources),
      AsyncStorage.getItem(storageKeys.calendarFilter),
      AsyncStorage.getItem(storageKeys.completedDays),
    ]);

    const localData = {
      day: Number(day) || 1,
      completed: completed ? JSON.parse(completed) : {},
      notesByDay: notesByDay ? JSON.parse(notesByDay) : {},
      codeByDay: codeByDay ? JSON.parse(codeByDay) : {},
      watchedResources: watchedResources ? JSON.parse(watchedResources) : {},
      calendarFilter: calendarFilter || 'all',
      completedDays: completedDays ? JSON.parse(completedDays) : {},
      lastUpdated: new Date().toISOString(),
    };

    await saveUserData(userId, localData);
    return localData;
  } catch (error) {
    console.error('Error migrating data:', error);
    throw error;
  }
}

// Save data to AsyncStorage (offline backup)
export async function saveToAsyncStorage(key: string, value: any): Promise<void> {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
  } catch (error) {
    console.error('Error saving to AsyncStorage:', error);
  }
}

// Get data from AsyncStorage
export async function getFromAsyncStorage(key: string): Promise<any | null> {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (error) {
    console.error('Error reading from AsyncStorage:', error);
    return null;
  }
}

// Made with Bob
