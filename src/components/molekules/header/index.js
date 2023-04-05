import React from 'react';
import './header.scss';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import logo1 from '../../../assets/image/logo1.png';
import Gap from '../../atoms/Gap';
import { Button } from './../../../components';
import ToggleTheme from '../../atoms/Button/theme';
import ToggleLocale from '../../atoms/Button/locale';

function Header({ LogOut }) {
  return (
    <div className="container">
      <Link className="Link" to={'/'}>
        <img className="logo1" src={logo1} alt="logo" />
        <Gap width={10} />
        <h1>Catatan</h1>
      </Link>
      <Link className="logo22" to={'/arsip'}>
        <h2>Arsip</h2>
      </Link>
      <ToggleTheme />
      <ToggleLocale />
      <Button onClick={LogOut} title={'Log Out'}></Button>
    </div>
  );
}

Header.propTypes = {
  LogOut: PropTypes.func.isRequired,
};

export default Header;
