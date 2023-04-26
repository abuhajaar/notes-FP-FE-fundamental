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

  return (
    <div>
      <div>
        {completedToday}
        /
        {' '}
        {todayReminderLength}
      </div>
      <div>
        {completedAll}
        /
        {' '}
        {reminders.length}
      </div>
    </div>
  );
}

export default Progress;
