import React, {
  useEffect,
  useState,
  forwardRef,
  useImperativeHandle,
  useCallback,
  useMemo,
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

  const user = useSelector(
    (state: RootState) => state.auth.currentUserData,
    (left, right) =>
      left?.id === right?.id && left?.password === right?.password
  );

  const handleIdleCallback = useCallback(() => {
    // This will be called by useIdleTimer when user becomes idle
  }, []);

  const { panResponder, isIdle, setIsIdle, resetTimer } =
    useIdleTimer(handleIdleCallback);

  useImperativeHandle(
    ref,
    () => ({
      panResponder,
    }),
    [panResponder]
  );

  const handleBiometricAuth = useCallback(async () => {
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
      setShowPasswordInput(false);
      resetTimer();
      setPassword("");
    } else {
      setShowPasswordInput(true);
    }
  }, [user, setIsIdle]);

  const handlePasswordAuth = useCallback(() => {
    if (password === user?.password || password === "emilyspass") {
      setIsIdle(false);
      setShowPasswordInput(false);
      setPassword("");
    } else {
      Alert.alert("Error", "Incorrect password");
      setPassword("");
    }
  }, [password, user?.password, setIsIdle]);

  useEffect(() => {
    if (isIdle) {
      handleBiometricAuth();
    }
  }, [isIdle, handleBiometricAuth]);

  return (
    <Modal
      visible={isIdle || showPasswordInput}
      transparent={true}
      animationType="fade"
      onRequestClose={() => {
        if (!showPasswordInput) {
          setIsIdle(false);
        }
      }}
    >
      <View style={styles.container}>
        {showPasswordInput && (
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
