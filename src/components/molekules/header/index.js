import React from 'react';
import './header.scss';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import logo1 from '../../../assets/image/logo1.png';
import Gap from '../../atoms/Gap';

import ToggleTheme from '../../atoms/Button/theme';
import ToggleLocale from '../../atoms/Button/locale';
import { Button } from '../../atoms';

function Header({ LogOut }) {
  return (
    <div className="header">
      <div className="header__logo">
        <div className="header__logo__image">
          <Link className="header__logo__image__link" to="/">
            <img className="logo1" src={logo1} alt="logo" />
            <Gap width={10} />
            <h1>Catatan</h1>
          </Link>
        </div>
      </div>
      <div className="header__container">
        <ul className="header__container__nav">
          <li className="header__container__nav__list">
            <Link className="header__container__nav__list__logo" to="/">
              <h2>Home</h2>
            </Link>
          </li>
          <li className="header__container__nav__list">
            <Link className="header__container__nav__list__logo" to="/reminder/all">
              <h2>Reminder</h2>
            </Link>
          </li>
          <li className="header__container__nav__list">
            <Link className="header__container__nav__list__logo" to="/arsip">
              <h2>Arsip</h2>
            </Link>
          </li>
          <li className="header__container__nav__list">
            <Link className="header__container__nav__list__logo" to="/arsip">
              <h2>Arsip</h2>
            </Link>
          </li>
          <li className="header__container__nav__list">
            <Link className="header__container__nav__list__logo" to="/arsip">
              <h2>Arsip</h2>
            </Link>
          </li>
        </ul>
        <div className="header__container__settings">
          <div className="header__container__settings__buttons">
            <ToggleTheme className="header__container__settings__buttons__btn-dark" />
            <ToggleLocale className="header__container__settings__buttons__btn-language" />
          </div>
          <Button
            onClick={LogOut}
            title="Log Out"
            className="header__container__settings__btn-logout"
          />
        </div>
      </div>
    </div>
  );
}

Header.propTypes = {
  LogOut: PropTypes.func.isRequired,
};

export default Header;
