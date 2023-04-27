import { React, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { BsCalendar3Week } from 'react-icons/bs';
import parser from 'html-react-parser';
import { showFormattedDate } from '../../utils/index';
import { getNote } from '../../utils/api';
import './DetailNote.scss';

function DetailNote() {
  const { id } = useParams();
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    getNote(id).then(({ data }) => {
      setNotes(data);
    });
  }, [id]);

  if (!notes) {
    return <h1>Loading Notes</h1>;
  }

  return (
    <div className="detail_page">
      <div className="detail_page__wrapper">

        <div className="detail_page__wrapper__title">{notes.title}</div>

        <div className="detail_page__wrapper__body">
          {parser(`${notes.body}`)}
        </div>

        <div className="detail_page__wrapper__date">
          <BsCalendar3Week />
          {' '}
          {showFormattedDate(notes.created_at)}
        </div>

      </div>
    </div>
  );
}

export default DetailNote;
