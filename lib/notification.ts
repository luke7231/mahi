import * as Notifications from "expo-notifications";
import { Alert } from "react-native";
import { sendPostMessage } from "./post-mesagge";
import { RefObject } from "react";
import WebView from "react-native-webview";

export async function requestNotificationWhenClick(
  webViewRef: RefObject<WebView>
) {
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
  sendPostMessage(webViewRef);
  return;
}
