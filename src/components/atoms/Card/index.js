import React from 'react';
import { Link } from 'react-router-dom';
import './card.scss';
import parser from 'html-react-parser';
import PropTypes from 'prop-types';
import Gap from '../Gap';
import Button from '../Button';

function Card(props) {
  const {
    btnTitle2, btnTitle1, id, onDelete, title, body, createAt, onArsip,
  } = props;

  return (
    <div className="Card">
      <div className="card-content">
        <Link className="note-item__title" to={`/notes/${id}`}>
          <h1>{title}</h1>
        </Link>

        <p className="note-item__date">{createAt}</p>

        <div className="description">
          <h1 className="Box">{parser(body)}</h1>
        </div>

        <Gap height={20} />
        <div className="note-item__action">
          <Button title={btnTitle1} onClick={() => onArsip(id)} />

          <Button title={btnTitle2} onClick={() => onDelete(id)} />
        </div>
      </div>
    </div>
  );
}

Card.propTypes = {
  id: PropTypes.string.isRequired,
  btnTitle1: PropTypes.string.isRequired,
  btnTitle2: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  createAt: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default Card;
