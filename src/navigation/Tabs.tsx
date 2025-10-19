import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Settings from "../screens/settings/Settings";
import { Ionicons } from "@expo/vector-icons";
import { TopTabs } from "./TopTabs";
import { useCurrentUser } from "../hooks/useAuth";
import { ActivityIndicator } from "react-native";
import type { TabParamList } from "./types";

const Tab = createBottomTabNavigator<TabParamList>();

export const Tabs = () => {
  const { isLoading } = useCurrentUser();

  if (isLoading) {
    return <ActivityIndicator size="large" style={{ flex: 1 }} />;
  }
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Products") {
            iconName = focused ? "grid" : "grid-outline";
          } else if (route.name === "Settings") {
            iconName = focused ? "settings" : "settings-outline";
          }

          return <Ionicons name={iconName as any} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#007AFF",
        tabBarInactiveTintColor: "gray"
      })}
    >
      <Tab.Screen
        name="Products"
        component={TopTabs}
        options={{ headerShadowVisible: false }}
      />
      <Tab.Screen name="Settings" component={Settings} />
    </Tab.Navigator>
  );
};
