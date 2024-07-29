import { View, Text, SafeAreaView, TouchableOpacity } from "react-native";
import WebView, { WebViewMessageEvent } from "react-native-webview";
import { useEffect, useRef, useState } from "react";

import { sendPostMessage } from "@/lib/post-mesagge";
import { getCurLocation, requestLocationWhenClick } from "@/lib/location";
import { requestNotificationWhenClick } from "@/lib/notification";

export default function HomeScreen() {
  const webViewRef = useRef<WebView>(null);

  // const reverseGeocode = async (latitude: number, longitude: number) => {
  //   let address = await Location.reverseGeocodeAsync({ latitude, longitude });
  //   console.log(address);
  // };

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
    }
  };

  return (
    <>
      {/* 노치 컬리 조정은 SafeAreaView의 bacgroundColor로 조정가능 */}
      <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
        <View style={{ flex: 1, justifyContent: "space-between" }}>
          <WebView
            ref={webViewRef}
            // source={{ uri: "http://192.168.200.181:3000" }}
            source={{ uri: "https://303a-211-250-35-78.ngrok-free.app" }}
            onMessage={onMessageFromWebView}
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
