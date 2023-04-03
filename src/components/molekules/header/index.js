import React from 'react';
import './header.scss';
import { Link } from 'react-router-dom';
import logo1 from '../../../assets/image/logo1.png';
import Gap from '../../atoms/Gap';
import { Button } from './../../../components';
import ToggleTheme from '../../atoms/Button/theme';

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
      <Button onClick={LogOut} title={'Log Out'}></Button>
    </div>
  );
}

export default Header;
