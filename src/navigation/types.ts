import type { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import type { CompositeScreenProps } from "@react-navigation/native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { MaterialTopTabScreenProps } from "@react-navigation/material-top-tabs";

export type RootStackParamList = {
  Login: undefined;
  Tabs: undefined;
};

export type TabParamList = {
  Products: undefined;
  Settings: undefined;
};

export type TopTabParamList = {
  "All Products": undefined;
  Smartphones: undefined;
};
export type RootStackScreenProps<T extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, T>;

export type TabScreenProps<T extends keyof TabParamList> = CompositeScreenProps<
  BottomTabScreenProps<TabParamList, T>,
  RootStackScreenProps<keyof RootStackParamList>
>;

export type TopTabScreenProps<T extends keyof TopTabParamList> =
  CompositeScreenProps<
    MaterialTopTabScreenProps<TopTabParamList, T>,
    CompositeScreenProps<
      BottomTabScreenProps<TabParamList>,
      RootStackScreenProps<keyof RootStackParamList>
    >
  >;

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
