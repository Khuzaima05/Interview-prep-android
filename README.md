# 📱 Interview Prep Planner - Android

A comprehensive 90-Day Interview Preparation Planner built with React Native for Android devices.

## 🎯 Overview

This Android application helps you systematically prepare for technical interviews over a 90-day period, covering:
- Data Structures & Algorithms (DSA)
- System Design
- Computer Science Fundamentals
- Mock Interviews

## ✨ Features

- **90-Day Structured Plan**: Organized into 3 phases (Foundation, System Design, Advanced Topics)
- **Problem Bank**: 100+ curated coding problems with difficulty levels
- **Progress Tracking**: Track completed problems and daily progress
- **Firebase Integration**: Cloud sync across devices
- **Google Authentication**: Secure sign-in with Google
- **Netflix-Themed UI**: Modern, sleek black and red design
- **Offline Support**: Work without internet, sync when connected

## 🚀 Quick Start

### Prerequisites

- Node.js (v18+)
- Android Studio
- JDK 17
- React Native CLI

### Installation

```bash
# Clone the repository
git clone https://github.com/Khuzaima05/Interview-prep-android.git
cd Interview-prep-android

# Install dependencies
npm install

# Run on Android
npm run android
```

For detailed setup instructions, see [SETUP.md](./SETUP.md)

## 📂 Project Structure

```
InterviewPrepPlanner/
├── android/              # Android native code
├── ios/                  # iOS native code (future)
├── App.tsx              # Main app component
├── src/                 # Source code
│   ├── components/      # Reusable components
│   ├── screens/         # Screen components
│   ├── services/        # Firebase & API services
│   ├── navigation/      # Navigation setup
│   └── utils/           # Helper functions
└── package.json
```

## 🔥 Firebase Setup

1. Create a Firebase project at [Firebase Console](https://console.firebase.google.com/)
2. Add an Android app with package name: `com.interviewprepplanner`
3. Download `google-services.json` and place in `android/app/`
4. Enable Authentication (Google Sign-In) and Firestore Database

See [SETUP.md](./SETUP.md) for detailed Firebase configuration.

## 🎨 Design

The app features a Netflix-inspired design:
- **Background**: Pure black (#000000)
- **Accent**: Netflix red (#e50914)
- **Typography**: Clean, modern fonts
- **Animations**: Smooth transitions and interactions

## 🛠️ Tech Stack

- **Framework**: React Native
- **Language**: TypeScript
- **Backend**: Firebase (Auth + Firestore)
- **Navigation**: React Navigation
- **State Management**: React Hooks
- **UI Components**: React Native Paper / Native Base

## 📱 Screens

1. **Login Screen**: Google Sign-In with animated word cloud
2. **Home Screen**: 90-day plan overview with phase cards
3. **Problem Bank**: Filterable list of coding problems
4. **Problem Detail**: Problem description, hints, and solution
5. **Progress Tracker**: Visual progress charts and statistics
6. **Profile**: User settings and sync status

## 🔄 Development Status

- [x] Project initialization
- [x] Git repository setup
- [ ] Firebase integration
- [ ] Authentication flow
- [ ] Main navigation
- [ ] Home screen
- [ ] Problem bank screen
- [ ] Progress tracking
- [ ] Data sync
- [ ] Testing
- [ ] Production build

## 🧪 Testing

```bash
# Run tests
npm test

# Run with coverage
npm test -- --coverage
```

## 📦 Building

### Debug Build
```bash
npm run android
```

### Release Build
```bash
cd android
./gradlew assembleRelease
```

APK location: `android/app/build/outputs/apk/release/app-release.apk`

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License.

## 🔗 Related Projects

- **Web Version**: [Interview Prep Planner Web](https://github.com/Khuzaima05/interview-prep-planner)
- **Live Demo**: [Deployed on Vercel](https://interview-prep-planner.vercel.app)

## 📞 Support

For issues and questions:
- GitHub Issues: [Create an issue](https://github.com/Khuzaima05/Interview-prep-android/issues)
- Email: khuzaimashakeel@example.com

## 🙏 Acknowledgments

- Problem bank curated from LeetCode, HackerRank, and other platforms
- System design concepts from various industry resources
- UI inspiration from Netflix

---

**Made with ❤️ for interview preparation**
