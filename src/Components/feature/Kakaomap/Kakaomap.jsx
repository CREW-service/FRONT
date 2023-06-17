import React, { useEffect } from "react";

const { kakao } = window;

// 주소-좌표 변환 객체를 생성합니다
const geocoder = new kakao.maps.services.Geocoder();

function searchDetailAddrFromCoords(coords, callback) {
  // 좌표로 법정동 상세 주소 정보를 요청합니다
  geocoder.coord2Address(coords.getLng(), coords.getLat(), callback);
}

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
      draggable: true, // 마커를 드래그 가능하도록 설정한다
      map, // 마커를 표시할 지도 객체
    });

    // 마커 위에 표시할 인포윈도우를 생성한다
    const infowindow = new kakao.maps.InfoWindow({
      content: '<div style="padding:5px;">인포윈도우 :D</div>', // 인포윈도우에 표시할 내용
    });

    // 마커에 클릭 이벤트를 등록한다 (우클릭 : rightclick)
    kakao.maps.event.addListener(marker, "click", () => {
      // 인포윈도우를 지도에 표시한다
      infowindow.open(map, marker);
    });

    kakao.maps.event.addListener(map, "click", (mouseEvent) => {
      // 클릭한 위도, 경도 정보를 가져옵니다
      const latlng = mouseEvent.latLng;

      // 마커 위치를 클릭한 위치로 옮깁니다
      marker.setPosition(latlng);
      infowindow.close(map, marker);

      // const message = "클릭한 위치의 위도는 " + latlng.getLat() + " 이고, ";
      // message += "경도는 " + latlng.getLng() + " 입니다";

      // const resultDiv = document.getElementById("clickLatlng");
      // resultDiv.innerHTML = message;
    });

    // 지도 클릭 이벤트
    kakao.maps.event.addListener(map, "click", (mouseEvent) => {
      searchDetailAddrFromCoords(mouseEvent.latLng, (result, status) => {
        if (status === kakao.maps.services.Status.OK) {
          let detailAddr = result[0].road_address
            ? `<div>도로명주소 : ${result[0].road_address.address_name}</div>`
            : "";
          detailAddr += `<div>지번 주소 : ${result[0].address.address_name}</div>`;

          const content =
            `<div class="bAddr">` +
            `<span class="title">법정동 주소정보</span>${detailAddr}</div>`;

          // 마커를 클릭한 위치에 표시합니다
          marker.setPosition(mouseEvent.latLng);
          marker.setMap(map);

          // 인포윈도우에 클릭한 위치에 대한 법정동 상세 주소정보를 표시합니다
          infowindow.setContent(content);
          infowindow.open(map, marker);
        }
      });
    });
  }, []);

  return <div id="map" style={{ width: "500px", height: "400px" }} />;
}

export default Kakaomap;
