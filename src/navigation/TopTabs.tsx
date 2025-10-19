import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import Products from "../screens/products/Products";
import Category from "../screens/category/Category";
import type { TopTabParamList } from "./types";

const Tab = createMaterialTopTabNavigator<TopTabParamList>();

export const TopTabs = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="All Products" component={Products} />
      <Tab.Screen name="Smartphones" component={Category} />
    </Tab.Navigator>
  );
};
