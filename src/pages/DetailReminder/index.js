import { React, useState, useEffect } from 'react';
import { useParams } from 'react-router';
import ReminderDetailCard from '../../components/atoms/Reminder-Detail-Card';
import reminders from '../Home';

function DetailReminder() {
  const { date } = useParams();
  const [reminder, setReminder] = useState([]);

  useEffect(() => {
    // getReminder(date).then(({ data }) => {
    //   setReminder(data);
    // });
    setReminder(reminders);
  }, [date]);

  if (!reminder) {
    return <h1>Loading Reminder</h1>;
  }

  return (
    <div className="detail_page">
      <div className="wrapper-detailReminder">
        <div className={!reminder.length ? 'NotFound' : 'Card-container'}>
          {!reminder.length ? (
            <h1>Tidak Ada Rencana untuk Hari Ini</h1>
          ) : (
            reminder.map((data) => {
              return <ReminderDetailCard content={data.content} />;
            })
          )}
        </div>
      </div>
    </div>
  );
}

export default DetailReminder;
