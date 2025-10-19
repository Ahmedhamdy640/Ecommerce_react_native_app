import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import Login from "../screens/login/Login";
import { Tabs } from "./Tabs";
import type { RootStackParamList } from "./types";
import { useSelector } from "react-redux";
import { RootState } from "../store";

const Stack = createNativeStackNavigator<RootStackParamList>();
export const RootStack = () => {
  const { accessToken } = useSelector((state: RootState) => state.auth);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {!accessToken ? (
          <Stack.Screen
            name="Login"
            component={Login}
            options={{ headerShown: false }}
          />
        ) : (
          <Stack.Screen
            name="Tabs"
            component={Tabs}
            options={{ headerShown: false }}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
