import { StatusBar } from "expo-status-bar";
import { StyleSheet } from "react-native";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RootStack } from "./navigation/RootStack";

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <StatusBar style="dark" />
      <RootStack />
    </QueryClientProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
