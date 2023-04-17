
import { Card, Input } from '../../components';
import './Home.scss';
import { showFormattedDate } from '../../utils/index';
// import { getActiveNotes, deleteNote, archiveNote } from '../../utils/api';
import { Link } from 'react-router-dom';
import Reminder from '../../components/molekules/Reminder';
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

// import { asyncAddReminder, asyncFetchReminders } from '../../states/reminder/action';
import { asyncDeleteNotesById } from '../../states/notes/action';
import { asyncFetchReminderAndNotes } from '../../states/shared/action';
import Loading from '../../components/atoms/Loading';


function Home() {
  const { reminders, notes } = useSelector(state => state);
  const dispatch = useDispatch(); // @TODO: mengambil dispatch dari redux

  useEffect(() => {
    if (reminders.length === 0) {
      dispatch(asyncFetchReminderAndNotes());
    }
  }, [dispatch, reminders]);

  async function onDeleteHandler(id) {
    dispatch(asyncDeleteNotesById(id));
    // dispatch(asyncFetchNotes());
  }

  async function onArsipHandler(id) {

  }

  return (
    <div className="main-page">
      {/* {console.log('DATA REMINDERS DI HOME', reminders)} */}
      <section className="main-top">
        <section className="notes">
          <div className="wrapper-search">
            <Input className="search-input" placeholder="search" />
            <button className="btn-search">button</button>
          </div>
          <div className="wrapper-content">
            <div className={!notes.length ? 'NotFound' : 'Card-container'}>
              {!notes.length ? (
                <Loading />
              ) : (
                notes.map((data) => {
                  return (
                    <Card
                      key={data.id}
                      id={data.id}
                      btnTitle1={'Archived'}
                      btnTitle2={'Delete'}
                      title={data.title}
                      body={data.body}
                      createAt={showFormattedDate(data.created_at)}
                      onDelete={onDeleteHandler}
                      onArsip={onArsipHandler}
                    />
                  );
                })
              )}
            </div>
          </div>
          <div className="wrapper-add">
            <Link className="navlink" to={'/newnote'}>
              Tambah Note
            </Link>
          </div>
        </section>
        <section className="explore">
          <div className="example">
            <Reminder reminders={reminders} />
          </div>
          <div className="example">Upcoming Content</div>
        </section>
      </section>
      <section className="main-bottom">sdadsad</section>
    </div>
  );
}

export default Home;
