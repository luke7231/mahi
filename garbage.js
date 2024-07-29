// 홈 랜딩 시, 권한 요청 쏘는 로직.
// useEffect(() => {
//   (async () => {
//     let { status } = await Location.requestForegroundPermissionsAsync();
//     console.log("status:  ", status);
//     const test = await Location.getForegroundPermissionsAsync();
//     console.log("permission:  ", test);
//     if (status !== "granted") {
//       setErrorMsg("Permission to access location was denied");
//       return;
//     }

//     let location = await Location.getCurrentPositionAsync({});
//     setLocation(location);
//     console.log(location);
//     // const 주소 = await reverseGeocode(
//     //   location?.coords.latitude,
//     //   location?.coords.longitude
//     // );
//     // console.log(주소);
//   })();
// }, []);
