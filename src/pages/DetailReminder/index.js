import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import ReminderDetailCard from '../../components/atoms/Reminder-Detail-Card';
import './DetailReminder.scss';
// import { getData } from '../../utils/fetch';
import PopupForm from '../../components/molekules/PopupForm';
import { asyncAddReminder, asyncFetchReminders } from '../../states/reminder/action';


function DetailReminder() {
  const { id } = useParams();
  const { reminders } = useSelector(state => state.reminders);
  const dispatch = useDispatch(); // @TODO: mengambil dispatch dari redux
  const [data, setData] = useState([]);

  useEffect(() => {
    dispatch(asyncFetchReminders());
    setData(reminders.filter((data) => data.date === id));
  }, [dispatch]);

  function submitForm(data) {
    dispatch(asyncAddReminder(data));
  }


  if (!reminders) {
    return <h1>Loading Reminder</h1>;
  }

  function submitForm(data) {
    console.log('data', data);
  }

  return (
    <div className="reminder-detail-page">
      <div className="reminder-detail-page__wrapper">
        <div className={!data.length ? 'reminder-detail-page__wrapper__notfound' : 'reminder-detail-page__wrapper__card-container'}>
          {!data.length ? (null) : (
            data.map((data) => {
              return (<ReminderDetailCard key={data.id} data={data} />);
            })
          )}
          <PopupForm handleSubmit={submitForm()} />
        </div>
      </div>
    </div>
  );
}

export default DetailReminder;
