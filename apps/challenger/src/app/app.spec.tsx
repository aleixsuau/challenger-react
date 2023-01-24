import { render } from '@testing-library/react';
import App from './app';

describe('App', () => {
  it('should display the Shell', () => {
    const { getByTestId } = render(<App />);
    expect(getByTestId('shell')).toBeTruthy();
  });
});
