import React from 'react';
import { Link } from 'react-router-dom';
import './reminder-card.scss';

function ReminderCard(props) {
  const { reminderDate, reminderTotalTask } = props;
  return (
    <Link className="reminder-card" to={`/reminder/${reminderDate}`}>
      <div className="card">
        <div className="container">
          <div className="date">{reminderDate}</div>
          <div className="todo">{reminderTotalTask} Tasks for this day</div>
        </div>
      </div>
    </Link>
  );
}

export default ReminderCard;
