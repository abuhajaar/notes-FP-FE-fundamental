import React from 'react';
import './Button.scss';
import PropTypes from 'prop-types';

function Button({ title, onClick, ...Rest }) {
  return (
    <button type="button" className="button-setting" onClick={onClick} {...Rest}>
      {title}
    </button>
  );
}

Button.propTypes = {
  title: PropTypes.string.isRequired,

};

export default Button;
