import { atom } from "recoil";

export const markerPositionAtom = atom({
  key: "markerPosition",
  default: null,
});

export const markerAddressAtom = atom({
  key: "markerAddress",
  default: "",
});

export const recoilLatLngAtom = atom({
  key: "recoilLatLng",
  default: {
    lat: null,
    lng: null,
  },
});

export const boatListAtom = atom({
  key: "boatList",
  default: [],
});

export const currentUserIdAtom = atom({
  key: "currentUserId",
  default: "",
});

export const personTypeAtom = atom({
  key: "personType",
  default: "",
});

export const boatAtom = atom({
  key: "boat",
  default: "",
});
