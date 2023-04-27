/* eslint-disable jsx-a11y/label-has-associated-control */
import { React, useState } from 'react';
import './Popup-Form.scss';
import { Gap } from '../../atoms';

function PopupForm({ handleSubmit = '', isi, data }) {
  const [trigger, setTrigger] = useState(false);
  // const navigate = useNavigate();
  const tanggal = new Date();

  const [form, setForm] = useState({
    title: data?.title || '',
    category: data?.category || '',
    date: data?.date || '',
    content: data?.content || '',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.className]: e.target.value });
  };

  return (

    <div>
      {console.log('popUpForm', form)}
      <button type="button" className="btn-popup" onClick={() => setTrigger(true)}>{isi}</button>
      {
        trigger ? (
          <div className="popup">
            <div className="popup__container">
              <button type="button" className="popup__container__close-btn" onClick={() => setTrigger(false)}>X</button>

              <h1 className="popup__container__header">Add a task</h1>
              <Gap height={15} />

              <form className="popup__container__form" onSubmit={() => handleSubmit(form)}>
                <label className="popup__container__form__title">
                  Title
                  <input type="text" className="title" maxLength={15} onChange={handleChange} value={form.title} />
                </label>
                <Gap height={20} />
                <label className="popup__container__form__date">
                  Date
                  <input type="date" min={tanggal} className="date" onChange={handleChange} value={form.date} />
                </label>
                <Gap height={20} />
                <label className="popup__container__form__content">
                  Content
                  <textarea type="text" className="content" maxLength={100} onChange={handleChange} value={form.content} />
                </label>
                <Gap height={20} />
                <label className="popup__container__form__category">
                  Category
                  <input type="text" className="category" maxLength={10} onChange={handleChange} value={form.category} />
                </label>
                <Gap height={20} />
                <button type="submit" className="popup__container__submit-btn">Submit</button>
              </form>
            </div>
          </div>
        ) : null
      }
    </div>
  );
}

export default PopupForm;
