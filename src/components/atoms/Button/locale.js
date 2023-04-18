import React from 'react';
import './Button.scss';
import { LocaleConsumer } from '../../../contexts/LocaleContext';

function ToggleLocale() {
  return (
    <div>
      <LocaleConsumer>
        {({ locale, ToggleLocales }) => (
          <button
            type="button"
            onClick={ToggleLocales}
            title="language"
            className="button-setting"
          >
            {locale === 'id' ? 'id' : 'en'}
          </button>
        )}
      </LocaleConsumer>
    </div>
  );
}

export default ToggleLocale;
