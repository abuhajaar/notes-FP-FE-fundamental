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
    <div className="container">
      <div className="container-logo">
        <div className="image">
          <Link className="Link" to="/">
            <img className="logo1" src={logo1} alt="logo" />
            <Gap width={10} />
            <h1>Catatan</h1>
          </Link>
        </div>
      </div>
      <div className="container-flex">
        <ul className="nav">
          <li>
            <Link className="nav-logo" to="/arsip">
              <h2>Arsip</h2>
            </Link>
          </li>
          <li>
            <Link className="nav-logo" to="/reminder">
              <h2>Reminder</h2>
            </Link>
          </li>
          <li>
            <Link className="nav-logo" to="/arsip">
              <h2>Arsip</h2>
            </Link>
          </li>
          <li>
            <Link className="nav-logo" to="/arsip">
              <h2>Arsip</h2>
            </Link>
          </li>
          <li>
            <Link className="nav-logo" to="/arsip">
              <h2>Arsip</h2>
            </Link>
          </li>
        </ul>
        <div className="container-settings">
          <div className="settings">
            <ToggleTheme className="btn-dark" />
            <ToggleLocale className="btn-language" />
          </div>
          <Button
            onClick={LogOut}
            title="Log Out"
            className="btn-logout"
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
