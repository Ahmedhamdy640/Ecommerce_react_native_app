import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";

import Products from "../screens/products/Products";
import Login from "../screens/login/Login";

export type RootStackParamList = {
  Products: undefined;
  Login: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();
export const RootStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Products" component={Products} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
