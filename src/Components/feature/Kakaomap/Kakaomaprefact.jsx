import React, { useState, useEffect, useRef } from "react";
import AuthApi from "shared/api";
import { Map, MapMarker, ZoomControl } from "react-kakao-maps-sdk";
import { useRecoilState } from "recoil";
import { markerAddressAtom, recoilLatLngAtom } from "Recoil/recoilAtoms";
import styled from "styled-components";

const { kakao } = window;

function Kakaomaprefact() {
  const mapRef = useRef();
  const [info, setInfo] = useState();
  const [boatList, setBoatList] = useState([]); // 보트 리스트를 가져오기 위함
  const [recoilLatLng, setRecoilLatLng] = useRecoilState(recoilLatLngAtom);
  const [, setMarkerAddress] = useRecoilState(markerAddressAtom); // 마커 주소 상태
  const [state, setState] = useState({
    center: {
      lat: 33.450701,
      lng: 126.570667,
    },
    errMsg: null,
    isLoading: true,
  });

  const getLocation = async () => {
    if (navigator.geolocation) {
      // GeoLocation을 이용해서 접속 위치를 얻어옵니다
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setState((prev) => ({
            ...prev,
            center: {
              lat: position.coords.latitude, // 위도
              lng: position.coords.longitude, // 경도
            },
            isLoading: false,
          }));
        },
        (err) => {
          setState((prev) => ({
            ...prev,
            errMsg: err.message,
            isLoading: false,
          }));
        }
      );
    } else {
      // HTML5의 GeoLocation을 사용할 수 없을때 마커 표시 위치와 인포윈도우 내용을 설정합니다
      setState((prev) => ({
        ...prev,
        errMsg: "geolocation을 사용할수 없어요...",
        isLoading: false,
      }));
    }
  };

  const mapClickHandler = (mouseEvent) => {
    // 클릭한 위치 좌표
    setRecoilLatLng({
      lat: mouseEvent.latLng.getLat(),
      lng: mouseEvent.latLng.getLng(),
    });

    // 좌표 주소 변환 객체
    const geocoder = new kakao.maps.services.Geocoder();

    geocoder.coord2Address(
      mouseEvent.latLng.getLng(),
      mouseEvent.latLng.getLat(),
      (result, status) => {
        if (status === kakao.maps.services.Status.OK) {
          const getAddress = `${result[0].address.region_1depth_name} ${result[0].address.region_2depth_name} ${result[0].address.region_3depth_name}`;
          // 마커 주소 업데이트
          setMarkerAddress(getAddress);
        }
      }
    );
  };

  const getBoatList = async (Bounds) => {
    try {
      const { data } = await AuthApi.getBoatList(Bounds);
      // console.log(data);
      setBoatList(data.boats);
      console.log(data.boats);
    } catch (error) {
      console.error("Error fetching post:", error);
    }
  };

  const getMapInfo = async () => {
    const map = mapRef.current;
    setInfo({
      //   center: {
      //     lat: map.getCenter().getLat(),
      //     lng: map.getCenter().getLng(),
      //   },
      swLatLng: {
        lat: map.getBounds().getSouthWest().getLat(),
        lng: map.getBounds().getSouthWest().getLng(),
      },
      neLatLng: {
        lat: map.getBounds().getNorthEast().getLat(),
        lng: map.getBounds().getNorthEast().getLng(),
      },
    });
    // getBoatList({
    //   swLatLng: [Number(info.swLatLng.lat), Number(info.swLatLng.lng)],
    //   neLatLng: [Number(info.neLatLng.lat), Number(info.neLatLng.lng)],
    // });
  };

  useEffect(() => {
    getLocation();
  }, []);

  return (
    <Map // 지도를 표시할 Container
      // 지도의 중심좌표
      center={state.center}
      style={{
        // 지도의 크기
        width: "100%",
        height: "100%",
      }}
      level={6} // 지도의 확대 레벨
      onClick={(_t, mouseEvent) => mapClickHandler(mouseEvent)}
      ref={mapRef}
    >
      {recoilLatLng && (
        <MapMarker position={recoilLatLng}>
          {/* MapMarker의 자식을 넣어줌으로 해당 자식이 InfoWindow로 만들어지게 합니다 */}
          {/* 인포윈도우에 표출될 내용으로 HTML 문자열이나 React Component가 가능합니다 */}
          <StInfowindowContainer>이곳에 모임 만들기</StInfowindowContainer>
        </MapMarker>
      )}

      <ZoomControl position={kakao.maps.ControlPosition.TOPRIGHT} />
    </Map>
  );
}

export default Kakaomaprefact;

const StInfowindowContainer = styled.div`
  padding: 5px 0 0 5px;
  color: #222;
  display: flex;
  flex-direction: row;
  justify-content: center;
`;
