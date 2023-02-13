import { render } from '@testing-library/react';
import NavBarItem from './NavBarItem';
import '@testing-library/jest-dom';

describe('Navbar Item', () => {
  const section = {
    text: 'recipes',
    link: 'recipe',
    icon: 'recipe',
  };

  it('should render core elements', () => {
    const { getByTestId } = render(
      <NavBarItem section={section} vertical={false} />
    );

    expect(getByTestId('navbar-item')).toBeDefined();
    expect(getByTestId('navbar-item-link')).toHaveAttribute(
      'href',
      section.link
    );
    expect(getByTestId('navbar-item-link').textContent).toBe(section.text);
  });

  it('should display the `vertical` styles', () => {
    const { getByTestId } = render(
      <NavBarItem section={section} vertical={true} />
    );

    expect(getByTestId('navbar-item')).toHaveClass('border-gray-100');
  });
});
