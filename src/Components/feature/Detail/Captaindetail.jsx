import React, { useState } from "react";
import PropTypes from "prop-types";
import DOMPurify from "dompurify"; // DOMPurify 라이브러리 가져오기
import Captainmodal from "./Modal/Captainmodal";
import Comment from "./Comment/Comment";

function Captaindetail({ boat, boatId, renderTriggerHandler }) {
  // 모달창 노출 여부 state
  const [modalOpen, setModalOpen] = useState(false);

  // 모달창 노출
  const showModal = () => {
    setModalOpen(true);
  };

  return (
    <div>
      <div>
        <div>제목 : {boat.boat.title}</div>
        <div>
          작성일 : {new Date(boat.boat.createdAt).toISOString().split("T")[0]}
          <br />
          작성자 : {boat.boat.captain}
        </div>
        <div>지역: {boat.boat.address}</div>
        <div>모집 기한: {boat.boat.endDate}</div>
        <div>
          모집 인원: {boat.boat.crewNum}/{boat.boat.maxCrewNum}
        </div>
        <div>
          <div
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(boat.boat.content),
            }}
          />
        </div>
      </div>
      <div>
        <button type="button" onClick={showModal}>
          글수정삭제btn
        </button>
        {modalOpen && (
          <Captainmodal boatId={boatId} setModalOpen={setModalOpen} />
        )}
      </div>
      <Comment
        boat={boat}
        boatId={boatId}
        renderTriggerHandler={renderTriggerHandler}
      />
    </div>
  );
}

export default Captaindetail;

Captaindetail.propTypes = {
  boat: PropTypes.node.isRequired,
  boatId: PropTypes.node.isRequired,
  renderTriggerHandler: PropTypes.node.isRequired,
};
