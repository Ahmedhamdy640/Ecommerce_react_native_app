import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import React, { useState, useEffect } from "react";
import { Button } from "../../components/Button";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../../navigation/RootStack";
import { useLogin } from "../../hooks/useAuth";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../store";
import { loginSuccess } from "../../store/authSlice";
import { CustomTextInput } from "../../components/CustomTextInput";

// username: "emilys", password: "emilyspass"
// another user: "michaelw", password: "michaelwpass"

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

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
      <CustomTextInput
        value={username}
        autoCapitalize="none"
        placeholder="Username"
        onChangeText={(text) => setUsername(text.trim())}
      />
      <CustomTextInput
        value={password}
        autoCapitalize="none"
        placeholder="Password"
        secureTextEntry
        onChangeText={(text) => setPassword(text.trim())}
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
