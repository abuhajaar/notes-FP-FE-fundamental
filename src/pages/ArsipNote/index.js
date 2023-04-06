/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { deleteNote, getArchivedNotes, unarchiveNote } from '../../utils/api';
import { Card } from '../../components';
import { showFormattedDate } from '../../utils';
import './arsip.scss';

function ArsipPage() {
  const [notes, setNotes] = React.useState([]);

  useEffect(() => {
    getArchivedNotes().then(({ data }) => {
      setNotes(data);
    });
  }, []);

  async function onDeleteHandler(id) {
    await deleteNote(id);
    // update the contact state from data.js
    getArchivedNotes().then(({ data }) => {
      setNotes(data);
    });
  }

  async function onArsipHandler(id) {
    await unarchiveNote(id);
    // update the contact state from data.js
    getArchivedNotes().then(({ data }) => {
      setNotes(data);
    });
  }

  if (!notes) {
    return (
      <h1>
        Loading...
        {console.log(notes)}
      </h1>
    );
  }
  return (
    <div className="main-page">
      <div className={!notes.length ? 'NotFound' : 'Card-container'}>
        {!notes.length ? (
          <h1>TIDAK ADA ARSIP NOTE</h1>
        ) : (
          notes.map((note) => {
            return (
              <Card
                key={note.id}
                id={note.id}
                btnTitle1={'Activate'}
                btnTitle2={'Delete'}
                title={note.title}
                body={note.body}
                createAt={showFormattedDate(note.created_at)}
                onDelete={() => onDeleteHandler(note.id)}
                onArsip={() => onArsipHandler(note.id)}
              />
            );
          })
        )}
      </div>
    </div>
  );
}

export default ArsipPage;
