import { React, useState, useEffect } from 'react';
import { useParams } from 'react-router';
import ReminderDetailCard from '../../components/atoms/Reminder-Detail-Card';
import reminders from '../../utils/Reminders';

function DetailReminder() {
  const { id } = useParams();
  const [reminder, setReminder] = useState([]);

  useEffect(() => {
    // getReminder(date).then(({ data }) => {
    //   setReminder(data);
    // });
    const remindertest = reminders.filter((data) => data.tanggal === id);
    setReminder(remindertest);
  }, [id]);

  console.log(reminder);

  if (!reminder) {
    return <h1>Loading Reminder</h1>;
  }

  return (
    <div className="detail_page">
      <div className="wrapper-detailReminder">
        <div className={!reminder.length ? 'NotFound' : 'Card-container'}>
          {reminder.map((data) => {
            return (
              <ReminderDetailCard content={data.content} />
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default DetailReminder;
