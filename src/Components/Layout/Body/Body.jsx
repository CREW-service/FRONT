import React from 'react'
import PropTypes from "prop-types";


function Body({ children }) {
  return (
    <div>{children}</div>
  )
}


Body.propTypes = {
    children: PropTypes.node.isRequired,
  };

export default Body