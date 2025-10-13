import { StyleSheet, Text, TouchableOpacity } from "react-native";

interface ButtonProps {
  onPress: () => void;
}

export const Button = ({ onPress }: ButtonProps) => {
  return (
    <TouchableOpacity style={styles.buttonContainer} onPress={onPress}>
      <Text style={styles.buttonTitle}>Login</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    height: 50,
    width: "80%",
    backgroundColor: "#ddd",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    marginTop: 40,
  },
  buttonTitle: {
    fontSize: 15,
    fontWeight: "bold",
  },
});
