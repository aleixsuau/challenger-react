import { render } from '@testing-library/react';

import Dates from './ChallengeDates';

describe('Dates', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Dates />);
    expect(baseElement).toBeTruthy();
  });
});
