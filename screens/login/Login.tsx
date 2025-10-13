import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { useState } from "react";
import { Button } from "../../components/Button";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../../navigation/RootStack";
import { useLogin } from "../../hooks/useAuth";

// username: "emilys", password: "emilyspass"

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  type LoginNavProp = NativeStackNavigationProp<RootStackParamList, "Login">;
  const navigation = useNavigation<LoginNavProp>();

  const { mutate: login, error } = useLogin();

  const [isLoggingIn, setIsLoggingIn] = useState(false);

  if (isLoggingIn) {
    return <ActivityIndicator size={"large"} style={{ flex: 1 }} />;
  }

  const onLoginPress = ({
    username,
    password,
  }: {
    username: string;
    password: string;
  }) => {
    setIsLoggingIn(true);

    login(
      { username, password },
      {
        onSuccess: (responseData) => {
          if (responseData?.accessToken) {
            navigation.reset({
              index: 0,
              routes: [{ name: "Products" }],
            });
          }
        },
        onError: () => {
          setIsLoggingIn(false);
        },
        onSettled: () => {
          setIsLoggingIn(false);
        },
      }
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        autoCapitalize="none"
        value={username}
        placeholder="Username"
        style={styles.input}
        onChangeText={(text) => setUsername(text)}
      />
      <TextInput
        autoCapitalize="none"
        value={password}
        placeholder="Password"
        secureTextEntry
        style={styles.input}
        onChangeText={(text) => setPassword(text)}
      />
      {error && (
        <Text style={styles.errorMessage}>Login failed, please try again.</Text>
      )}
      <Button onPress={() => onLoginPress({ username, password })} />
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    paddingTop: 200,
  },
  input: {
    height: 50,
    width: "80%",
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  errorMessage: {
    color: "red",
    marginTop: 10,
  },
});
