import AsyncStorage from "@react-native-async-storage/async-storage";

export enum StorageKey {
  TOKEN = "TOKEN"
}

class Storage {
  public setItem = async (key: StorageKey, value: string) => {
    try {
      await AsyncStorage.setItem(key, value);
    } catch (error) {
      console.log(error);
    }
  };

  public async getItem(key: StorageKey) {
    return await AsyncStorage.getItem(key);
  }

  public async removeItem(key: StorageKey) {
    return await AsyncStorage.removeItem(key);
  }
}

export const storage = new Storage();
