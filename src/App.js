/* eslint-disable import/no-extraneous-dependencies */
import { useSelector, useDispatch } from 'react-redux';
import { Routes, Route } from 'react-router-dom';
import React, { useEffect } from 'react';
import { asyncPreloadProcess } from './states/isPreload/action';
import { asyncUnsetAuthUser } from './states/authUser/action';

import { Header, Footer } from './components';
import Loading from './components/atoms/Loading';
import { LocaleProvider } from './contexts/LocaleContext';
import { ThemeProvider } from './contexts/ThemeContext';
import ToggleTheme from './components/atoms/Button/theme';
import ToggleLocale from './components/atoms/Button/locale';
import './app.scss';
import {
  Home,
  ArsipPage,
  NotFoundPage,
  CreateNote,
  DetailNote,
  DetailReminder,
  //   CreateReminder,
  LoginPage,
  RegisterPage,
  // Reminder,
} from './pages';

function App() {
  const {
    authUser = null,
    isPreload = false,
  } = useSelector((states) => states);

  const [locale, setLocal] = React.useState(localStorage.getItem('local') || 'id');
  const [theme, setTheme] = React.useState(localStorage.getItem('theme') || 'light');
  const ThemeDataFunction = {
    theme,
    ToggleThemes: () => {
      setTheme((prevState) => {
        const newTheme = prevState === 'light' ? 'dark' : 'light';
        localStorage.setItem('theme', newTheme);
        return newTheme;
      });
    },
  };
  const LocaleDataFunction = {
    locale,
    ToggleLocales: () => {
      setLocal((prevState) => {
        const newLocale = prevState === 'id' ? 'en' : 'id';
        localStorage.setItem('local', newLocale);
        return newLocale;
      });
    },
  };

  const dispatch = useDispatch(); // @TODO: get dispatch function from store

  useEffect(() => {
    dispatch(asyncPreloadProcess());
  }, [dispatch]);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme, locale]);

  const onSignOut = () => {
    // @TODO: dispatch action to unset authUser
    dispatch(asyncUnsetAuthUser());
  };

  if (isPreload) {
    return (<Loading />); // @TODO: return Loading component
  }

  if (authUser === null) {
    return (
      <ThemeProvider value={ThemeDataFunction}>
        <LocaleProvider value={LocaleDataFunction}>
          <div className="overlay">
            <Loading />
            <div className="contact-app">
              <header className="contact-app__header">
                <div className="logo">
                  <h2>Aplikasi Kontak</h2>
                </div>
                <div className="settings">
                  <ToggleTheme />
                  <ToggleLocale />
                </div>
              </header>
              <main>
                <Routes>
                  <Route
                    path="/*"
                    element={<LoginPage />}
                  />
                  <Route
                    path="/register"
                    element={<RegisterPage />}
                  />
                </Routes>
              </main>
            </div>
          </div>
        </LocaleProvider>
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider value={ThemeDataFunction}>
      <LocaleProvider value={LocaleDataFunction}>
        <div className="contact-app-inside">
          <div className="contact-app-container">
            <Header LogOut={onSignOut} />
            <Loading />
            <Routes>
              <Route path="/" exact element={<Home />} />
              <Route path="/notes/:id" element={<DetailNote />} />
              <Route path="/newnote" element={<CreateNote />} />
              <Route path="/arsip" element={<ArsipPage />} />
              <Route path="/reminder/:date?" element={<DetailReminder />} />
              {/* <Route path="/reminder" element={<Reminder />} /> */}
              {/* <Route path="/newreminder" element={<CreateReminder />} /> */}
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
            <Footer />
          </div>
        </div>
      </LocaleProvider>
    </ThemeProvider>
  );
}

export default App;
