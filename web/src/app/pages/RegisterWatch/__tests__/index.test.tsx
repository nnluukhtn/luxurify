import * as React from 'react';
import { render } from '@testing-library/react';

import { RegisterWatch } from '..';

jest.mock('react-i18next', () => ({
  useTranslation: () => {
    return {
      t: str => str,
      i18n: {
        changeLanguage: () => new Promise(() => {}),
      },
    };
  },
}));

describe('<RegisterWatch  />', () => {
  it('should match snapshot', () => {
    const loadingIndicator = render(<RegisterWatch />);
    expect(loadingIndicator.container.firstChild).toMatchSnapshot();
  });
});
