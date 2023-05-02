import React, { useState, useEffect } from 'react';
import ReminderCard from '../../atoms/Reminder-Card';
import './reminder.scss';

function Reminder({ reminders = [] }) {
  const [dates, setDates] = useState([]);

  useEffect(() => {
    const currentDate = new Date();
    setDates([currentDate.toISOString().substring(0, 10)]);
  }, []);

  const total = reminders.filter((reminder) => reminder.date === dates[0]);
  return (
    <div className="reminder-wrapper">
      <div>
        <ReminderCard
          reminderDate={dates}
          reminderTotalTask={total.length}
        />
      </div>
    </div>
  );
}

export default Reminder;
