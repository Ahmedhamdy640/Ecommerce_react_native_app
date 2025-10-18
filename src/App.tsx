import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, PanResponder } from "react-native";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RootStack } from "./navigation/RootStack";
import { Provider } from "react-redux";
import { store, persistor } from "./store";
import { PersistGate } from "redux-persist/integration/react";
import { LockScreen, LockScreenHandles } from "./screens/lock/LockScreen";
import { useRef } from "react";

const queryClient = new QueryClient();

function AppContent() {
  const lockScreenRef = useRef<LockScreenHandles>(null);

  const panResponder =
    lockScreenRef.current?.panResponder ?? PanResponder.create({});

  return (
    <View style={styles.container} {...panResponder.panHandlers}>
      <StatusBar style="dark" />
      <RootStack />
      <LockScreen ref={lockScreenRef} />
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
