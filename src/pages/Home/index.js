import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { FaSearch } from 'react-icons/fa';
import { Card, Input } from '../../components';
import './Home.scss';
import { showFormattedDate } from '../../utils/index';
import Reminder from '../../components/molekules/Reminder';
import { asyncDeleteNotesById } from '../../states/notes/action';
import { asyncFetchReminderAndNotes } from '../../states/shared/action';

import { FaSearch } from 'react-icons/fa';
import Loading from '../../components/atoms/Loading';

function Home() {
  const { reminders, notes } = useSelector((state) => state);
  const dispatch = useDispatch(); // @TODO: mengambil dispatch dari redux

  useEffect(() => {
    dispatch(asyncFetchReminderAndNotes());
  }, [dispatch]);


  async function onDeleteHandler(id) {
    dispatch(asyncDeleteNotesById(id));
    // dispatch(asyncFetchNotes());

  if (reminders.length === 0) {
    dispatch(asyncFetchReminderAndNotes());
  }
} [dispatch, reminders];

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
      <div className="home-page__top">
        <div className="home-page__top__notes">
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
        </div>
        <div className="home-page__top__explore">
          <div className="home-page__top__explore__reminder">
            <Reminder reminders={reminders} />
          </div>
          <div className="home-page__top__explore__thread">Upcoming Content</div>
        </div>
      </div>
      <div className="main-bottom">sdadsad</div>
    </div>
  );
}


export default Home;
