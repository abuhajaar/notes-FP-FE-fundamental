import React from 'react';
import { Link } from 'react-router-dom';
import './reminder-card.scss';

function ReminderCard({ reminderDate, reminderTotalTask }) {
  function formatDate(date) {
    const newDate = new Date(date);
    const year = newDate.getFullYear();
    const month = newDate.getMonth() + 1;
    const dt = newDate.getDate();

    return `${dt}-${month}-${year}`;
  }
  return (
    <Link className="reminder-card" to={`/reminder/${reminderDate}`}>
      <div className="card">
        <div className="container">
          <div className="date">{formatDate(reminderDate)}</div>
          <div className="todo">
            {reminderTotalTask}
            {' '}
            Tasks for this day
          </div>
        </div>
      </div>
    </Link>
  );
}

export default ReminderCard;
