import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { useState, useEffect } from "react";
import { Button } from "../../components/Button";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../../navigation/RootStack";
import { useLogin } from "../../hooks/useAuth";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../store";
import { loginSuccess } from "../../store/authSlice";

// username: "emilys", password: "emilyspass"

const Login = () => {
  const [username, setUsername] = useState("emilys");
  const [password, setPassword] = useState("emilyspass");

  type LoginNavProp = NativeStackNavigationProp<RootStackParamList, "Login">;
  const navigation = useNavigation<LoginNavProp>();

  const { mutate: login, error } = useLogin();

  const dispatch = useDispatch<AppDispatch>();
  const hasAccessToken = useSelector(
    (state: RootState) => state.auth.accessToken !== null
  );

  console.log("hasAccessToken", hasAccessToken);

  const [isLoggingIn, setIsLoggingIn] = useState(false);

  useEffect(() => {
    if (hasAccessToken) {
      navigation.reset({ index: 0, routes: [{ name: "Tabs" }] });
    }
  }, [hasAccessToken, navigation]);

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
            dispatch(loginSuccess(responseData));

            navigation.reset({
              index: 0,
              routes: [{ name: "Tabs" }],
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
