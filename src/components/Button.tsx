import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity
} from "react-native";

interface Props {
  onPress: () => void;
  isLoading?: boolean;
  text?: string;
  disabled?: boolean;
}

export const Button = ({ onPress, isLoading, text, disabled }: Props) => {
  return (
    <TouchableOpacity
      style={[styles.buttonContainer, disabled && styles.buttonDisabled]}
      onPress={onPress}
      disabled={disabled}
    >
      {isLoading ? (
        <ActivityIndicator color="#000" />
      ) : (
        <Text
          style={[styles.buttonTitle, disabled && styles.buttonTitleDisabled]}
        >
          {text}
        </Text>
      )}
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
    marginTop: 40
  },
  buttonDisabled: {
    backgroundColor: "#ccc",
    opacity: 0.5
  },
  buttonTitle: {
    fontSize: 15,
    fontWeight: "bold"
  },
  buttonTitleDisabled: {
    color: "#999"
  }
});
