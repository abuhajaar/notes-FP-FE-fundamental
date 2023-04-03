import React from 'react';

import { ThemeConsumer } from '../../../contexts/ThemeContext';
import { FaMoon, FaSun } from 'react-icons/fa';

function ToggleTheme() {
  return (
    <div>
      <ThemeConsumer>
        {({ theme, toggleTheme }) => {
          return (
            <button onClick={toggleTheme} title="mode">
              {theme === 'light' ? <FaMoon /> : <FaSun />}
            </button>
          );
        }}
      </ThemeConsumer>
    </div>
  );
}

export default ToggleTheme;
