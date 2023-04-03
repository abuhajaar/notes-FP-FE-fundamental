
import React from 'react'
import Button from '../Button';
import { NavLink } from 'react-router-dom';
import './card.scss'
import Gap from '../Gap'
import parser from 'html-react-parser';
import PropTypes from 'prop-types';



function Card(props) {
    const { btnTitle2, btnTitle1, id, onDelete, title, body, createAt, onArsip } = props;

    return (
        <div className='Card'>
            <h1 className='note-item__title' >
                <NavLink className='note-item__title' to={`/notes/${id}`}>{title}</NavLink>
            </h1>
            <p className='note-item__date'>{createAt}</ p>
            <div className='Box'>
                {parser(body)}
            </div>
            <Gap height={20} />
            <div className='note-item__action'>
                <Button title={btnTitle1} onClick={() => onArsip(id)} />
                <Gap width={20} />
                <Button title={btnTitle2} onClick={() => onDelete(id)} />
            </div>
        </div>
    )
}

Card.propTypes = {
    id: PropTypes.string.isRequired,
    onArsip: PropTypes.func,
    btnTitle1: PropTypes.string.isRequired,
    btnTitle2: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    createAt: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    onDelete: PropTypes.func.isRequired
}



export default Card