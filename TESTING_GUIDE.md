# 🧪 Testing Guide - Interview Prep Planner Android

Complete step-by-step guide to test your Android app.

## Prerequisites

Before testing, ensure you have:
- ✅ Android Studio installed
- ✅ Node.js (v18+) installed
- ✅ JDK 17 installed
- ✅ Android SDK configured

## Option 1: Test on Android Emulator (Recommended for First Test)

### Step 1: Set Up Android Emulator

#### A. Open Android Studio
```bash
# If not installed, download from:
# https://developer.android.com/studio
```

#### B. Create Virtual Device
1. Open Android Studio
2. Click **More Actions** → **Virtual Device Manager**
3. Click **Create Device**
4. Select a device (e.g., **Pixel 5**)
5. Click **Next**
6. Select a system image (e.g., **Android 13 (API 33)**)
7. Click **Next** → **Finish**

#### C. Start Emulator
1. In Virtual Device Manager, click the **Play** button next to your device
2. Wait for the emulator to fully boot (you'll see the home screen)

### Step 2: Verify Emulator is Running

```bash
# Check if emulator is detected
adb devices

# You should see something like:
# List of devices attached
# emulator-5554   device
```

### Step 3: Start Metro Bundler

Open a new terminal:

```bash
cd /Users/khuzaimashakeel/Desktop/personal_dev/android/InterviewPrepPlanner
npm start
```

Keep this terminal running. You should see:
```
Welcome to Metro!
Fast - Scalable - Integrated

To reload the app press "r"
To open developer menu press "d"
```

### Step 4: Build and Run the App

Open another terminal:

```bash
cd /Users/khuzaimashakeel/Desktop/personal_dev/android/InterviewPrepPlanner
npm run android
```

This will:
1. Build the Android app
2. Install it on the emulator
3. Launch the app

**First build takes 5-10 minutes** - be patient!

### Step 5: What You Should See

✅ **Success**: You should see the Login screen with:
- Black background
- "CodeMaster 90" title in red
- Animated word cloud of topics
- "Sign in with Google" button

❌ **If you see errors**, check the [Troubleshooting](#troubleshooting) section below.

---

## Option 2: Test on Physical Android Device

### Step 1: Enable Developer Options

1. Go to **Settings** → **About Phone**
2. Tap **Build Number** 7 times
3. You'll see "You are now a developer!"

### Step 2: Enable USB Debugging

1. Go to **Settings** → **Developer Options**
2. Enable **USB Debugging**
3. Enable **Install via USB** (if available)

### Step 3: Connect Device to Computer

1. Connect your Android device via USB cable
2. On your device, you'll see a prompt: **"Allow USB debugging?"**
3. Check **"Always allow from this computer"**
4. Tap **OK**

### Step 4: Verify Device Connection

```bash
adb devices

# You should see your device:
# List of devices attached
# ABC123XYZ   device
```

### Step 5: Run the App

```bash
cd /Users/khuzaimashakeel/Desktop/personal_dev/android/InterviewPrepPlanner

# Terminal 1: Start Metro
npm start

# Terminal 2: Run on device
npm run android
```

The app will install and launch on your physical device!

---

## Testing Without Firebase (Initial Test)

Since you haven't added `google-services.json` yet, the app will build but Google Sign-In won't work. Here's what to test:

### ✅ What Should Work:
1. **App launches** - Black screen with login UI
2. **UI renders** - Title, subtitle, button visible
3. **Word cloud animates** - Topics floating in background
4. **Button is clickable** - Can tap "Sign in with Google"

### ❌ What Won't Work Yet:
1. **Google Sign-In** - Will show error (expected without Firebase setup)
2. **Authentication** - Can't sign in yet

### Expected Error:
When you click "Sign in with Google", you'll see:
```
Sign In Error
Default FirebaseApp is not initialized
```

**This is normal!** You need to complete Firebase setup first.

---

## Complete Firebase Setup for Full Testing

### Step 1: Add Android App to Firebase

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select project: **interview-prep-planner**
3. Click **Android icon** to add Android app
4. Enter package name: `com.interviewprepplanner`
5. Click **Register app**

### Step 2: Download google-services.json

1. Click **Download google-services.json**
2. Move file to:
   ```bash
   /Users/khuzaimashakeel/Desktop/personal_dev/android/InterviewPrepPlanner/android/app/google-services.json
   ```

### Step 3: Get SHA-1 Certificate

```bash
cd /Users/khuzaimashakeel/Desktop/personal_dev/android/InterviewPrepPlanner/android
./gradlew signingReport
```

Look for output like:
```
Variant: debug
Config: debug
Store: ~/.android/debug.keystore
Alias: AndroidDebugKey
MD5: XX:XX:XX:XX:XX:XX:XX:XX:XX:XX:XX:XX:XX:XX:XX:XX
SHA1: AA:BB:CC:DD:EE:FF:00:11:22:33:44:55:66:77:88:99:AA:BB:CC:DD
SHA-256: ...
```

Copy the **SHA1** value.

### Step 4: Add SHA-1 to Firebase

1. In Firebase Console, go to **Project Settings**
2. Scroll to **Your apps** → Select your Android app
3. Click **Add fingerprint**
4. Paste the SHA-1 value
5. Click **Save**

### Step 5: Update Web Client ID

1. Open `google-services.json` and find:
   ```json
   "oauth_client": [
     {
       "client_id": "YOUR_WEB_CLIENT_ID.apps.googleusercontent.com",
       "client_type": 3
     }
   ]
   ```

2. Copy the `client_id` value

3. Edit `src/contexts/AuthContext.tsx`:
   ```typescript
   GoogleSignin.configure({
     webClientId: 'PASTE_YOUR_WEB_CLIENT_ID_HERE',
   });
   ```

### Step 6: Rebuild and Test

```bash
# Clean build
cd android
./gradlew clean
cd ..

# Rebuild and run
npm run android
```

### Step 7: Test Google Sign-In

1. App launches with login screen
2. Click **"Sign in with Google"**
3. Google Sign-In dialog appears
4. Select your Google account
5. ✅ **Success!** You should see: "Welcome to CodeMaster 90! Signed in as: [Your Name]"

---

## Troubleshooting

### Error: "SDK location not found"

**Solution:**
```bash
# Create local.properties file
echo "sdk.dir=$ANDROID_HOME" > android/local.properties
```

### Error: "Command failed: ./gradlew"

**Solution:**
```bash
cd android
chmod +x gradlew
cd ..
npm run android
```

### Error: "Unable to load script"

**Solution:**
```bash
# Reset Metro cache
npm start -- --reset-cache

# In another terminal
npm run android
```

### Error: "INSTALL_FAILED_UPDATE_INCOMPATIBLE"

**Solution:**
```bash
# Uninstall old version
adb uninstall com.interviewprepplanner

# Reinstall
npm run android
```

### Error: "Default FirebaseApp is not initialized"

**Solution:**
1. Ensure `google-services.json` is in `android/app/`
2. Clean and rebuild:
   ```bash
   cd android
   ./gradlew clean
   cd ..
   npm run android
   ```

### Error: "Google Sign-In failed"

**Solution:**
1. Verify SHA-1 is added in Firebase Console
2. Check `webClientId` in `AuthContext.tsx` matches `google-services.json`
3. Ensure Google Sign-In is enabled in Firebase Console

### App crashes on launch

**Solution:**
```bash
# Check logs
adb logcat | grep -i "error\|exception"

# Or use React Native debugger
npm start
# Press 'd' in Metro terminal
# Select "Open Debugger"
```

---

## Testing Checklist

### Basic Functionality
- [ ] App launches without crashing
- [ ] Login screen displays correctly
- [ ] Word cloud animates smoothly
- [ ] Button responds to touch
- [ ] UI matches Netflix theme (black/red)

### Firebase Integration (After Setup)
- [ ] Google Sign-In dialog appears
- [ ] Can select Google account
- [ ] Successfully signs in
- [ ] User name/email displays
- [ ] Can sign out (when implemented)

### Performance
- [ ] App loads in < 3 seconds
- [ ] Animations are smooth (60 FPS)
- [ ] No memory leaks
- [ ] Battery usage is reasonable

---

## Development Tools

### React Native Debugger

```bash
# Install
brew install --cask react-native-debugger

# Run
open "rndebugger://set-debugger-loc?host=localhost&port=8081"
```

### Flipper (Facebook's debugging tool)

```bash
# Install
brew install --cask flipper

# Run
open -a Flipper
```

### View Logs

```bash
# All logs
adb logcat

# Filter by app
adb logcat | grep "InterviewPrepPlanner"

# Clear logs
adb logcat -c
```

### Reload App

- **Shake device** or press `Cmd+M` (emulator)
- Select **"Reload"**
- Or press `r` twice in Metro terminal

---

## Next Steps After Testing

Once the app runs successfully:

1. **Implement Main Screens**
   - Home screen with 90-day plan
   - Problem bank
   - Progress tracker

2. **Add Navigation**
   ```bash
   npm install @react-navigation/native @react-navigation/stack
   ```

3. **Port Problem Data**
   - Copy problem bank from web version
   - Create TypeScript interfaces

4. **Implement Data Sync**
   - Real-time Firestore updates
   - Offline mode with AsyncStorage

5. **Add Features**
   - Daily reminders
   - Progress charts
   - Code editor

---

## Quick Reference Commands

```bash
# Start Metro
npm start

# Run on Android
npm run android

# Clean build
cd android && ./gradlew clean && cd ..

# Check devices
adb devices

# View logs
adb logcat

# Uninstall app
adb uninstall com.interviewprepplanner

# Reset cache
npm start -- --reset-cache
```

---

## Support

If you encounter issues:
1. Check this guide's [Troubleshooting](#troubleshooting) section
2. Review [FIREBASE_ANDROID_SETUP.md](./FIREBASE_ANDROID_SETUP.md)
3. Check [React Native documentation](https://reactnative.dev/docs/troubleshooting)
4. Open an issue on [GitHub](https://github.com/Khuzaima05/Interview-prep-android/issues)

---

**Happy Testing! 🚀**