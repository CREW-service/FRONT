import React, { useEffect, useState } from "react";

function Kakaomap() {
  const [markerPosition, setMarkerPosition] = useState(null); // 마커 위치 좌표 상태 변수
  const [markerAddress, setMarkerAddress] = useState(""); // 마커 주소 상태 변수

  useEffect(() => {
    const { kakao } = window;

    // 지도 컨테이너 요소를 가져옵니다.
    const mapContainer = document.getElementById("map");
    const mapOptions = {
      center: new kakao.maps.LatLng(37.56192, 126.965), // 지도의 중심좌표
      level: 6, // 지도의 확대 레벨
      mapTypeId: kakao.maps.MapTypeId.ROADMAP, // 지도종류
    };

    // 카카오 지도 객체를 생성합니다.
    const map = new kakao.maps.Map(mapContainer, mapOptions);

    // 확대 축소 컨트롤을 생성하고 지도에 추가합니다.
    const zoomControl = new kakao.maps.ZoomControl();
    map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);

    // 마커 객체를 생성하고 지도에 추가합니다.
    const marker = new kakao.maps.Marker({
      map,
    });

    // 인포윈도우 객체를 생성합니다.
    const infowindow = new kakao.maps.InfoWindow({
      content: `<div style="padding:5px;">인포 박스</div>`, // 인포윈도우에 표시할 내용
    });

    // 마커 클릭 이벤트를 등록합니다.
    kakao.maps.event.addListener(marker, "click", () => {
      infowindow.open(map, marker); // 인포윈도우를 지도에 표시합니다.
    });

    // 지도 클릭 이벤트를 등록합니다.
    kakao.maps.event.addListener(map, "click", (mouseEvent) => {
      // 주소-좌표 변환 객체를 생성합니다.
      const geocoder = new kakao.maps.services.Geocoder();

      // 클릭한 위치의 좌표를 이용하여 법정동 상세 주소 정보를 요청합니다.
      geocoder.coord2Address(
        mouseEvent.latLng.getLng(),
        mouseEvent.latLng.getLat(),
        (result, status) => {
          if (status === kakao.maps.services.Status.OK) {
            let detailAddr = result[0].road_address
              ? `<div>도로명주소 : ${result[0].road_address.address_name}</div>`
              : "";
            detailAddr += `<div>지번 주소 : ${result[0].address.address_name}</div>`;

            const content = `<div class="bAddr"><span class="title">법정동 주소정보</span>${detailAddr}</div>`;

            marker.setPosition(mouseEvent.latLng);
            marker.setMap(map);

            infowindow.setContent(content);
            infowindow.open(map, marker);

            // 마커 위치 좌표 업데이트
            setMarkerPosition(mouseEvent.latLng);
            // 마커 주소 업데이트
            setMarkerAddress(result[0].address.address_name);
          }
        }
      );
    });
  }, []);

  return (
    <div>
      <div id="map" style={{ width: "400px", height: "500px" }} />
      <div>
        {/* 마커 위치 좌표 표시 */}
        마커 위치 좌표:{" "}
        {markerPosition &&
          `${markerPosition.getLat()}, ${markerPosition.getLng()}`}
      </div>
      <div>
        {/* 마커 주소 표시 */}
        마커 주소: {markerAddress}
      </div>
    </div>
  );
}

export default Kakaomap;
