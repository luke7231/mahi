import * as Notifications from "expo-notifications";
import { Alert, Platform } from "react-native";
import { sendPostMessage } from "./post-mesagge";
import { RefObject } from "react";
import WebView from "react-native-webview";
import * as Device from "expo-device";
import Constants from "expo-constants";

export async function requestNotificationWhenClick() {
  const { status } = await Notifications.requestPermissionsAsync();
  console.log(status);
  if (status !== "granted") {
    Alert.alert(
      "", // 대화상자 제목
      "언제든 [설정]앱에서 변경하실 수 있습니다!", // 대화상자 내용 (배민에서 그대로 가져옴.)
      [
        {
          text: "확인",
          style: "cancel",
        },
      ],
      { cancelable: false }
    );
  }
  return;
}

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

function handleRegistrationError(errorMessage: string) {
  alert(errorMessage);
  throw new Error(errorMessage);
}

export async function registerForPushNotificationsAsync() {
  if (Platform.OS === "android") {
    Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  if (Device.isDevice) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync({
        ios: {
          allowAlert: true,
          allowSound: true,
          allowBadge: false,
        },
      });
      finalStatus = status;
      return;
    }
    const projectId =
      Constants?.expoConfig?.extra?.eas?.projectId ??
      Constants?.easConfig?.projectId;
    if (!projectId) {
      handleRegistrationError("Project ID not found");
    }
    try {
      const pushTokenString = (
        await Notifications.getExpoPushTokenAsync({
          projectId,
        })
      ).data;
      return pushTokenString;
    } catch (e: unknown) {
      handleRegistrationError(`${e}`);
    }
  } else {
    handleRegistrationError("Must use physical device for push notifications");
  }
}
