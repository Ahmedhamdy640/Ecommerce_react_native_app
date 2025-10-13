import AsyncStorage from "@react-native-async-storage/async-storage";

export enum StorageKey {
  USER = "user",
}

class Storage {
  public setItem = async (key: StorageKey, value: string) => {
    try {
      await AsyncStorage.setItem(key, value);
    } catch (error) {
      console.log(error);
    }
  };

  public getItem(key: StorageKey) {
    return AsyncStorage.getItem(key);
  }
}

export const storage = new Storage();
