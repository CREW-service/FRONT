import React, { useState, useEffect, useRef } from "react";
import AuthApi from "shared/api";
import { Map, MapMarker, ZoomControl } from "react-kakao-maps-sdk";
import { useRecoilState } from "recoil";
import { markerAddressAtom, recoilLatLngAtom } from "Recoil/recoilAtoms";
import styled from "styled-components";
import { Link } from "react-router-dom";
import MYLOCATION from "imgs/Vector.png";

const { kakao } = window;

function Kakaomaprefact() {
  const mapRef = useRef();
  const [boatList, setBoatList] = useState([]); // 보트 리스트를 가져오기 위함
  const [recoilLatLng, setRecoilLatLng] = useRecoilState(recoilLatLngAtom);
  const [, setMarkerAddress] = useRecoilState(markerAddressAtom); // 마커 주소 상태
  const [selectedMarker, setSelectedMarker] = useState(null);

  const [getMapState, setGetMapState] = useState({
    center: {
      lat: null,
      lng: null,
    },
    isPanto: true,
  });

  const getDefaultLocation = () => {
    // 기본 좌표를 설정합니다 (예: 서울 시청 좌표)
    const defaultLocation = {
      lat: 37.566779082667516, // 위도
      lng: 126.97826742400407, // 경도
    };
    return defaultLocation;
  };

  const getLocation = () =>
    new Promise((resolve, reject) => {
      if (navigator.geolocation) {
        // GeoLocation을 이용해서 접속 위치를 얻어옵니다
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const location = {
              lat: position.coords.latitude, // 위도
              lng: position.coords.longitude, // 경도
            };
            resolve(location);
          },
          (err) => {
            // 위치 정보 사용을 거부한 경우 기본 좌표 사용
            resolve(getDefaultLocation());
          }
        );
      } else {
        // 위치 정보를 사용할 수 없는 경우 기본 좌표 사용
        resolve(getDefaultLocation());
      }
    });

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
      return data.boats;
    } catch (error) {
      console.error("Error fetching post:", error);
      throw error;
    }
  };

  const getMapInfo = async () => {
    const map = mapRef.current;
    const bounds = {
      center: {
        lat: map.getCenter().getLat(),
        lng: map.getCenter().getLng(),
      },
      swLatLng: [
        map.getBounds().getSouthWest().getLat(),
        map.getBounds().getSouthWest().getLng(),
      ],
      neLatLng: [
        map.getBounds().getNorthEast().getLat(),
        map.getBounds().getNorthEast().getLng(),
      ],
    };
    return bounds;
  };

  const handleMapLoad = async () => {
    const location = await getLocation();
    setGetMapState({ center: location });
    if (location === getDefaultLocation()) {
      // 위치정보 사용을 거부한 경우, 기본 좌표로 지도를 초기화합니다.
      mapRef.current?.setCenter(
        new kakao.maps.LatLng(location.lat, location.lng)
      );
    }
  };

  const handletileLoaded = async () => {
    const mapInfo = await getMapInfo();
    const getList = await getBoatList(mapInfo);
    setBoatList(getList);
  };

  useEffect(() => {
    handleMapLoad();
  }, []);

  const markerClickHandler = () => {
    setRecoilLatLng(null);
  };

  const boatClickHandler = (boatId) => {
    if (selectedMarker === boatId) {
      setSelectedMarker(null); // 이미 선택된 마커를 다시 클릭하면 인포 윈도우를 지웁니다.
    } else {
      setSelectedMarker(boatId);
    }
  };

  const traceBoundHandler = async () => {
    const mapInfo = await getMapInfo();
    setGetMapState((prev) => ({
      ...prev,
      center: mapInfo.center,
    }));
  };
  const mapMoveMyLocationHandler = async () => {
    const location = await getLocation();
    setGetMapState((prev) => ({
      ...prev,
      center: location,
    }));
  };

  return (
    <div
      id="map wwwwaaaaaappppp"
      style={{
        width: "100%",
        height: "100%",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <Map // 지도를 표시할 Container
        // 지도의 중심좌표
        center={getMapState.center}
        isPanto={getMapState.isPanto}
        style={{
          // 지도의 크기
          width: "100%",
          height: "100%",
        }}
        level={6} // 지도의 확대 레벨
        onClick={(_t, mouseEvent) => mapClickHandler(mouseEvent)}
        ref={mapRef}
        onBoundsChanged={traceBoundHandler}
        onTileLoaded={handletileLoaded}
      >
        {recoilLatLng && (
          <MapMarker position={recoilLatLng} onClick={markerClickHandler}>
            {/* MapMarker의 자식을 넣어줌으로 해당 자식이 InfoWindow로 만들어지게 합니다 */}
            {/* 인포윈도우에 표출될 내용으로 HTML 문자열이나 React Component가 가능합니다 */}

            <StInfowindowContainer className="wrap marker">
              <span>여기에 모임 만들기</span>
              <span>아래 글쓰기 버튼을 눌러보세요!</span>
            </StInfowindowContainer>
            {/* <StInfowindowContainer>
              아래 글쓰기 버튼을 눌러보세요!
            </StInfowindowContainer> */}
          </MapMarker>
        )}
        <ZoomControl position={kakao.maps.ControlPosition.TOPRIGHT} />
        {boatList.map((boat) => (
          <MapMarker
            key={boat.boatId}
            position={{ lat: boat.latitude, lng: boat.longitude }} // 마커를 표시할 위치
            image={{
              src: "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png", // 마커이미지의 주소입니다
              size: {
                width: 24,
                height: 35,
              }, // 마커이미지의 크기입니다
            }}
            onClick={() => boatClickHandler(boat.boatId)}
          >
            {/* MapMarker의 자식을 넣어줌으로 해당 자식이 InfoWindow로 만들어지게 합니다 */}
            {/* 인포윈도우에 표출될 내용으로 HTML 문자열이나 React Component가 가능합니다 */}
            {selectedMarker === boat.boatId && (
              <div className="wrap marker" id={boat.boatId}>
                <div className="title detailtitle">{boat.title}</div>
                <div className="body">
                  <div className="desc">
                    <div>모집 인원:</div>
                    <div>
                      {boat.crewNum}/{boat.maxCrewNum}
                    </div>
                  </div>
                  <div className="desc">
                    <div>모집 마감:</div>
                    <div>{boat.endDate ? boat.endDate : "상시 모집"}</div>
                  </div>
                  <div className="godetail">
                    <Link className="detaillink" to={`/boat/${boat.boatId}`}>
                      자세히 보기
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </MapMarker>
        ))}
        <StOverLayButtonDiv className="category">
          <StMyLocationButton type="button" onClick={mapMoveMyLocationHandler}>
            <img src={MYLOCATION} alt="내 위치" />
          </StMyLocationButton>
        </StOverLayButtonDiv>
      </Map>
    </div>
  );
}

export default Kakaomaprefact;

const StInfowindowContainer = styled.div`
  margin: o auto;
  background-color: #fff;
  color: #222;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StOverLayButtonDiv = styled.div`
  position: absolute;
  overflow: hidden;
  top: 10px;
  left: 10px;
  z-index: 500;
  border: 1px solid black;
  font-family: "Malgun Gothic", "맑은 고딕", sans-serif;
  font-size: 12px;
  text-align: center;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex-wrap: wrap;
`;

const StMyLocationButton = styled.button`
  background-color: transparent;
  border: 0;
`;
