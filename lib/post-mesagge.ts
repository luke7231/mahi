import { RefObject } from "react";
import WebView from "react-native-webview";

export const sendPostMessage = (
  webViewRef: RefObject<WebView>,
  type: string,
  data?: any
) => {
  webViewRef.current?.postMessage(JSON.stringify({ type, data }));
};

export const sendTokenToWebView = (
  webViewRef: RefObject<WebView>,
  token: string
) => {
  webViewRef.current?.postMessage(token);
};
