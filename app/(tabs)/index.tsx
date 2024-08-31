import { Platform, View, SafeAreaView } from "react-native";
import WebView, { WebViewMessageEvent } from "react-native-webview";
import { useEffect, useRef, useState } from "react";
import DeviceInfo from "react-native-device-info";
import * as Notifications from "expo-notifications";
import { sendPostMessage, sendTokenToWebView } from "@/lib/post-mesagge";
import { getCurLocation, requestLocationWhenClick } from "@/lib/location";
import {
  registerForPushNotificationsAsync,
  requestNotificationWhenClick,
} from "@/lib/notification";
import { useAndroidBackEffect } from "@/hooks/useAndroidBackEffect";
import { handleShouldStartLoadWithRequest } from "@/lib/deeplink";

export default function HomeScreen() {
  const webViewRef = useRef<WebView>(null);
  // const reverseGeocode = async (latitude: number, longitude: number) => {
  //   let address = await Location.reverseGeocodeAsync({ latitude, longitude });
  //   console.log(address);
  // };
  const [expoPushToken, setExpoPushToken] = useState("");
  const responseListener = useRef<Notifications.Subscription>();

  useAndroidBackEffect(webViewRef);
  useEffect(() => {
    registerForPushNotificationsAsync()
      .then((token) => (token ? sendTokenToWebView(webViewRef, token) : null))
      .catch((error: any) => setExpoPushToken(`${error}`));

    // [푸시를 받아서 접속했을 때!!!]
    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log(response, "hi");
        console.log(response.notification.request.content);
      });

    return () => {
      responseListener.current &&
        Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  const onMessageFromWebView = async ({ nativeEvent }: WebViewMessageEvent) => {
    const { type, data } = JSON.parse(nativeEvent.data);

    // Type 정의.
    // Handler 정의.
    if (type === "REQ_LOCATION") {
      await requestLocationWhenClick(); // 띄우고
      sendPostMessage(webViewRef, "DONE"); // 작업이 끝났다고 알린다.
    } else if (type === "REQ_NOTIFICATION") {
      await requestNotificationWhenClick(); // 띄우고
      sendPostMessage(webViewRef, "DONE"); // 작업이 끝났다고 알린다.
    } else if (type === "REQ_CURRENT_LOCATION") {
      const { ok, location } = await getCurLocation(); // 띄우고 현재 위치를 가져온다.
      if (ok) {
        sendPostMessage(webViewRef, "RES_CURRENT_LOCATION", location as any);
      }
    } else if (type === "clear_history") {
      console.log("clearing");
      if (webViewRef.current && webViewRef.current.clearHistory) {
        if (Platform.OS === "android") {
          webViewRef.current.clearHistory();
        } else {
          // iOS에서는 강제로 새로고침하거나 빈 페이지를 로드
        }
      }
    }
  };

  return (
    <>
      {/* 노치 컬리 조정은 SafeAreaView의 bacgroundColor로 조정가능 */}
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: "#fff",
          paddingTop: Platform.OS === "android" ? 24 : 0,
        }}
      >
        <View style={{ flex: 1, justifyContent: "space-between" }}>
          <WebView
            originWhitelist={["*"]}
            onShouldStartLoadWithRequest={handleShouldStartLoadWithRequest} //
            webviewDebuggingEnabled={true}
            // 아이폰에서 스와이프로 뒤로가기 허용하는 prop
            allowsBackForwardNavigationGestures
            ref={webViewRef}
            // source={{ uri: "http://172.25.80.188:3000" }} // 학교 사무실
            source={{ uri: "http://192.168.200.181:3000" }} // 집
            // source={{ uri: "http://mahi-web.vercel.app" }} // prd
            // source={{ uri: "https://ad11-210-119-237-102.ngrok-free.app" }}
            onMessage={onMessageFromWebView}
            userAgent={Platform.OS === "android" ? "payple-pay-app" : ""}
            applicationNameForUserAgent="payple-pay-app"
          />
          {/* <TouchableOpacity
            style={{ backgroundColor: "pink", padding: 16 }}
            // onPress={async () => await requestNotificationWhenClick()}
            onPress={async () => await getCurLocation()}
          >
            <Text>getLocation!</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{ backgroundColor: "skyblue", padding: 16 }}
            // onPress={async () => await requestNotificationWhenClick()}
            onPress={() => onClick()}
          >
            <Text>sendPostMessage!</Text>
          </TouchableOpacity> */}
          {/* <View>
            <Text>asdasdsad</Text>
          </View>
          <View>
            <TouchableOpacity
              style={{ backgroundColor: "pink", padding: 16 }}
              onPress={async () => await requestLocationWhenClick()}
            >
              <Text>Location</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{ backgroundColor: "skyblue", padding: 16 }}
              // onPress={async () => await requestNotificationWhenClick()}
              onPress={() => onClick()}
            >
              <Text>Notification</Text>
            </TouchableOpacity>
          </View> */}
        </View>
      </SafeAreaView>
    </>
  );
}

export const NOTCH_COLOR = "#fff";
export const CAMERA_NOTCH_COLOR = "#162A0C";

// const styles = StyleSheet.create({
//   titleContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//     gap: 8,
//   },
//   stepContainer: {
//     gap: 8,
//     marginBottom: 8,
//   },
//   reactLogo: {
//     height: 178,
//     width: 290,
//     bottom: 0,
//     left: 0,
//     position: "absolute",
//   },
// });
