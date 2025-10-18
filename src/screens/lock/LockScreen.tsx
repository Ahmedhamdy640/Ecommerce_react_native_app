import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Button, Alert, TextInput } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import * as LocalAuthentication from "expo-local-authentication";
import { unlockApp } from "../../store/lockSlice";
import { RootState } from "../../store";

export const LockScreen = () => {
  const dispatch = useDispatch();
  const [password, setPassword] = useState("");
  const [showPasswordInput, setShowPasswordInput] = useState(false);

  const user = useSelector((state: RootState) => state.auth.currentUserData);

  const handleBiometricAuth = async () => {
    const hasHardware = await LocalAuthentication.hasHardwareAsync();
    if (!hasHardware) {
      setShowPasswordInput(true);
      return;
    }

    const isEnrolled = await LocalAuthentication.isEnrolledAsync();
    if (!isEnrolled) {
      setShowPasswordInput(false);
      return;
    }

    const { success } = await LocalAuthentication.authenticateAsync({
      promptMessage: "Authenticate to unlock",
    });

    if (success) {
      dispatch(unlockApp());
    } else {
      setShowPasswordInput(true);
    }
  };

  const handlePasswordAuth = () => {
    if (password === user?.password) {
      dispatch(unlockApp());
    } else {
      Alert.alert("Error", "Incorrect password");
      setPassword("");
    }
  };

  useEffect(() => {
    handleBiometricAuth();
  }, [dispatch]);

  return (
    <View style={styles.container}>
      {showPasswordInput ? (
        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.passwordInput}
            placeholder="Enter password"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
          <Button title="Unlock with Password" onPress={handlePasswordAuth} />
        </View>
      ) : (
        <Button title="Unlock with Biometrics" onPress={handleBiometricAuth} />
      )}
      {/* <Button title="Unlock with Biometrics" onPress={handleBiometricAuth} /> */}
      {/* {() => handleBiometricAuth} */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 9999,
  },
  title: {
    fontSize: 24,
    color: "white",
    marginBottom: 20,
  },
  passwordContainer: {
    alignItems: "center",
  },
  passwordInput: {
    backgroundColor: "white",
    width: 200,
    height: 40,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
});
