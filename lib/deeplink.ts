import * as Linking from "expo-linking";
import { Alert, Platform } from "react-native";
import { ShouldStartLoadRequest } from "react-native-webview/lib/WebViewTypes";
import SendIntentAndroid from "react-native-send-intent";

export const handleShouldStartLoadWithRequest = (
  event: ShouldStartLoadRequest
) => {
  const { url } = event;

  if (event.url.startsWith("http://") || event.url.startsWith("https://")) {
    return true;
  } else if (Platform.OS === "android" && event.url.startsWith("intent")) {
    SendIntentAndroid.openChromeIntent(url).then((fallbackUrl) => {
      return false;
    });
    return false;
  }
  Linking.canOpenURL(url)
    .then((supported) => {
      if (supported) {
        Linking.openURL(url); // 네이버 맵 앱이 설치되어 있는 경우 열기
      }
    })
    .catch((error) => {
      // Alert.alert(error);
      console.error(error);
    });
  return false; // 네이버 맵을 열기 때문에 웹뷰에서는 로드하지 않음
  //   }
};
