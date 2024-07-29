import * as Linking from "expo-linking";
export async function goSettings() {
  await Linking.openSettings();
}
