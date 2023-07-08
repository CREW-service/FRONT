import React, { useEffect, useState, useCallback } from "react";
import { useRecoilState } from "recoil";
import AuthApi from "shared/api";
import {
  markerPositionAtom,
  markerAddressAtom,
  recoilLatLngAtom,
  boatListAtom,
} from "Recoil/recoilAtoms";
import styled from "styled-components";

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

// 마커 이미지의 이미지 주소입니다
const imageSrc =
  "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png";

function Kakaomap() {
  const [isLoading, setIsLoarding] = useState(true);
  const [boatList, setBoatList] = useRecoilState(boatListAtom); // 보트 리스트를 가져오기 위함
  const [, setMarkerPosition] = useRecoilState(markerPositionAtom); // 마커 위치 좌표 상태
  const [, setMarkerAddress] = useRecoilState(markerAddressAtom); // 마커 주소 상태
  const [, setRecoilLatLng] = useRecoilState(recoilLatLngAtom); // 위도와 경도를 저장하는 상태

  const getBoatList = async (Bounds) => {
    setIsLoarding(true);
    try {
      const { data } = await AuthApi.getBoatList(Bounds);
      // console.log(data);
      setBoatList(data.boats);
      console.log(data.boats);
      setIsLoarding(false);
    } catch (error) {
      console.error("Error fetching post:", error);
      setIsLoarding(false);
    }
  };

  const initializeMap = useCallback(async () => {
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

    // 클릭한 좌표에 생성할 마커 생성
    const marker = new kakao.maps.Marker({
      map,
    });

    // 클릭한 좌표에 생성할 인포 윈도우
    const infowindow = new kakao.maps.InfoWindow({});

    let bounds = map.getBounds();
    let swLatLng = bounds.getSouthWest();
    let neLatLng = bounds.getNorthEast();

    let [swLat, swLng] = [swLatLng.getLat(), swLatLng.getLng()];
    let [neLat, neLng] = [neLatLng.getLat(), neLatLng.getLng()];

    await getBoatList({
      swLatLng: [Number(swLat), Number(swLng)],
      neLatLng: [Number(neLat), Number(neLng)],
    });

    kakao.maps.event.addListener(map, "center_changed", async () => {
      bounds = map.getBounds();
      swLatLng = bounds.getSouthWest();
      neLatLng = bounds.getNorthEast();

      [swLat, swLng] = [swLatLng.getLat(), swLatLng.getLng()];
      [neLat, neLng] = [neLatLng.getLat(), neLatLng.getLng()];

      await getBoatList({
        swLatLng: [Number(swLat), Number(swLng)],
        neLatLng: [Number(neLat), Number(neLng)],
      });

      boatList?.forEach((boat) => {
        const content = `<div class="wrap marker"> 
                              <div class="title detailtitle">
                                ${boat.title}
                              </div>
                              <div class="body">
                                <div class="desc">
                                  <div>
                                    모집 인원:
                                  </div>
                                  <div>
                                    ${boat.crewNum}/${boat.maxCrewNum}
                                  </div>
                                </div>
                                <div class="desc">
                                  <div>모집 마감:
                                  </div>
                                  <div>
                                    ${boat.endDate ? boat.endDate : "상시 모집"}
                                  </div>
                                </div>
                                  <div class="godetail">
                                    <a class="detaillink" href="/boat/${
                                      boat.boatId
                                    }">
                                      자세히 보기
                                    </a>
                                  </div>
                              </div>
                          </div>`;

        const imageSize = new kakao.maps.Size(24, 35);
        const markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);

        const marker2 = new kakao.maps.Marker({
          map,
          position: new kakao.maps.LatLng(boat.latitude, boat.longitude),
          title: boat.title,
          image: markerImage,
        });

        const infowindow2 = new kakao.maps.InfoWindow({
          content,
        });

        marker2.addListener("click", () => {
          document.querySelectorAll(".marker").forEach((item) => {
            item.parentElement.parentElement.remove();
          });
          infowindow2.open(map, marker2);
        });

        map.addListener("click", () => {
          infowindow2.close();
        });
      });
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
            // 글 작성 등 메뉴 표시
            const content = `<div class="bAddr">이 위치에 모임을 생성할까요?</div>
              <div></div>`;

            const getAddress = `${result[0].address.region_1depth_name} ${result[0].address.region_2depth_name} ${result[0].address.region_3depth_name}`;
            marker.setPosition(mouseEvent.latLng);

            infowindow.close();
            kakao.maps.event.addListener(marker, "click", () => {
              infowindow.setContent(content);
              infowindow.open(map, marker);
            });

            // 마커 위치 좌표 업데이트
            setMarkerPosition(mouseEvent.latLng);
            // 마커 주소 업데이트
            setMarkerAddress(getAddress);

            const lat = mouseEvent.latLng.getLat();
            const lng = mouseEvent.latLng.getLng();
            setRecoilLatLng({ lat, lng });
          }
        }
      );
    });
  }, [boatList]);

  useEffect(() => {
    initializeMap();
  }, []);

  return (
    <StMapContainer id="map">
      {isLoading && <div>Loading...</div>}
    </StMapContainer>
  );
}

export default Kakaomap;

const StMapContainer = styled.div`
  width: 100%;
  height: 656px;
`;
