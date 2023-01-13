import { render } from '@testing-library/react';

import Header from './Header';

describe('Header', () => {
  it('should display the core elements', () => {
    const title = 'test-title';
    const { getByTestId } = render(
      <Header title={title}>
        <div data-testid="children-content"></div>
      </Header>
    );

    expect(getByTestId('logo')).toBeTruthy();
    expect(getByTestId('title').textContent).toBe(title);
  });

  it('should display children content', () => {
    const { getByTestId } = render(
      <Header title='test-title'>
        <div data-testid="children-content"></div>
      </Header>
    );

    expect(getByTestId('children-content')).toBeTruthy();
  });

  // TODO: test menu toggle, it seems testing libary can't test media queries
  // https://stackoverflow.com/questions/64281467/react-testing-library-rtl-test-a-responsive-design
});
