import { Link, Routes, Route } from 'react-router-dom';
import './app.scss';
import {
  Home,
  ArsipPage,
  NotFoundPage,
  CreateNote,
  DetailNote,
} from '../pages';
import { Footer, Header } from '../components';
import { LocaleProvider } from '../contexts/LocaleContext';
import { ThemeProvider } from '../contexts/ThemeContext';
import React from 'react';
import { getUserLogged, putAccessToken } from '../utils/api';
import LoginPage from './Login';
import RegisterPage from './RegisterPage';
import ToggleTheme from '../components/atoms/Button/theme';
import ToggleLocale from '../components/atoms/Button/locale';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      authedUser: null,
      initializing: true,

      localeContext: {
        locale: localStorage.getItem('locale') || 'id',
        toggleLocale: () => {
          this.setState((prevState) => {
            const newLocale =
              prevState.localeContext.locale === 'id' ? 'en' : 'id';
            localStorage.setItem('locale', newLocale);
            return {
              localeContext: {
                ...prevState.localeContext,
                locale: newLocale,
              },
            };
          });
        },
      },

      theme: 'light',
      toggleTheme: () => {
        this.setState((prevState) => {
          const newTheme = prevState.theme === 'light' ? 'dark' : 'light';
          localStorage.setItem('theme', newTheme);
          return {
            theme: newTheme,
          };
        });
      },
    };

    this.onLoginSuccess = this.onLoginSuccess.bind(this);
    this.onLogout = this.onLogout.bind(this);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.theme !== this.state.theme) {
      document.documentElement.setAttribute('data-theme', this.state.theme);
    }
  }

  async componentDidMount() {
    const { data } = await getUserLogged();

    this.setState(() => {
      return {
        authedUser: data,
        initializing: false,
      };
    });
  }

  async onLoginSuccess({ accessToken }) {
    putAccessToken(accessToken);
    const { data } = await getUserLogged();

    this.setState(() => {
      return {
        authedUser: data,
      };
    });
  }

  onLogout() {
    this.setState(() => {
      return {
        authedUser: null,
      };
    });

    putAccessToken('');
  }

  render() {
    if (this.state.initializing) {
      return null;
    }

    if (this.state.authedUser === null) {
      return (
        <ThemeProvider value={this.state}>
          <LocaleProvider value={this.state.localeContext}>
            <div className="overlay">
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
                      element={<LoginPage loginSuccess={this.onLoginSuccess} />}
                    />
                    <Route path="/register" element={<RegisterPage />} />
                  </Routes>
                </main>
                <footer className="contact-app__footer">
                  <div className="left">
                    <p>
                      {this.state.localeContext.locale === 'id'
                        ? "Don't have an account?"
                        : 'Belum punya akun?'}
                    </p>
                    <h3>
                      Lorem Ipsum is simply dummy text of the printing and
                      typesetting industry.
                    </h3>
                  </div>
                  <div className="right">
                    <Link to="/register" className="btn-register">
                      {this.state.localeContext.locale === 'id'
                        ? 'Register >'
                        : 'Daftar Disini >'}
                    </Link>
                  </div>
                </footer>
              </div>
            </div>
          </LocaleProvider>
        </ThemeProvider>
      );
    }

    return (
      <ThemeProvider value={this.state}>
        <LocaleProvider value={this.state.localeContext}>
          <div className="contact-app">
            <Header LogOut={this.onLogout} />

            <Routes>
              <Route path="/" exact element={<Home />} />
              <Route path="/notes/:id" element={<DetailNote />} />
              <Route path="/newnote" element={<CreateNote />} />
              <Route path="/arsip" element={<ArsipPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
            <Footer />
          </div>
        </LocaleProvider>
      </ThemeProvider>
    );
  }
  // console.log(authedUser)
  // < BrowserRouter >
  //   <Header />
  //   <Routes>
  //     <Route path="/" exact element={<Home />} />
  //     <Route path="/notes/:id" element={<DetailNote />} />
  //     <Route path="/newnote" element={<CreateNote />} />
  //     <Route path="/arsip" element={<ArsipPage />} />
  //     <Route path="*" element={<NotFoundPage />} />
  //   </Routes>
  //   <Footer />
  // </ BrowserRouter >
}

export default App;
