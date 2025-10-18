import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RootStack } from "./navigation/RootStack";
import { Provider, useSelector } from "react-redux";
import { store, persistor, RootState } from "./store";
import { PersistGate } from "redux-persist/integration/react";
import useIdleTimer from "./hooks/useIdleTimer";
import { LockScreen } from "./screens/lock/LockScreen";

const queryClient = new QueryClient();

function AppContent() {
  const isLocked = useSelector((state: RootState) => state.lock.isLocked);
  const panResponder = useIdleTimer();

  return (
    <View style={styles.container} {...panResponder.panHandlers}>
      <StatusBar style="dark" />
      <RootStack />
      {isLocked && <LockScreen />}
    </View>
  );
}

export default function App() {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <PersistGate loading={null} persistor={persistor}>
          <AppContent />
        </PersistGate>
      </QueryClientProvider>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
