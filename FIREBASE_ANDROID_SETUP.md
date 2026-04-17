# Firebase Setup for Android - Interview Prep Planner

## Step-by-Step Firebase Configuration for Android

### 1. Firebase Console Setup

#### A. Create/Access Firebase Project
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Either create a new project or use your existing project (if you already set up the web version)
3. Click on your project name

#### B. Add Android App
1. Click the **Android icon** (or "Add app" → "Android")
2. Fill in the registration form:
   - **Android package name**: `com.interviewprepplanner` (MUST match exactly)
   - **App nickname**: Interview Prep Planner (optional)
   - **Debug signing certificate SHA-1**: (optional for now, needed for Google Sign-In)

#### C. Get SHA-1 Certificate (Required for Google Sign-In)

Run this command in your terminal:
```bash
cd android
./gradlew signingReport
```

Look for the SHA-1 under "Variant: debug" and copy it. Add it to Firebase Console.

#### D. Download google-services.json
1. Click "Download google-services.json"
2. Move the file to: `android/app/google-services.json`
3. **IMPORTANT**: Never commit this file to Git (it's in .gitignore)

### 2. Enable Firebase Services

#### A. Enable Authentication
1. In Firebase Console, go to **Authentication**
2. Click **Get Started**
3. Go to **Sign-in method** tab
4. Enable **Google** provider:
   - Click on Google
   - Toggle "Enable"
   - Select a support email
   - Click "Save"

#### B. Enable Firestore Database
1. Go to **Firestore Database**
2. Click **Create database**
3. Choose **Start in production mode** (we'll add rules next)
4. Select a location (choose closest to your users)
5. Click "Enable"

#### C. Set Firestore Security Rules
Go to **Rules** tab and paste:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // User data - only authenticated users can read/write their own data
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Allow users to read their own progress
    match /progress/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

Click **Publish**

### 3. Install Firebase Packages

```bash
npm install @react-native-firebase/app @react-native-firebase/auth @react-native-firebase/firestore
# or
yarn add @react-native-firebase/app @react-native-firebase/auth @react-native-firebase/firestore
```

### 4. Configure Android Project

#### A. Update android/build.gradle

Add Google Services plugin:

```gradle
buildscript {
    ext {
        buildToolsVersion = "34.0.0"
        minSdkVersion = 21
        compileSdkVersion = 34
        targetSdkVersion = 34
        ndkVersion = "26.1.10909125"
        kotlinVersion = "1.9.22"
    }
    repositories {
        google()
        mavenCentral()
    }
    dependencies {
        classpath("com.android.tools.build:gradle")
        classpath("com.facebook.react:react-native-gradle-plugin")
        classpath("org.jetbrains.kotlin:kotlin-gradle-plugin")
        // Add this line
        classpath("com.google.gms:google-services:4.4.0")
    }
}
```

#### B. Update android/app/build.gradle

Add at the bottom of the file:

```gradle
apply plugin: "com.google.gms.google-services"
```

Also ensure you have:

```gradle
android {
    defaultConfig {
        applicationId "com.interviewprepplanner"
        minSdkVersion rootProject.ext.minSdkVersion
        targetSdkVersion rootProject.ext.targetSdkVersion
        versionCode 1
        versionName "1.0"
        multiDexEnabled true  // Add this if not present
    }
}

dependencies {
    // ... other dependencies
    implementation platform('com.google.firebase:firebase-bom:32.7.0')
}
```

### 5. Verify Installation

Create a test file to verify Firebase is working:

```typescript
// src/services/firebase.ts
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

export const testFirebaseConnection = async () => {
  try {
    // Test Firestore connection
    const testDoc = await firestore().collection('test').doc('connection').get();
    console.log('Firestore connected:', testDoc.exists);
    
    // Test Auth
    console.log('Auth initialized:', auth().currentUser);
    
    return true;
  } catch (error) {
    console.error('Firebase connection error:', error);
    return false;
  }
};
```

### 6. Rebuild the App

After configuration, rebuild:

```bash
# Clean build
cd android
./gradlew clean
cd ..

# Rebuild and run
npm run android
```

### 7. Test Google Sign-In

Create a simple test component:

```typescript
import React from 'react';
import { Button, View } from 'react-native';
import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

// Configure Google Sign-In
GoogleSignin.configure({
  webClientId: 'YOUR_WEB_CLIENT_ID_FROM_GOOGLE_SERVICES_JSON',
});

const TestAuth = () => {
  const signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const { idToken } = await GoogleSignin.signIn();
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      await auth().signInWithCredential(googleCredential);
      console.log('Signed in successfully!');
    } catch (error) {
      console.error('Sign in error:', error);
    }
  };

  return (
    <View>
      <Button title="Sign In with Google" onPress={signIn} />
    </View>
  );
};
```

### 8. Common Issues & Solutions

#### Issue: "google-services.json not found"
**Solution**: Ensure the file is in `android/app/google-services.json`

#### Issue: "Default FirebaseApp is not initialized"
**Solution**: 
- Check google-services.json is in correct location
- Rebuild the app: `cd android && ./gradlew clean && cd .. && npm run android`

#### Issue: Google Sign-In not working
**Solution**:
- Verify SHA-1 certificate is added in Firebase Console
- Check webClientId in GoogleSignin.configure()
- Ensure Google Sign-In is enabled in Firebase Console

#### Issue: Firestore permission denied
**Solution**: Check security rules allow authenticated users to access their data

### 9. Environment Variables (Optional)

For better security, you can use environment variables:

```bash
# .env
FIREBASE_API_KEY=your_api_key
FIREBASE_AUTH_DOMAIN=your_auth_domain
FIREBASE_PROJECT_ID=your_project_id
```

Install react-native-config:
```bash
npm install react-native-config
```

### 10. Data Structure

Your Firestore database will have this structure:

```
users/
  {userId}/
    email: string
    displayName: string
    photoURL: string
    createdAt: timestamp
    lastSync: timestamp
    
progress/
  {userId}/
    completedProblems: array
    currentDay: number
    currentPhase: number
    lastUpdated: timestamp
    problemsData: map
```

### 11. Next Steps

After Firebase is set up:
1. ✅ Create authentication service
2. ✅ Create Firestore service for data sync
3. ✅ Implement login screen
4. ✅ Port web components to React Native
5. ✅ Test data sync across devices

## Resources

- [React Native Firebase Docs](https://rnfirebase.io/)
- [Firebase Console](https://console.firebase.google.com/)
- [Google Sign-In Setup](https://rnfirebase.io/auth/social-auth#google)
- [Firestore Security Rules](https://firebase.google.com/docs/firestore/security/get-started)

## Support

If you encounter issues:
1. Check the [React Native Firebase documentation](https://rnfirebase.io/)
2. Review [common issues](https://rnfirebase.io/faqs-and-tips)
3. Open an issue on GitHub