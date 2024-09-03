// addInternetPermission.js
const { withAndroidManifest } = require("@expo/config-plugins");

module.exports = function addInternetPermission(config) {
  return withAndroidManifest(config, async (config) => {
    const androidManifest = config.modResults.manifest;

    // `uses-permission` 배열이 없으면 생성
    if (!androidManifest["uses-permission"]) {
      androidManifest["uses-permission"] = [];
    }

    // 인터넷 권한 추가
    androidManifest["uses-permission"].push({
      $: { "android:name": "android.permission.INTERNET" },
    });

    return config;
  });
};
