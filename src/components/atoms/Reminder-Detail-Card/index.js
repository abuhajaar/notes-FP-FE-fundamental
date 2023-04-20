/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import './reminder-detail-card.scss';
import { FaHeart } from 'react-icons/fa';

function ReminderDetailCard({ data }) {
  const {
    content, title, date, category, completed, favorite,
  } = data;

  const toggleFavorite = () => {
    console.log('favorite');
  };

  const toggleCompleted = () => {
    console.log('completed');
  };

  const handleDelete = () => {
    console.log('delete');
  };

  const handleEdit = () => {
    console.log('edit');
  };

  return (
    <div className="card-todo">
      <div className="card-todo__header">
        <h2 className="card-todo__header__title">{title}</h2>
        <p className="card-todo__header__category">{category}</p>
      </div>

      <div className="card-todo__body">
        <p className="card-todo__body__content">{content}</p>
        <p className="card-todo__body__date">{date}</p>
      </div>
      <div className="card-todo__footer">
        <div className="card-todo__footer__left">
          <button type="button" className="card-todo__footer__left__completed" onClick={toggleCompleted}>{completed ? (<h3>completed</h3>) : (<h3>uncompleted</h3>)}</button>
        </div>
        <div className="card-todo__footer__right">
          <button type="button" className={favorite ? ('card-todo__footer__right__favorite__on') : ('card-todo__footer__right__favorite__off')} onClick={toggleFavorite}><FaHeart /></button>
          <button type="button" className="card-todo__footer__right__delete" onClick={handleDelete}>Delete</button>
          <button type="button" className="card-todo__footer__right__edit" onClick={handleEdit}>Edit</button>
        </div>
      </div>
    </div>

  );
}
export default ReminderDetailCard;
