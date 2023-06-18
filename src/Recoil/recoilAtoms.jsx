import { atom } from "recoil";

export const markerPositionAtom = atom({
  key: "markerPosition",
  default: null
});

export const markerAddressAtom = atom({
  key: "markerAddress",
  default: "",
});

export const recoilLatLngAtom = atom({
  key:"recoilLatLng",
  default: {lat: null, lng:null},
})