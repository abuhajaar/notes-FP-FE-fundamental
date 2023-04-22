/* eslint-disable react/jsx-no-bind */
/* eslint-disable import/order */
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, Input } from '../../components';
import './Home.scss';
import { showFormattedDate } from '../../utils/index';
// import { getActiveNotes, deleteNote, archiveNote } from '../../utils/api';
import Reminder from '../../components/molekules/Reminder';
// eslint-disable-next-line import/no-extraneous-dependencies
import { useSelector, useDispatch } from 'react-redux';

// import { asyncAddReminder, asyncFetchReminders } from '../../states/reminder/action';
import { asyncDeleteNotesById } from '../../states/notes/action';
import { asyncFetchReminderAndNotes } from '../../states/shared/action';
// import Loading from '../../components/atoms/Loading';
import { FaSearch } from 'react-icons/fa';

function Home() {
  const { notes, authUser } = useSelector((state) => state);
  const { reminders } = useSelector((state) => state.reminders);

  const dispatch = useDispatch(); // @TODO: mengambil dispatch dari redux

  useEffect(() => {
    dispatch(asyncFetchReminderAndNotes());
  }, [dispatch]);

  async function onDeleteHandler(id) {
    dispatch(asyncDeleteNotesById(id));
    // dispatch(asyncFetchNotes());
  }

  async function onArsipHandler(id) {
    // dispatch(asyncArchiveNotesById(id));
    // dispatch(asyncFetchNotes());
  }

  return (
    <div className="home-page">
      {console.log('DATA REMINDERS DI HOME', authUser.name)}
      <section className="home-page__top">
        <section className="home-page__top__notes">
          <div className="home-page__top__notes__search">
            <Input className="home-page__top__notes__search__input" placeholder="search" />
            <button type="button" className="home-page__top__notes__search__btn">
              {' '}
              <FaSearch />
              {' '}
            </button>
          </div>
          <div className="home-page__top__notes__content">
            <div className={!notes.length ? 'home-page__top__notes__content__NotFound' : 'home-page__top__notes__content__card'}>
              {!notes.length ? (<h2>Your Notes Is Empty</h2>) : (
                notes.map((data) => (
                  <Card
                    key={data.id}
                    id={data.id}
                    btnTitle1="Archived"
                    btnTitle2="Delete"
                    title={data.title}
                    body={data.body}
                    createAt={showFormattedDate(data.created_at)}
                    onDelete={onDeleteHandler}
                    onArsip={onArsipHandler}
                  />
                ))
              )}
            </div>
          </div>
          <Link className="home-page__top__notes__show" to="/newnote">
            <div className="home-page__top__notes__show__navlink">
              Tambah Note
            </div>
          </Link>
        </section>
        <section className="home-page__top__explore">
          <div className="home-page__top__explore__reminder">
            <Reminder reminders={reminders} />
          </div>
          <div className="home-page__top__explore__thread">Upcoming Content</div>
        </section>
      </section>
      <section className="main-bottom">sdadsad</section>
    </div>
  );
}

export default Home;
