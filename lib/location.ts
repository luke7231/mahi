import * as Location from "expo-location";
import { Alert, Platform } from "react-native";
import { sendPostMessage } from "./post-mesagge";
import { goSettings } from "./common";
import { RefObject } from "react";
import WebView from "react-native-webview";
// 1. 클릭시 요청하는지 o, 2. 거절시 잘 뜨나?o
export async function requestLocationWhenClick() {
  let { status } = await Location.requestForegroundPermissionsAsync();
  if (status !== "granted") {
    Alert.alert(
      "", // 대화상자 제목
      "현재 위치를 찾을 수 없습니다.\n 위치서비스를 켜 주세요.", // 대화상자 내용 (배민에서 그대로 가져옴.)
      [
        {
          text: "닫기",
          style: "cancel",
        },
        {
          text: "설정",
          onPress: async () => await goSettings(),
        },
      ],
      { cancelable: false }
    );
  }
  return;
}

export async function getCurLocation() {
  const isAndroid = Platform.OS === "android";
  let { status } = await Location.requestForegroundPermissionsAsync();

  if (status !== "granted") {
    Alert.alert(
      "", // 대화상자 제목
      "현재 위치를 찾을 수 없습니다.\n 위치서비스를 켜 주세요.", // 대화상자 내용 (배민에서 그대로 가져옴.)
      [
        {
          text: "닫기",
          style: "cancel",
        },
        {
          text: "설정",
          onPress: async () => await goSettings(),
        },
      ],
      { cancelable: false }
    );
  }

  if (status === "granted") {
    console.log("진입");
    const location = await Location.getCurrentPositionAsync({
      accuracy: isAndroid ? Location.Accuracy.Lowest : Location.Accuracy.Lowest,
    });
    console.log("끝");
    console.log(status);
    console.log(location);
    return {
      ok: true,
      location,
    };
  }
  return {
    ok: false,
    location: null,
  };

  // 위치 값을 보내준다.
}
