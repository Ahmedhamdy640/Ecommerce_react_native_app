import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store";
import { logout } from "../../store/authSlice";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../navigation/RootStack";
import { useNavigation } from "@react-navigation/core";
import { Ionicons } from "@expo/vector-icons";

const Settings = () => {
  const dispatch = useDispatch<AppDispatch>();
  type SettingsNavProp = NativeStackNavigationProp<
    RootStackParamList,
    "Settings"
  >;
  const navigation = useNavigation<SettingsNavProp>();
  const logoutOnPress = () => {
    dispatch(logout());
    navigation.reset({ index: 0, routes: [{ name: "Login" }] });
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
    alignItems: "center",
  },
  button: {
    padding: 40,
    backgroundColor: "red",
    borderRadius: 100,
  },
});
