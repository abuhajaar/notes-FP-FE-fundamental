import { Routes, Route } from 'react-router-dom';
import './app.css';
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
          return {
            theme: prevState.theme === 'light' ? 'dark' : 'light',
          };
        });
      },
    };

    this.onLoginSuccess = this.onLoginSuccess.bind(this);
    this.onLogout = this.onLogout.bind(this);
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
            <div className="contact-app">
              <header className="contact-app__header">
                <h1>Aplikasi Kontak</h1>
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
