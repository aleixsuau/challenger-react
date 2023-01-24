import { render } from '@testing-library/react';
import NavBarToggle from './NavBarToggle';
import '@testing-library/jest-dom';

describe('Navbar Toggle', () => {
  it('should be hidden on lg screen', () => {
    const { getByTestId } = render(<NavBarToggle onToggle={() => null} />);

    expect(getByTestId('navbar-toggle')).toHaveClass('lg:hidden');
  });

  it('should call the onToggle callback', () => {
    const onToggle = jest.fn();
    const { getByTestId } = render(
      <NavBarToggle onToggle={() => onToggle()} />
    );

    getByTestId('navbar-toggle-button').click();

    expect(onToggle).toHaveBeenCalled();
  });
});
