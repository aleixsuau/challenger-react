import { render } from '@testing-library/react';
import NavBar, { NavBarConfig } from './NavBar';

const navbarIsOpen = true;
const navbar: NavBarConfig = {
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

describe('navbar', () => {
  it('should display core elements', () => {
    const { getByTestId } = render(
      <NavBar sections={navbar.sections} isOpen={navbarIsOpen} />
    );

    expect(getByTestId('navbar')).toBeTruthy();
    expect(getByTestId('navbar-list')).toBeTruthy();
  });

  it('should display one navbar item per section', () => {
    const { getAllByTestId } = render(
      <NavBar sections={navbar.sections} isOpen={navbarIsOpen} />
    );
    const navbarItems = getAllByTestId('navbar-item');

    expect(navbarItems.length).toBe(navbar.sections.length);
    navbar.sections.forEach((section, index) => {
      const navbarItemLink = navbarItems[index].querySelector('a');

      expect(navbarItemLink?.getAttribute('href')).toBe(section.link);
      expect(navbarItemLink?.textContent).toContain(section.text);
    });
  });
});
