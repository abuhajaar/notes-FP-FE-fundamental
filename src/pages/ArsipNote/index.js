/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card } from '../../components';
import { showFormattedDate } from '../../utils';
import './arsip.scss';
import { asyncDeleteNotesById, asyncToggleArchiveNotesById } from '../../states/notes/action';

function ArsipPage() {
  const { notes } = useSelector((state) => state);
  const [notesData, setNotesData] = React.useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log(notes);
    const result = notes.filter((note) => note.is_archived === true);
    setNotesData(result);
  }, [dispatch, notes]);

  const onDeleteHandler = (id) => {
    dispatch(asyncDeleteNotesById(id));
  };

  const onArsipHandler = (id) => {
    dispatch(asyncToggleArchiveNotesById(id));
    console.log('arsip');
  };

  if (!notesData) {
    return (
      <h1>
        Loading...
      </h1>
    );
  }
  return (
    <div className="main-page">
      <div className={!notesData.length ? 'NotFound' : 'Card-container'}>
        {!notesData.length ? (
          <h1>TIDAK ADA ARSIP NOTE</h1>
        ) : (
          notesData.map((note) => (
            <Card
              key={note.id}
              id={note.id}
              btnTitle1="Activate"
              btnTitle2="Delete"
              title={note.title}
              body={note.body}
              createAt={showFormattedDate(note.created_at)}
              onDelete={onDeleteHandler}
              onArsip={onArsipHandler}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default ArsipPage;
