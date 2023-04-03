import React from 'react'
import './Button.scss'
import PropTypes from 'prop-types';
function Button({ title, onClick, ...Rest }) {

    return (
        <button className="button" onClick={onClick}{...Rest}>
            {title}
        </button>
    )
}

Button.propTypes = {

    title: PropTypes.string.isRequired,
    onClick: PropTypes.func
}

export default Button
