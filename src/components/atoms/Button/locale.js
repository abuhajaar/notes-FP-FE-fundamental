import React from 'react';
import './Button.scss';
import { LocaleConsumer } from '../../../contexts/LocaleContext';

function ToggleLocale() {
  return (
    <div>
      <LocaleConsumer>
        {({ locale, toggleLocale }) => {
          return (
            <button
              onClick={toggleLocale}
              title="language"
              className="button-setting"
            >
              {locale === 'id' ? 'id' : 'en'}
            </button>
          );
        }}
      </LocaleConsumer>
    </div>
  );
}

export default ToggleLocale;
