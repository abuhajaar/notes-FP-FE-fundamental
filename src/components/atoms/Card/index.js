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
    <div className="card-notes">
      <div className="card-notes__content">
        <Link className="card-notes__content__title" to={`/notes/${id}`}>
          <h1>{title}</h1>
        </Link>

        <p className="card-notes__content__date">{createAt}</p>

        <div className="card-notes__content__description">
          <h1 className="card-notes__content__description__box">{parser(body)}</h1>
        </div>

        <Gap height={20} />
        <div className="card-notes__content__action">
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
