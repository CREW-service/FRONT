import React, { useState } from "react";
import PropTypes from "prop-types";
import DOMPurify from "dompurify"; // DOMPurify 라이브러리 가져오기
import Captinmodal from "./Modal/Captinmodal";

function Captindetail({ boat }) {
  // 모달창 노출 여부 state
  const [modalOpen, setModalOpen] = useState(false);

  // 모달창 노출
  const showModal = () => {
    setModalOpen(true);
  };

  return (
    <div>
      <div>
        <div>제목 : {boat.title}</div>
        <div>
          작성일 : {new Date(boat.createdAt).toISOString().split("T")[0]}
          <br />
          작성자 : {boat.captain}
        </div>
        <div>지역: {boat.address}</div>
        <div>모집 기한: {boat.endDate}</div>
        <div>
          모집 인원: {boat.crewNum}/{boat.maxCrewNum}
        </div>
        <div>
          <div
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(boat.content),
            }}
          />
        </div>
      </div>
      <div>
        <button type="button" onClick={showModal}>
          글수정삭제btn
        </button>
        {modalOpen && <Captinmodal setModalOpen={setModalOpen} />}
      </div>
    </div>
  );
}

export default Captindetail;

Captindetail.propTypes = {
  boat: PropTypes.node.isRequired,
};
