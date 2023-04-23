/* eslint-disable jsx-a11y/label-has-associated-control */
import { React, useState } from 'react';
import './Popup-Form.scss';
import { Gap } from '../../atoms';

function PopupForm({ handleSubmit }) {
  const [trigger, setTrigger] = useState(false);
  // const navigate = useNavigate();
  const tanggal = new Date();

  const [form, setForm] = useState({
    title: '',
    category: '',
    date: '',
    content: '',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.className]: e.target.value });
  };

  return (

    <div>
      <button type="button" className="btn-popup" onClick={() => setTrigger(true)}>Add New Task</button>
      {
        trigger ? (
          <div className="popup">
            <div className="popup__container">
              <button type="button" className="popup__container__close-btn" onClick={() => setTrigger(false)}>X</button>

              <h1 className="popup__container__header">Add a task</h1>
              <Gap height={20} />

              <h1 className="popup__container__header">Add a task</h1>
              <Gap height={20} />

              <form className="popup__container__form" onSubmit={() => handleSubmit(form)}>
                <label className="popup__container__form__title">
                  Title
                  <input type="text" className="title" onChange={handleChange} />
                </label>
                <Gap height={20} />
                <label className="popup__container__form__date">
                  Date
                  <input type="date" min={tanggal} className="date" onChange={handleChange} />
                </label>
                <Gap height={20} />
                <label className="popup__container__form__content">
                  Content
                  <textarea type="text" className="content" onChange={handleChange} />
                </label>
                <Gap height={20} />
                <label className="popup__container__form__category">
                  Category
                  <input type="text" className="category" onChange={handleChange} />
                </label>
                <Gap height={20} />
                <button type="submit" className="popup__container__submit-btn">Submit</button>
              </form>
            </div>
          </div>
        ) : null
      }
      ;
    </div>
  );
}

PopupForm.defaultProps = {
  handleSubmit: () => { console.log('handleSubmitForm'); },
};

export default PopupForm;
