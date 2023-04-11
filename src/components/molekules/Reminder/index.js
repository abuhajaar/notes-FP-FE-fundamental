import React, { useState, useEffect } from 'react';

import ReminderCard from '../../atoms/Reminder-Card';
import './reminder.scss';

function Reminder({ reminders = [] }) {
  const [dates, setDates] = useState([]);

  function FormattedDate(date) {
    const [year, month, day] = date.split('-');
    const formattedDate = `${day}.${month}.${year}`;

    return formattedDate;
  }

  useEffect(() => {
    const currentDate = new Date();
    const nextSevenDays = [];
    for (let i = 0; i <= 6; i++) {
      const nextDate = new Date(currentDate);
      nextDate.setDate(currentDate.getDate() + i);
      nextSevenDays.push(nextDate.toISOString().substring(0, 10));
    }
    setDates(nextSevenDays);
  }, []);
  console.log(new Date());

  return (
    <div className="reminder-wrapper">
      {dates.map((date) => {
        let total = reminders.filter((reminder) => reminder.tanggal === date)
          ? reminders.filter((reminder) => reminder.tanggal === date)
          : null;
        let formatTanggal = FormattedDate(date);
        return (
          <ReminderCard
            key={date}
            reminderDate={formatTanggal}
            reminderTotalTask={total.length}
          />
        );
      })}
    </div>
  );
}

export default Reminder;
