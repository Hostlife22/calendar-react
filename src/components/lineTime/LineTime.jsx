import PropTypes from 'prop-types';
import React from 'react';
import './lineTime.scss';

const LineTime = ({ styleTop }) => {
  return (
    <div className="current-time" style={{ top: `${styleTop}px` }}>
      <div className="current-time__line"></div>
      <div className="current-time__circle"></div>
    </div>
  );
};

LineTime.propTypes = {
  styleTop: PropTypes.number.isRequired,
};

export default LineTime;
