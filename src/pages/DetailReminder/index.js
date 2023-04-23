import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import ReminderDetailCard from '../../components/atoms/Reminder-Detail-Card';
import './DetailReminder.scss';
// import { getData } from '../../utils/fetch';
import PopupForm from '../../components/molekules/PopupForm';
import { asyncAddReminder, asyncFetchReminders } from '../../states/reminder/action';
// import { asyncAddReminder, asyncFetchReminders } from '../../states/reminder/action';

function DetailReminder() {
  const { date } = useParams();
  const { reminders, status } = useSelector((state) => state.reminders);
  const dispatch = useDispatch(); // @TODO: mengambil dispatch dari redux
  const [data, setData] = useState([]);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(asyncFetchReminders());
      console.log('render fecth');
    }
    // dispatch(asyncFetchReminders());
  }, []);

  useEffect(() => {
    if (date !== undefined) {
      const filterData = reminders.filter((reminder) => reminder.date === date);
      setData(filterData);
    } else {
      setData(reminders);
    }
  }, [date, dispatch, reminders]);

  const submitForm = (formData) => {
    dispatch(asyncAddReminder(formData));
  };

  if (!reminders) {
    return <h1>Loading Reminder</h1>;
  }

  return (
    <div className="reminder-detail-page">
      <div className="reminder-detail-page__selector">
        <button type="button">Today's Task</button>
        <button type="button">All Tasks</button>
      </div>
      <div className="reminder-detail-page__wrapper">
        <div className={!data.length ? 'reminder-detail-page__wrapper__notfound' : 'reminder-detail-page__wrapper__card-container'}>
          {!data.length ? (null) : (
            data.map((datas) => (<ReminderDetailCard key={datas.id} data={datas} />))
          )}
          <PopupForm handleSubmit={submitForm} />
        </div>
      </div>
      <div className="reminder-detail-page__progress">
        <h1>Progress</h1>
      </div>
    </div>
  );
}

export default DetailReminder;
