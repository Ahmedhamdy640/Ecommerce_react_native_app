import { StyleSheet, Text, View } from "react-native";
import React, { useState, useEffect, useMemo } from "react";
import { Button } from "../../components/Button";
import { useLogin } from "../../hooks/useAuth";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../store";
import { loginSuccess } from "../../store/authSlice";
import { CustomTextInput } from "../../components/CustomTextInput";
import { storage, StorageKey } from "../../utils/storage";
import { LoginParams } from "../../api/auth";
import { RootStackScreenProps } from "../../navigation/types";

// username: "emilys", password: "emilyspass"
// another user: "michaelw", password: "michaelwpass"

const Login: React.FC<RootStackScreenProps<"Login">> = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { mutateAsync: login, error, isPending } = useLogin();

  const dispatch = useDispatch<AppDispatch>();

  const onLoginPress = async (params: LoginParams) => {
    try {
      const responseData = await login(params);
      if (responseData?.accessToken) {
        dispatch(loginSuccess(responseData));
        await storage.setItem(StorageKey.TOKEN, responseData.accessToken);
      }
    } catch {}
  };

  const isValidInput = useMemo(() => {
    return username.trim().length >= 3 && password.trim().length >= 3;
  }, [username, password]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <CustomTextInput
        value={username}
        autoCapitalize="none"
        placeholder="Username"
        onChangeText={(text) => setUsername(text.trim())}
        editable={!isPending}
      />
      <CustomTextInput
        value={password}
        autoCapitalize="none"
        placeholder="Password"
        secureTextEntry
        onChangeText={(text) => setPassword(text.trim())}
        editable={!isPending}
      />
      {error && (
        <Text style={styles.errorMessage}>Login failed, please try again.</Text>
      )}

      <Button
        isLoading={isPending}
        text="Login"
        onPress={() => onLoginPress({ username, password })}
        disabled={!isValidInput || isPending}
      />
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    paddingTop: 200
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20
  },
  errorMessage: {
    color: "red",
    marginTop: 10
  }
});
