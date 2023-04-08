import { Button, Gap } from '../../components';
import React, { useState } from 'react';
import './CreateNote.scss';
import { addNote } from '../../utils/api';
import { useNavigate } from 'react-router-dom';

function CreateNote() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    body: '',
    judul: 'Judul Note....',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.className]: e.target.innerHTML });
  };
  const handleSubmit = (title, body) => {
    addNote({ title, body });
    navigate('/');
  };

  return (
    <div className="newnote">
      <Gap height={20} />
      <div
        name="judul"
        className="judul"
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
          title={'Submit'}
          onClick={() => handleSubmit(form.judul, form.body)}
        />
      </div>
      <Gap height={20} />
    </div>
  );
}

export default CreateNote;
