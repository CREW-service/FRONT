import React from 'react'
import PropTypes from "prop-types";
import { styled } from 'styled-components';


function Body({ children }) {
  return (
    <StContainer>{children}</StContainer>
  )
}


Body.propTypes = {
    children: PropTypes.node.isRequired,
  };

export default Body

const StContainer = styled.div`
  width: 100%;
  height: 670px;
`