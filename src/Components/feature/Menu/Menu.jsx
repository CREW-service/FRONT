import React from "react";
import styled from "styled-components";
import MENUICON from "./menu_ic.png"

function Menu() {
  return (
    <div>
          <StMenuButton type="button">
            <StImg
              src={MENUICON}
              alt="알림 아이콘"
            />
          </StMenuButton>
        </div>
  )
}

export default Menu;

const StMenuButton = styled.button`
  background: #fff;
  border: 0;
  position: relative;
  font-size: 46px;
  color: var(--gr-deep, #3e4756);
`;

const StImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
`;