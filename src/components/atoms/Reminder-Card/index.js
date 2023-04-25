import React from 'react';
import { Link } from 'react-router-dom';
import './reminder-card.scss';

function ReminderCard({ reminderDate, reminderTotalTask }) {
  // Fotmat Date Begin

  function formatDay(date) {
    const newDate = new Date(date);
    const weekday = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const day = weekday[newDate.getDay()];
    return day;
  }

  function formatDate(date) {
    const newDate = new Date(date);
    const year = newDate.getFullYear();
    const month = newDate.getMonth() + 1;
    const dt = newDate.getDate();

    return `${dt}-${month}-${year}`;
  }

  // Fotmat Date End

  // Mouse Effect Begin

  const handleOnMouseMove = (e) => {
    const { currentTarget: target } = e;

    const rect = target.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    target.style.setProperty('--mouse-x', `${x}px`);
    target.style.setProperty('--mouse-y', `${y}px`);
  };

  for (const card of document.querySelectorAll('.card-reminder')) {
    card.onmousemove = (e) => handleOnMouseMove(e);
  }

  // Mouse Effect End

  return (
    <Link className="reminder-card" to="/reminder/today">
      <div className="card-reminder">
        <div className="card-reminder__container">
          <div className="card-reminder__container__day">
            <h1>{formatDay(reminderDate)}</h1>
          </div>
          <div className="card-reminder__container__date">
            <h3>
              {formatDate(reminderDate)}
            </h3>
          </div>
          <div className="card-reminder__container__todo">
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
