# Interview Prep Planner - Android Setup Guide

## 📱 React Native Android Application

This is the Android version of the 90-Day Interview Prep Planner, built with React Native.

## Prerequisites

Before you begin, ensure you have the following installed:

1. **Node.js** (v18 or higher)
   ```bash
   node --version
   ```

2. **Java Development Kit (JDK 17)**
   ```bash
   java -version
   ```

3. **Android Studio** with:
   - Android SDK
   - Android SDK Platform
   - Android Virtual Device (AVD)

4. **React Native CLI**
   ```bash
   npm install -g react-native-cli
   ```

## Environment Setup

### 1. Android Studio Configuration

1. Open Android Studio
2. Go to **Settings** → **Appearance & Behavior** → **System Settings** → **Android SDK**
3. Install the following:
   - Android SDK Platform 34 (or latest)
   - Android SDK Build-Tools
   - Android Emulator
   - Android SDK Platform-Tools

### 2. Environment Variables

Add these to your `~/.bash_profile` or `~/.zshrc`:

```bash
export ANDROID_HOME=$HOME/Library/Android/sdk
export PATH=$PATH:$ANDROID_HOME/emulator
export PATH=$PATH:$ANDROID_HOME/platform-tools
```

Reload your shell:
```bash
source ~/.bash_profile  # or source ~/.zshrc
```

## Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Khuzaima05/Interview-prep-android.git
   cd Interview-prep-android
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Install iOS dependencies (if on macOS)**
   ```bash
   cd ios && pod install && cd ..
   ```

## Running the App

### Android

1. **Start Metro Bundler**
   ```bash
   npm start
   # or
   yarn start
   ```

2. **Run on Android Emulator/Device**
   
   In a new terminal:
   ```bash
   npm run android
   # or
   yarn android
   ```

### iOS (macOS only)

```bash
npm run ios
# or
yarn ios
```

## Firebase Setup

### 1. Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project or use existing one
3. Add an Android app to your Firebase project

### 2. Configure Android App

1. **Register your app**
   - Package name: `com.interviewprepplanner`
   - App nickname: Interview Prep Planner
   - Debug signing certificate SHA-1 (optional for now)

2. **Download google-services.json**
   - Download the `google-services.json` file
   - Place it in `android/app/` directory

3. **Enable Firebase Services**
   - Go to **Authentication** → Enable **Google Sign-In**
   - Go to **Firestore Database** → Create database in production mode
   - Set up security rules (see below)

### 3. Install Firebase Packages

```bash
npm install @react-native-firebase/app @react-native-firebase/auth @react-native-firebase/firestore
# or
yarn add @react-native-firebase/app @react-native-firebase/auth @react-native-firebase/firestore
```

### 4. Configure Firebase in Android

Edit `android/build.gradle`:
```gradle
buildscript {
    dependencies {
        classpath 'com.google.gms:google-services:4.4.0'
    }
}
```

Edit `android/app/build.gradle`:
```gradle
apply plugin: 'com.google.gms.google-services'
```

### 5. Firestore Security Rules

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

## Project Structure

```
InterviewPrepPlanner/
├── android/              # Android native code
├── ios/                  # iOS native code
├── App.tsx              # Main app component
├── src/                 # Source code (to be created)
│   ├── components/      # React components
│   ├── screens/         # Screen components
│   ├── services/        # Firebase services
│   ├── utils/           # Utility functions
│   └── types/           # TypeScript types
├── package.json
└── tsconfig.json
```

## Development Workflow

### 1. Start Development

```bash
# Terminal 1: Start Metro
npm start

# Terminal 2: Run Android
npm run android
```

### 2. Enable Hot Reload

- Press `r` in Metro terminal to reload
- Press `d` to open developer menu
- Enable "Fast Refresh" in developer menu

### 3. Debug

- Shake device or press `Cmd+M` (Android) / `Cmd+D` (iOS)
- Select "Debug" to open Chrome DevTools
- Use React Native Debugger for better experience

## Building for Production

### Android APK

```bash
cd android
./gradlew assembleRelease
```

APK location: `android/app/build/outputs/apk/release/app-release.apk`

### Android App Bundle (for Play Store)

```bash
cd android
./gradlew bundleRelease
```

Bundle location: `android/app/build/outputs/bundle/release/app-release.aab`

## Troubleshooting

### Metro Bundler Issues

```bash
# Clear cache
npm start -- --reset-cache

# Clear watchman
watchman watch-del-all
```

### Android Build Issues

```bash
# Clean build
cd android
./gradlew clean

# Rebuild
cd ..
npm run android
```

### Port Already in Use

```bash
# Kill process on port 8081
lsof -ti:8081 | xargs kill -9
```

## Next Steps

1. ✅ Set up Firebase for Android
2. 🔄 Port web components to React Native
3. 🔄 Implement navigation (React Navigation)
4. 🔄 Add authentication flow
5. 🔄 Implement data sync with Firestore
6. 🔄 Test on physical device
7. 🔄 Build and deploy

## Resources

- [React Native Documentation](https://reactnative.dev/docs/getting-started)
- [React Native Firebase](https://rnfirebase.io/)
- [React Navigation](https://reactnavigation.org/)
- [TypeScript with React Native](https://reactnative.dev/docs/typescript)

## Support

For issues and questions:
- GitHub Issues: [Interview-prep-android](https://github.com/Khuzaima05/Interview-prep-android/issues)
- Web Version: [Interview Prep Planner Web](https://github.com/Khuzaima05/interview-prep-planner)