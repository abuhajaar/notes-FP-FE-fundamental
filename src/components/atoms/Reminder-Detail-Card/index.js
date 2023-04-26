/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import './reminder-detail-card.scss';
import { FaEdit, FaHeart, FaTrashAlt } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { asyncCompleteReminder, asyncDeleteReminder, asyncFavoriteReminder } from '../../../states/reminder/action';
import { FormattedDate } from '../../../utils';
import PopupForm from '../../molekules/PopupForm';

function ReminderDetailCard({ data }) {
  const {
    id, content, title, date, category, completed, favorite,
  } = data;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const toggleFavorite = () => {
    dispatch(asyncFavoriteReminder(id));
  };

  const toggleCompleted = () => {
    dispatch(asyncCompleteReminder(id));
  };

  const handleDelete = () => {
    dispatch(asyncDeleteReminder(id));
    navigate('/reminder');
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
        <p className="card-todo__body__date">{FormattedDate(date)}</p>
      </div>
      <div className="card-todo__footer">
        <div className="card-todo__footer__left">
          <button type="button" className={completed ? ('card-todo__footer__left__completed') : ('card-todo__footer__left__uncompleted')} onClick={toggleCompleted}>{completed ? (<h4>completed</h4>) : (<h4>uncompleted</h4>)}</button>
        </div>
        <div className="card-todo__footer__right">
          <button type="button" className={favorite ? ('card-todo__footer__right__favorite__on') : ('card-todo__footer__right__favorite__off')} onClick={toggleFavorite}><FaHeart /></button>
          <button type="button" className="card-todo__footer__right__delete" onClick={handleDelete}><FaTrashAlt /></button>
          <button type="button" className="card-todo__footer__right__edit" onClick={handleEdit}><FaEdit /></button>
        </div>
      </div>
    </div>

  );
}
export default ReminderDetailCard;
