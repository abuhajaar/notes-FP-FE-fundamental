import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

function Progress({ today }) {
  const { reminders } = useSelector((state) => state.reminders);
  const [completedAll, setCompletedAll] = useState(0);
  const [completedToday, setCompletedToday] = useState(0);
  const [todayReminderLength, setTodayReminderLength] = useState(0);

  useEffect(() => {
    const completedRemindersAll = reminders.filter((reminder) => reminder.completed === true);
    setCompletedAll(completedRemindersAll.length);
    const completedRemindersToday = reminders.filter((reminder) => reminder.completed === true && reminder.date === today);
    setCompletedToday(completedRemindersToday.length);
    const todayReminders = reminders.filter((reminder) => reminder.date === today);
    setTodayReminderLength(todayReminders.length);
  }, [reminders, today]);

  const todayBar = (completedToday / todayReminderLength) * 100;
  const allBar = (completedAll / reminders.length) * 100;

  return (
    <div className="wrapper">
      <div className="wrapper__label">
        <div className="wrapper__label__today">Tasks Today</div>

        <div className="wrapper__label__number">
          {completedToday}
          {' '}
          /
          {' '}
          {todayReminderLength}
        </div>

      </div>
      <div className="wrapper__progress">
        <div className="wrapper__progress__bar" style={{ width: `${todayBar}%` }} />
      </div>

      <div className="wrapper__label">
        <div className="wrapper__label__all">All Tasks</div>

        <div className="wrapper__label__number">
          {completedAll}
          {' '}
          /
          {' '}
          {reminders.length}
        </div>

      </div>
      <div className="wrapper__progress">
        <div className="wrapper__progress__bar" style={{ width: `${allBar}%` }} />
      </div>
    </div>
  );
}

export default Progress;
