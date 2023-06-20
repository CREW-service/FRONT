import React, { useEffect } from "react";
import { useRecoilState } from "recoil";
import {
  // markerPositionAtom,
  // markerAddressAtom,
  // recoilLatLngAtom,
  boatListAtom,
} from "Recoil/recoilAtoms";

function Kakaomap() {
  const [boatList] = useRecoilState(boatListAtom); // 보트 리스트를 가져오기 위함
  // const [, setMarkerPosition] = useRecoilState(markerPositionAtom); // 마커 위치 좌표 상태
  // const [, setMarkerAddress] = useRecoilState(markerAddressAtom); // 마커 주소 상태
  // const [, setRecoilLatLng] = useRecoilState(recoilLatLngAtom); // 위도와 경도를 저장하는 상태

  useEffect(() => {
    const { kakao } = window;

    const getLocation = async () =>
      new Promise((resolve, reject) => {
        if (navigator.geolocation) {
          // GeoLocation을 이용해서 접속 위치를 얻어옵니다
          navigator.geolocation.getCurrentPosition(
            (position) => {
              const lat = position.coords.latitude; // 위도
              const lon = position.coords.longitude; // 경도
              const locPosition = new kakao.maps.LatLng(lat, lon); // 마커가 표시될 위치를 geolocation으로 얻어온 좌표로 생성합니다
              resolve(locPosition);
            },
            (error) => {
              // 위치 정보를 가져오지 못한 경우의 처리를 여기에 작성할 수 있습니다.
              const locPosition = new kakao.maps.LatLng(33.450701, 126.570667);
              resolve(locPosition);
            }
          );
        } else {
          // HTML5의 GeoLocation을 사용할 수 없을 때의 기본 위치를 설정합니다
          const locPosition = new kakao.maps.LatLng(33.450701, 126.570667);
          resolve(locPosition);
        }
      });

    const initializeMap = async () => {
      // 위치 정보 가져오기
      const defaultPosition = await getLocation();

      // 지도 컨테이너 요소를 가져옵니다.
      const mapContainer = document.getElementById("map");
      const mapOptions = {
        center: defaultPosition, // 위치 정보를 기반으로한 중심 좌표
        level: 6, // 지도의 확대 레벨
        mapTypeId: kakao.maps.MapTypeId.ROADMAP, // 지도종류
      };

      // 카카오 지도 객체를 생성합니다.
      const map = new kakao.maps.Map(mapContainer, mapOptions);

      // 확대 축소 컨트롤을 생성하고 지도에 추가합니다.
      const zoomControl = new kakao.maps.ZoomControl();
      map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);

      // 마커 객체를 생성하고 지도에 추가합니다.
      // let marker = new kakao.maps.Marker({
      //   map,
      // });

      // 마커 이미지의 이미지 주소입니다
      const imageSrc =
        "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png";

      for (let i = 0; i < boatList.length; i += 1) {
        // 인포윈도우 객체를 생성합니다.
        const infowindow = new kakao.maps.InfoWindow({
          content: `<div style="padding:5px;">제목 :${boatList[i].title}
          <div> 모집 유형 :${boatList[i].keyword}</div>
          <div> 모집 인원 :${boatList[i].crewNum}/${boatList[i].maxCrewNum}</div>
          <div> 모집 마감 :${boatList[i].endDate}</div>
          </div>
          <a href= "/boat/${boatList[i].boatId}">
            </a>
         `, // 인포윈도우에 표시할 내용
        });

        // 마커 이미지의 이미지 크기 입니다
        const imageSize = new kakao.maps.Size(24, 35);

        // 마커 이미지를 생성합니다
        const markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);

        // 마커를 생성합니다
        const marker = new kakao.maps.Marker({
          map, // 마커를 표시할 지도
          position: new kakao.maps.LatLng(
            Number(boatList[i].latitude),
            Number(boatList[i].longitude)
          ), // 마커를 표시할 위치
          title: boatList[i].title, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
          image: markerImage, // 마커 이미지
        });

        // 마커 클릭 이벤트를 등록합니다.
        kakao.maps.event.addListener(marker, "click", () => {
          infowindow.open(map, marker); // 인포윈도우를 지도에 표시합니다.
        });

        // 지도 클릭시 이벤트 생성
        kakao.maps.event.addListener(map, "click", (mouseEvent) => {
          // 지도 클릭시 인포 박스를 제거
          infowindow.close();
        });
      }

      // 지도 클릭 이벤트를 등록합니다.
      // kakao.maps.event.addListener(map, "click", (mouseEvent) => {
      //   // 주소-좌표 변환 객체를 생성합니다.
      //   const geocoder = new kakao.maps.services.Geocoder();

      //   // 클릭한 위치의 좌표를 이용하여 법정동 상세 주소 정보를 요청합니다.
      //   geocoder.coord2Address(
      //     mouseEvent.latLng.getLng(),
      //     mouseEvent.latLng.getLat(),
      //     (result, status) => {
      //       if (status === kakao.maps.services.Status.OK) {
      //         let detailAddr = result[0].road_address
      //           ? `<div>도로명주소 : ${result[0].road_address.address_name}</div>`
      //           : "";
      //         detailAddr += `<div>지번 주소 : ${result[0].address.address_name}</div>`;

      //         const content = `<div class="bAddr"><span class="title">법정동 주소정보</span>${detailAddr}</div>`;

      //         marker.setPosition(mouseEvent.latLng);
      //         marker.setMap(map);

      //         infowindow.setContent(content);
      //         infowindow.open(map, marker);

      //         // 마커 위치 좌표 업데이트
      //         setMarkerPosition(mouseEvent.latLng);
      //         // 마커 주소 업데이트
      //         setMarkerAddress(result[0].address.address_name);

      //         const lat = mouseEvent.latLng.getLat();
      //         const lng = mouseEvent.latLng.getLng();
      //         setRecoilLatLng({ lat, lng });
      //       }
      //     }
      //   );
      // });
    };

    initializeMap();
  }, [boatList]);

  return (
    <div>
      <div id="map" style={{ width: "370px", height: "450px" }} />
    </div>
  );
}

export default Kakaomap;
