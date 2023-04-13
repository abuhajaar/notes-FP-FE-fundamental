import React from 'react';
import './reminder-detail-card.scss';
import { FaHeart } from 'react-icons/fa';

function ReminderDetailCard({data}) {
  const {content, title, date, category, completed, favorite} = data;

  return (
    <div className="card-todo">
      <div className="card-todo__header">
        <h2 className="card-todo__header__title">{title}</h2>
        <p className='card-todo__header__category'>{category}</p>
      </div>
      
      <div className="card-todo__body">
      <p className='card-todo__body__content'>{content}</p>
      <p className="card-todo__body__date">{date}</p>
      </div>
      <div className="card-todo__footer">
        <div className="card-todo__footer__left">
        <button className="card-todo__footer__left__completed">{completed ? (<h3>completed</h3>) : (<h3>uncompleted</h3>)}</button>
        </div>
        <div className="card-todo__footer__right">
          <button className={favorite ? ("card-todo__footer__right__favorite__on") : ("card-todo__footer__right__favorite__off")}><FaHeart /></button>
          <button className="card-todo__footer__right__delete">Delete</button>
          <button className="card-todo__footer__right__edit">Edit</button>
          </div>
        </div>
    </div>
      
  );
}
export default ReminderDetailCard;
