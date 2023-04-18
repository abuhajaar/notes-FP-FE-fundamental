import React, { useState } from 'react';
import './CreateNote.scss';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { asyncAddNote } from '../../states/notes/action';
import { Button, Gap } from '../../components';

function CreateNote() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    body: '',
    judul: 'Judul Note....',
  });
  const dispatch = useDispatch(); // @TODO: mengambil dispatch dari redux
  const handleChange = (e) => {
    setForm({ ...form, [e.target.className]: e.target.innerHTML });
  };
  const handleSubmit = (formData) => {
    dispatch(asyncAddNote(formData));
    navigate('/');
  };

  return (
    <div className="newnote">
      <Gap height={20} />
      <div
        name="title"
        className="title"
        contentEditable
        data-placeholder="Judul Note..."
        onInput={handleChange}
      />
      <Gap height={50} />
      <div
        name="body"
        className="body"
        contentEditable
        data-placeholder="Isi Note.............."
        onInput={handleChange}
      />
      <Gap height={20} />
      <div className="btn-submit">
        <Button
          title="Submit"
          onClick={() => handleSubmit(form)}
        />
      </div>
      <Gap height={20} />
    </div>
  );
}

export default CreateNote;
