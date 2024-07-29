import { RefObject } from "react";
import WebView from "react-native-webview";

export const sendPostMessage = (webViewRef: RefObject<WebView>) => {
  webViewRef.current?.postMessage(
    JSON.stringify({ type: "DONE", data: "anything" })
  );
};
