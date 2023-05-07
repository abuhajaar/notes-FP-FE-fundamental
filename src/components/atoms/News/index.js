import React from 'react';
import './news.scss';
import grafik from '../../../assets/image/grafik.png';

function News() {
  // Mouse Effect Begin

  const handleOnMouseMove = (e) => {
    const { currentTarget: target } = e;

    const rect = target.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    target.style.setProperty('--mouse-x', `${x}px`);
    target.style.setProperty('--mouse-y', `${y}px`);
  };

  for (const card of document.querySelectorAll('.wrapper-card__news')) {
    card.onmousemove = (e) => handleOnMouseMove(e);
  }

  // Mouse Effect End

  return (
    <div className="wrapper-card">
      <div className="wrapper-card__news">
        <div className="wrapper-card__news__content">
          <div className="wrapper-card__news__content__image">
            <img src="https://png.pngtree.com/png-clipart/20200619/ourmid/pngtree-3d-rotating-abstract-object-stereo-element-png-image_2258243.jpg" alt="" />
          </div>
          <div className="wrapper-card__news__content__text">NEWS</div>
        </div>
      </div>
    </div>
  );
}

export default News;
