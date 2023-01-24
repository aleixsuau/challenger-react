import { render } from '@testing-library/react';
import Header from './Header';

describe('Header', () => {
  it('should display children content', () => {
    const { getByTestId } = render(
      <Header>
        <div data-testid="children-content"></div>
      </Header>
    );

    expect(getByTestId('children-content')).toBeTruthy();
  });

  // TODO: test menu toggle, it seems testing libary can't test media queries
  // https://stackoverflow.com/questions/64281467/react-testing-library-rtl-test-a-responsive-design
});
