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

export const isLoginAtom = atom({
  key: "isLogin",
  default: false,
});

export const reportReasonAtom = atom({
  key: "reportReason",
  default: [
    "폭력적 또는 혐오스러운 콘텐츠",
    "유해한 위험 행위",
    "아동학대",
    "스팸 또는 사용자를 현혹하는 콘텐츠",
  ],
});
