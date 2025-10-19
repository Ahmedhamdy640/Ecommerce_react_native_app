# E-Commerce React Native App

A feature-rich e-commerce mobile application built with React Native, Expo, Redux Toolkit, and React Query.

## 📱 Demo Video
https://youtube.com/shorts/-sQDVf7Hrw0 

## ✨ Features

- 📦 Category-based Screen
- 👤 User authentication
- 📱 Responsive mobile UI
- 🔄 State management with Redux Toolkit
- 🌐 API integration with React Query
- 💾 Data persistence with AsyncStorage
- 🔐 Biometric authentication support

## 🚀 Setup and Installation

### Prerequisites

Before you begin, ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v16 or higher)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- [Expo CLI](https://docs.expo.dev/get-started/installation/)
- [Git](https://git-scm.com/)

For mobile development:
- **iOS**: macOS with Xcode installed
- **Android**: Android Studio with Android SDK

### Installation Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/Ahmedhamdy640/Ecommerce_react_native_app.git
   cd ecommerce_react_native_app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npx expo start
   ```

4. **Run on your preferred platform**
   
   - **iOS Simulator** (macOS only):
     ```bash
     npx expo run:ios
     ```
   
   - **Android Emulator**:
     ```bash
     npx expo run:android
     ```

## 🔑 Test Credentials

### Super Admin User
- **Username**: `emilys`
- **Password**: `emilyspass`

This user has full access to all features and product management capabilities.

## 📱 Specific Category Screen

The app includes a dedicated **Smartphones** category screen that showcases:
- smartphone products

## 🏗️ Project Structure

```
ecommerce_react_native_app/
├── src/
│   ├── components/      # Reusable UI components
│   ├── screens/         # App screens
│   ├── navigation/      # Navigation configuration
│   ├── store/          # Redux store and slices
│   ├── services/       # API services
│   ├── hooks/          # Custom React hooks
│   ├── utils/          # Utility functions
│   └── types/          # TypeScript type definitions
├── assets/             # Images, fonts, and other assets
└── App.tsx            # Root component
```

## 🛠️ Tech Stack

- **Framework**: React Native with Expo
- **Language**: TypeScript
- **State Management**: Redux Toolkit
- **Data Fetching**: TanStack React Query (formerly React Query)
- **Navigation**: React Navigation
- **Storage**: AsyncStorage with Redux Persist
- **HTTP Client**: Axios
- **UI Components**: React Native built-in components

## Trade-offs and Design Decisions

### Trade-offs Made

1. **Expo vs React Native CLI**
   - Chose Expo for faster development and easier setup
   - Trade-off: Limited access to some native modules

2. **Redux Toolkit + React Query**
   - Used Redux for app-wide state (user session)
   - Used React Query for server state (products, API data)
   - Trade-off: Added complexity but better separation of concerns

3. **AsyncStorage for Persistence**
   - Simple and reliable for mobile apps
   - Trade-off: 
   - tried to use MMKV but it has a problem with expo and got issue
   - link to issue:  https://github.com/mrousavy/react-native-mmkv/issues/733

4. **Basic Authentication**
   - Implemented simple token-based auth
   - Trade-off: Not as secure as OAuth or more advanced methods

## 🚧 If I Had More Time

### Features I Would Add

1. **Enhanced UI/UX**
   - Implement skeleton loaders for better perceived performance
   - Add animations and transitions using React Native Reanimated
   - Create a more polished onboarding experience
   - Implement dark mode theme

2. **Advanced Features**
   - Product reviews and ratings system
   - Wishlist/favorites functionality
   - Order history and tracking
   - Push notifications for deals and order updates
   - Advanced search with filters (price range, brand, ratings)

3. **Payment Integration**
   - Integrate Stripe or PayPal for real payments

4. **Performance Optimizations**
   - Add pagination/infinite scroll for product lists
   - Optimize bundle size
   - Add error boundaries for better error handling

5. **Testing**
   - Unit tests with Jest
   - Integration tests with React Native Testing Library

7. **Social Features**
   - Social login (Google, Facebook, Apple)

9. **Analytics & Monitoring**
   - Integrate analytics (Firebase Analytics, Mixpanel)
   - Error tracking (Sentry)
   - Performance monitoring

10. **Internationalization**
    - Multi-language support
    - Multi-currency support
    - Regional product variations

## 📝 Notes
- Biometric authentication requires device support
