import { render } from '@testing-library/react';
import { NavBar } from '../Shell/Shell';
import Menu from './Menu';
import '@testing-library/jest-dom';

const navbar: NavBar = {
  sections: [
    {
      text: 'recipes',
      link: 'recipe',
      icon: 'recipe',
    },
    {
      text: 'contact',
      link: 'contact',
      icon: 'contact',
    },
  ],
};

describe('Menu', () => {
  it('should display core elements', () => {
    const { getByTestId } = render(
      <Menu navbar={navbar} />
    );

    expect(getByTestId('menu-toggle')).toBeTruthy();
    expect(getByTestId('menu-list')).toBeTruthy();
    expect(getByTestId('menu-login-button')).toBeTruthy();
  });

  it('should display one menu item per section', () => {
    const { getAllByTestId } = render(
      <Menu navbar={navbar} />
    );
    const menuItems = getAllByTestId('menu-item');

    expect(menuItems.length).toBe(navbar.sections.length);
    navbar.sections.forEach((section, index) => {
      const menuItemLink = menuItems[index].querySelector('a');

      expect(menuItemLink?.getAttribute('href')).toBe(section.link);
      expect(menuItemLink?.textContent).toContain(section.text);
    });
  });
});
