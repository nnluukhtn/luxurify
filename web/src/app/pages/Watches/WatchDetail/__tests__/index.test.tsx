import * as React from 'react';
import { render } from '@testing-library/react';

import { WatchDetail } from '..';

describe('<WatchDetail  />', () => {
  it('should match snapshot', () => {
    const loadingIndicator = render(<WatchDetail />);
    expect(loadingIndicator.container.firstChild).toMatchSnapshot();
  });
});
