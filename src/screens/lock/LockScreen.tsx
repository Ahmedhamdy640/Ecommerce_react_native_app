import React, {
  useEffect,
  useState,
  forwardRef,
  useImperativeHandle,
} from "react";
import {
  View,
  StyleSheet,
  Button,
  Alert,
  TextInput,
  Modal,
  PanResponderInstance,
} from "react-native";
import { useSelector } from "react-redux";
import * as LocalAuthentication from "expo-local-authentication";
import { RootState } from "../../store";
import useIdleTimer from "../../hooks/useIdleTimer";

export interface LockScreenHandles {
  panResponder: PanResponderInstance;
}

export const LockScreen = forwardRef<LockScreenHandles, {}>((props, ref) => {
  const [password, setPassword] = useState("");
  const [showPasswordInput, setShowPasswordInput] = useState(false);
  const user = useSelector((state: RootState) => state.auth.currentUserData);

  const { panResponder, isIdle, setIsIdle } = useIdleTimer(() => {
    setIsIdle(true);
  });

  useImperativeHandle(ref, () => ({
    panResponder,
  }));

  const handleBiometricAuth = async () => {
    if (!user) {
      setShowPasswordInput(true);
      return;
    }

    const hasHardware = await LocalAuthentication.hasHardwareAsync();
    if (!hasHardware) {
      setShowPasswordInput(true);
      return;
    }

    const isEnrolled = await LocalAuthentication.isEnrolledAsync();
    if (!isEnrolled) {
      setShowPasswordInput(true);
      return;
    }

    const { success } = await LocalAuthentication.authenticateAsync({
      promptMessage: "Authenticate to unlock",
    });

    if (success) {
      setIsIdle(false);
    } else {
      setShowPasswordInput(true);
    }
  };

  const handlePasswordAuth = () => {
    if (password === user?.password) {
      setIsIdle(false);
    } else {
      Alert.alert("Error", "Incorrect password");
      setPassword("");
    }
  };

  useEffect(() => {
    if (isIdle) {
      handleBiometricAuth();
    }
  }, [isIdle]);

  return (
    <Modal visible={isIdle} transparent={true}>
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
      </View>
    </Modal>
  );
});
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
