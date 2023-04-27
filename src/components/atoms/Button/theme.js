import React from 'react';
import './Button.scss';

import { FaMoon, FaSun } from 'react-icons/fa';
import { ThemeConsumer } from '../../../contexts/ThemeContext';

function ToggleTheme() {
  return (
    <div>
      <ThemeConsumer>
        {({ theme, ToggleThemes }) => (
          <button
            type="button"
            onClick={ToggleThemes}
            title="mode"
            className="button-setting"
          >
            {theme === 'light' ? <FaSun /> : <FaMoon />}
          </button>
        )}
      </ThemeConsumer>
    </div>
  );
}

export default ToggleTheme;
