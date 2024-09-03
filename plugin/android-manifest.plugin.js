const { withAndroidManifest } = require("@expo/config-plugins");

module.exports = function androidManifestPlugin(config) {
  return withAndroidManifest(config, async (config) => {
    const androidManifest = config.modResults.manifest;

    // Add new package queries to the manifest
    androidManifest.queries = [
      ...androidManifest.queries,
      {
        package: [
          // 보안
          { $: { "android:name": "com.ahnlab.v3mobileplus" } },
          { $: { "android:name": "com.TouchEn.mVaccine.webs" } },

          // 우리카드
          { $: { "android:name": "com.wooricard.wpay" } },
          { $: { "android:name": "com.wooricard.smartapp" } },
          { $: { "android:name": "com.wooribank.smart.npib" } },
          { $: { "android:name": "com.mysmilepay.app" } },

          // 씨티카드
          { $: { "android:name": "kr.co.citibank.citimobile" } },
          { $: { "android:name": "com.citibank.cardapp" } },

          // 신한카드
          { $: { "android:name": "com.shcard.smartpay" } },
          { $: { "android:name": "com.shinhancard.smartshinhan" } },
          { $: { "android:name": "com.shinhan.smartcaremgr" } },
          { $: { "android:name": "com.mobiletoong.travelwallet" } },

          // ISP/페이북
          { $: { "android:name": "kvp.jjy.MispAndroid320" } },

          // KB카드
          { $: { "android:name": "com.kbcard.cxh.appcard" } },
          { $: { "android:name": "com.kbstar.reboot" } },
          { $: { "android:name": "com.kbstar.kbbank" } },
          { $: { "android:name": "com.kbstar.liivbank" } },

          // 현대카드
          { $: { "android:name": "com.hyundaicard.appcard" } },
          { $: { "android:name": "com.samsung.android.spaylite" } },
          {
            $: {
              "android:name": "com.ssg.serviceapp.android.egiftcertificate",
            },
          },

          // 삼성카드
          { $: { "android:name": "kr.co.samsungcard.mpocket" } },
          { $: { "android:name": "com.nhnent.payapp" } },
          { $: { "android:name": "com.samsung.android.spaylite" } },
          { $: { "android:name": "net.ib.android.smcard" } },

          // 하나카드
          { $: { "android:name": "com.hanaskcard.paycla" } },
          { $: { "android:name": "kr.co.hanamembers.hmscustomer" } },
          { $: { "android:name": "com.samsung.android.spaylite" } },
          { $: { "android:name": "com.kakao.talk" } },
          { $: { "android:name": "com.hanaskcard.rocomo.potal" } },
          { $: { "android:name": "com.ahnlab.v3mobileplus" } },
          { $: { "android:name": "com.lge.lgpay" } },
          { $: { "android:name": "viva.republica.toss" } },
          { $: { "android:name": "com.samsung.android.spay" } },
          { $: { "android:name": "com.nhnent.payapp" } },

          // 롯데카드
          { $: { "android:name": "com.lcacApp" } },
          { $: { "android:name": "com.lotte.lpay" } },
          { $: { "android:name": "com.nhnent.payapp" } },
          { $: { "android:name": "com.lottemembers.android" } },
          { $: { "android:name": "com.samsung.android.spaylite" } },

          // 농협카드
          { $: { "android:name": "nh.smart.nhallonepay" } },

          { $: { "android:name": "com.wooricard.wpay" } },
          { $: { "android:name": "com.wooribank.smart.npib" } },
          { $: { "android:name": "com.mysmilepay.app" } },
          { $: { "android:name": "com.citibank.cardapp" } },
          { $: { "android:name": "com.shinhan.smartcaremgr" } },
          { $: { "android:name": "com.mobiletoong.travelwallet" } },
          { $: { "android:name": "com.kbstar.kbbank" } },
          { $: { "android:name": "com.ssg.serviceapp.android.egiftcertific" } },
          { $: { "android:name": "net.ib.android.smcard" } },
          { $: { "android:name": "com.lotte.lpay" } },
        ],
      },
    ];

    return config;
  });
};
