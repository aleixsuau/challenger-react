import { render } from '@testing-library/react';

import Brand from './Brand';

describe('Brand', () => {
  const title = 'testTitle';

  it('should display the title', () => {
    const { getByTestId } = render(<Brand title={title} />);

    expect(getByTestId('title').textContent).toBe(title);
  });

  it('should display the logo', () => {
    const { getByTestId } = render(<Brand title={title} />);

    expect(getByTestId('logo')).toBeTruthy();
  });
});
