import React, { useEffect } from "react";

const { kakao } = window;
function Kakaomap() {
  useEffect(() => {
    const mapContainer = document.getElementById("map"); // 지도를 표시할 div
    const mapOption = {
      center: new kakao.maps.LatLng(37.56192, 126.965), // 지도의 중심좌표
      level: 6, // 지도의 확대 레벨
      mapTypeId: kakao.maps.MapTypeId.ROADMAP, // 지도종류
    };

    // 지도를 생성한다
    const map = new kakao.maps.Map(mapContainer, mapOption);

    // 지도에 확대 축소 컨트롤을 생성한다
    const zoomControl = new kakao.maps.ZoomControl();

    // 지도의 우측에 확대 축소 컨트롤을 추가한다
    map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);

    // 지도에 마커를 생성하고 표시한다
    const marker = new kakao.maps.Marker({
      position: new kakao.maps.LatLng(37.56192, 126.965), // 마커의 좌표
      map, // 마커를 표시할 지도 객체
    });

    // 마커 위에 표시할 인포윈도우를 생성한다
    const infowindow = new kakao.maps.InfoWindow({
      content: '<div style="padding:5px;">인포윈도우 :D</div>', // 인포윈도우에 표시할 내용
    });

    // 인포윈도우를 지도에 표시한다
    infowindow.open(map, marker);

    // 마커에 클릭 이벤트를 등록한다 (우클릭 : rightclick)
    kakao.maps.event.addListener(marker, "click", () => {
      alert("마커를 클릭했습니다!");
    });
  }, []);

  return <div id="map" style={{ width: "500px", height: "400px" }} />;
}

export default Kakaomap;
