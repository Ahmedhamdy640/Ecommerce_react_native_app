import { StyleSheet, TouchableOpacity, View } from "react-native";
import React from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store";
import { logout } from "../../store/authSlice";

import { Ionicons } from "@expo/vector-icons";
import { TabScreenProps } from "../../navigation/types";
import { storage, StorageKey } from "../../utils/storage";

const Settings: React.FC<TabScreenProps<"Settings">> = ({ navigation }) => {
  const dispatch = useDispatch<AppDispatch>();

  const logoutOnPress = async () => {
    await storage.removeItem(StorageKey.TOKEN);
    dispatch(logout());
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={logoutOnPress}>
        <Ionicons name="log-out" size={30} color={"#fff"} />
      </TouchableOpacity>
    </View>
  );
};

export default Settings;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  button: {
    padding: 40,
    backgroundColor: "red",
    borderRadius: 100
  }
});
