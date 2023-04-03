import React from 'react'
import './input.scss'
import PropTypes from 'prop-types'
const Input = ({ placeholder }) => {
    return (
        <div className='input-wrapper'>
            <input className='input' placeholder={placeholder} />
        </div>
    )
}
Input.propTypes = {
    placeholder: PropTypes.string.isRequired,
}
export default Input