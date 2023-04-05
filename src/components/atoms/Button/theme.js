import React from 'react';
import './Button.scss';

import { ThemeConsumer } from '../../../contexts/ThemeContext';
import { FaMoon, FaSun } from 'react-icons/fa';

function ToggleTheme() {
  return (
    <div>
      <ThemeConsumer>
        {({ theme, toggleTheme }) => {
          return (
            <button
              onClick={toggleTheme}
              title="mode"
              className="button-setting"
            >
              {theme === 'light' ? <FaMoon /> : <FaSun />}
            </button>
          );
        }}
      </ThemeConsumer>
    </div>
  );
}

export default ToggleTheme;
