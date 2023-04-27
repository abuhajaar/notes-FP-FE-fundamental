/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import ReminderDetailCard from '../../components/atoms/Reminder-Detail-Card';
import './DetailReminder.scss';
// import { getData } from '../../utils/fetch';
import PopupForm from '../../components/molekules/PopupForm';
import {
  asyncAddReminder,
  asyncFetchReminders,
} from '../../states/reminder/action';
import Progress from './Progress';
// import { asyncAddReminder, asyncFetchReminders } from '../../states/reminder/action';

function DetailReminder() {
  const { date } = useParams();
  const { reminders, status } = useSelector((state) => state.reminders);
  const dispatch = useDispatch(); // @TODO: mengambil dispatch dari redux
  const [data, setData] = useState([]);
  const today = new Date().toISOString().slice(0, 10);
  const navigate = useNavigate();

  useEffect(() => {
    if (status === 'idle') {
      dispatch(asyncFetchReminders());
      // console.log('render fecth');
    }
    // dispatch(asyncFetchReminders());
  }, [status, dispatch]);

  const submitForm = (formData) => {
    dispatch(asyncAddReminder(formData));
  };

  if (!reminders) {
    return <h1>Loading Reminder</h1>;
  }

  const filterAllTask = () => {
    navigate('/reminder/all');
  };

  const filterTodayTask = () => {
    navigate('/reminder/today');
  };

  useEffect(() => {
    const filterData = reminders.filter((reminder) => reminder.date === today);
    switch (date) {
      case 'today':
        setData(filterData);
        break;
      case 'all':
        setData(reminders);
        break;
      default:
        setData(reminders);
        break;
    }
  }, [date, reminders, today]);

  return (
    <div className="reminder-detail-page">
      <div className="reminder-detail-page__selector">
        <button type="button" onClick={filterTodayTask}>
          {localStorage.getItem('local') === 'id' ? 'Tugas Hari Ini' : "Today's Task"}
        </button>
        <button type="button" onClick={filterAllTask}>
          {localStorage.getItem('local') === 'id' ? 'Semua Tugas' : 'All Task'}
        </button>
      </div>
      <div className="reminder-detail-page__wrapper">
        <div
          className={
                        !data.length
                          ? 'reminder-detail-page__wrapper__notfound'
                          : 'reminder-detail-page__wrapper__card-container'
                    }
        >
          {!data.length
            ? null
            : data.map((datas) => (
              <ReminderDetailCard key={datas.id} data={datas} />
            ))}
          <PopupForm handleSubmit={submitForm} isi={localStorage.getItem('local') === 'id' ? 'Tambahkan Tugas' : 'Add New Task'} className="btn-create" />
        </div>
      </div>
      <div className="reminder-detail-page__progress">
        <Progress today={today} />
      </div>
    </div>
  );
}

export default DetailReminder;
