import React from 'react';
import './profile.scss';

function Profile() {
  // Mouse Effect Begin

  const handleOnMouseMove = (e) => {
    const { currentTarget: target } = e;

    const rect = target.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    target.style.setProperty('--mouse-x', `${x}px`);
    target.style.setProperty('--mouse-y', `${y}px`);
  };

  for (const card of document.querySelectorAll('.wrapper-card__profile')) {
    card.onmousemove = (e) => handleOnMouseMove(e);
  }

  // Mouse Effect End

  return (
    <div className="wrapper-card">
      <div className="wrapper-card__profile">
        <div className="wrapper-card__profile__name">
          <h2>Hi John Doe!</h2>
        </div>
        <div className="wrapper-card__profile__image">
          <img src="https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses_23-2149436188.jpg?w=826&t=st=1682958127~exp=1682958727~hmac=9beddb9b791d384cf78a2bf0448af16376eaa890807fd8528f0bf6305944280e" alt="profile" />
        </div>

        <div className="wrapper-card__profile__settings">
          <div className="wrapper-card__profile__settings__item">
            <p>212</p>
            <p>Post</p>
          </div>
          <div className="wrapper-card__profile__settings__item">
            <p>212</p>
            <p>Comment</p>
          </div>
          <div className="wrapper-card__profile__settings__item">
            <p>212</p>
            <p>Post</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
