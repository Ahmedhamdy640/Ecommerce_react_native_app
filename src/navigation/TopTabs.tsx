import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import Products from "../screens/products/Products";
import Category from "../screens/category/Category";

const Tab = createMaterialTopTabNavigator();

export const TopTabs = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="All Products" component={Products} />
      <Tab.Screen name="smartphones" component={Category} />
    </Tab.Navigator>
  );
};
